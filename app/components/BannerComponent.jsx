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
    <div className="relative dark:bg-banner-color-dark rounded-lg t w-full dark:glass-shadow-dark dark:backdrop-blur-lg shadow-glass-shadow-light backdrop-blur-md hero-banner-container">
      <div className='p-10 text pl-20'>
        <h3 className='text-2xl'>{smallText}</h3>
        <h1 className='text-xl mt-5'>{largeText2}</h1>
        <Link href="/">
          <button type="button" className='btn'>{buttonText}</button>
        </Link>
      </div>
      <div className= "absolute hero-banner-image w-5/12  h-full">
      <Image
        src={urlForImage(heroBanner.image).url()}
        alt="heroBanner"
        width={280}
        height={250}
        className="object-cover w-full h-full"
      />
      </div>
      <div>

        {/* <div className="">
          <p>{desc}</p>
        </div> */}
      </div>
    </div>
  )
}

export default BannerComponent