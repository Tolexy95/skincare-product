"use client"

import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { urlForImage } from "@/lib/image";



export function Relatedproduct({products }) {

  // Function to format a number as Naira currency
  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (products.length === 0) {
    return null
    
  }

  return (
    <div
      className="grid grid-flow-col lg:grid-cols-4 md:grid-cols-3 gap-x-6  gap-y-10 xs:grid-cols-1 sm:grid-cols-2">
      {products.map((product) => (
        <div key={product._id} className="group text-sm">
         <Link href={`/product/${product.slug.current}`}>
            <div className="aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800 h-64">
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain w-full object-center h-full"
              />
            </div>
            <div className="w-9">
              <h3 className="mt-5 font-medium text-sm sm:h-14 testWord">{product.name}</h3>
              <p className="mt-2 font-medium text-xl ">{formatAsNaira(product.price)}</p>
            </div>
          </Link>
          <div className="flex gap-6 items-center mt-4 sm:gap-3 ">
            <div className="">
              <button
                type="button"
                className="border border-gray-100 py-1 px-1"
              >
                  VIEW MORE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
