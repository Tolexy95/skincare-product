"use client"

import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { urlForImage } from "@/lib/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export function Relatedproduct({products }) {
  if (products.length === 0) {
    return null
    
  }

  return (
    <div
      className="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-x-5  gap-y-10 xs:grid-cols-1 sm:grid-cols-2">
      {products.map((product) => (
        <div key={product._id} className="group text-sm w-full">
         <Link href={`/product/${product.slug.current}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800 h-64">
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full object-center h-full"
              />
            </div>
            <div className="">
              <h3 className="mt-5 font-medium text-sm sm:h-14">{product.name}</h3>
              <p className="mt-2 font-medium text-xl">₦{product.price}</p>
            </div>
          </Link>
          <div className="flex gap-6 items-center mt-4 sm:gap-3">
            <div className="">
              <p className="flex items-center gap-3 border border-gray-100 py-1 px-2">
                <span className="">
                  <AiOutlineMinus />
                </span>
                <span className="">0</span>

                <span className="">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="">
              <button
                type="button"
                className="border border-gray-100 py-1 px-1"
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
