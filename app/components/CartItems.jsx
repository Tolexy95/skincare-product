"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/lib/image"
import { Clock, X } from "lucide-react"
import { CartItemsEmpty } from "./CartItemEmpty"
import { useStateContext } from "../../context/CartProductContext";


export function  CartItems() {
  const {onRemove, cartItems, handleQuantityChange } = useStateContext();

  // Function to format a number as Naira currency
  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };



  if (cartItems.length === 0) return <CartItemsEmpty/>

  return (
    <ul
      role="list"
      className="divide-y divide-gray-600 border-y border-gray-600 dark:divide-gray-500 dark:border-gray-500 -z-50 "
    >
      {cartItems.map((product, productIdx) => (
        <li key={product._id} className="flex py-6 sm:py-10">
          <div className=" rounded-lg border-5 border-gray-600 bg-gray-100 group-hover:opacity-75 dark:border-gray-800 ">
            <Image
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover  object-center  h-40 w-40"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">

                    {product.name}

                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {formatAsNaira(product.price)}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={10}
                  value={product.quantity}
                  onChange={(event) =>
                    handleQuantityChange(product._id, Number(event.target.value))
                  }
                />
               <div className="absolute right-0 top-0">
                  <button
                    variant="ghost"
                    type="button"
                    className="-mr-2 inline-flex p-2"
                    onClick={() => onRemove(product)}
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm">
              <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Deliver in 1 week</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
