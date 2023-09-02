"use client"

import React from 'react'
import { urlForImage } from "@/lib/image";
import Image from "next/image";
import Link from 'next/link';

const BannerComponent = ({ heroBanner }) => {

  const {
    smallText,
    largeText2,
    buttonText,
    desc,
    image,
  } = heroBanner;

  return (
    <div className="  dark:bg-banner-color-dark rounded-lg h-96 leading-tight w-full dark:glass-shadow-dark dark:backdrop-blur-lg shadow-glass-shadow-light backdrop-blur-md">
      <div>
        <h3>{smallText}</h3>
        <h1>{largeText2}</h1>
        <Link href="/">
          <button type="button">{buttonText}</button>
        </Link>
      </div>

      <Image
        src={urlForImage(heroBanner.image).url()}
        alt="heroBanner"
        width={500}
        height={500}
        className="object-cover w-full object-center h-full"
      />
      <div>

        <div className="">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent