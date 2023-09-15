"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { urlForImage } from "@/lib/image";
import { useStateContext } from "@/context/CartProductContext";


export function ProductGrid({ products }) {

  // Function to format a number as Naira currency
  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const { quantity, addToCart } = useStateContext();
  

  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900  ">
        <div>
          <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-x-5  gap-y-10 xs:grid-cols-1 sm:grid-cols-2"
    >
      {products.map((product) => (
        <div key={product._id} className="group text-sm w-full">
          <Link href={`/product/${product.slug}`}>
            <div className="aspect-h-1 aspect-w-1 w-full rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800 h-64">
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full object-center h-full"
              />
            </div>
            <div className="">
              <h3 className="mt-5 font-medium text-sm sm:h-14 lg:h-12">
                {product.name}
              </h3>
              <p className="mt-2 font-medium text-xl">{formatAsNaira(product.price)}</p>
            </div>
          </Link>
          <div className="flex gap-6 items-center mt-4 sm:gap-3">
            <div className="">
            
            </div>
            <div className="">
              <button
                type="button"
                className="border border-gray-100 py-1 px-1 w-full"
                // onClick={() =>addToCart(product, quantity)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
