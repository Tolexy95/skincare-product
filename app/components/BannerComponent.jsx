"use client"

import React from 'react';
import { urlForImage } from "@/lib/image";
import Image from "next/image";
import Link from 'next/link';

const BannerComponent = ({ heroBanner }) => {
  const { smallText, largeText2 } = heroBanner
  // Define the background image URL
  const backgroundImageUrl = "/background.avif";

  return (
    <div className="hero-banner-container -z-50 w-full">
      <div
        className="h-40"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',          // Set background size to cover
          backgroundPosition: 'center',     // Set background position to center
          backgroundRepeat: 'no-repeat',    // Set background repeat to no-repeat
        }}>

        {/* Your content goes here */}
        <div className="text-center max-w-sm mx-auto py-14">
          <h3 className='text-2xl textSmall'>{smallText}</h3>
          <p className='text-xl mt-5'>{largeText2}</p>
        </div>

      </div>

      <div
        className="h-40"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',          // Set background size to cover
          backgroundPosition: 'center',     // Set background position to center
          backgroundRepeat: 'no-repeat',    // Set background repeat to no-repeat
        }}>

        {/* Your content goes here */}
        <div className="text-center max-w-sm mx-auto py-14">
          <h3 className='text-2xl textSmall'>{smallText}</h3>
          <p className='text-xl mt-5'>{largeText2}</p>
        </div>

      </div>



    </div>



  );
};

export default BannerComponent;




// <div className="relative dark:bg-banner-color-dark rounded-lg t w-full dark:glass-shadow-dark dark:backdrop-blur-lg shadow-glass-shadow-light backdrop-blur-md hero-banner-container -z-50">
    //   <div className='p-10 text pl-20'>
    //     <h3 className='text-2xl'>{smallText}</h3>
    //     <h1 className='text-xl mt-5'>{largeText2}</h1>
    //     {/* <Link href="/">
    //       <button type="button" className=''>{buttonText}</button>
    //     </Link> */}
    //   </div>
    //   <div className= "absolute hero-banner-image w-5/12  h-full">
    //   <Image
    //     src={urlForImage(heroBanner.image).url()}
    //     alt="heroBanner"
    //     width={280}
    //     height={250}
    //     className="object-cover w-full h-full"
    //   />
    //   </div>
    //   <div>
    //   </div>
    // </div>