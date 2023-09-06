"use client"

import { useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/lib/image"


export function ProductGallery({product}) {

  return (
    <div className="h-full w-96">
   <div className="aspect-h-1 aspect-w-1  rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800 h-full">
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={600}
                height={750}
                className="object-cover w-full object-center h-full shadow-sm"
              />
            </div>
    </div>
  )
}
