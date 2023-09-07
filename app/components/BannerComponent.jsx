"use client"

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerComponent = ({ heroBanner }) => {
  const { smallText, largeText2 } = heroBanner;
  
  const backgroundImageUrl = "/background.avif";
  const backgroundImageUrlThree = "/backgroundThree.avif";


  const sliderSettings= {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true, // Set centerMode to true
    centerPadding: "0", // Remove the padding for centerMode
    arrows: false, // Remove the default arrows
  };

  return (
    <div className="-z-50 w-full overflow-hidden">
      <Slider {...sliderSettings}>
        {/* First Slide */}
        <div className='hero-banner-container w-full'>
        <div
          className="h-full rounded-xl"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="text-center max-w-sm mx-auto py-14">
            <h3 className="text-2xl textSmall">{smallText}</h3>
            <p className="text-xl mt-5">{largeText2}</p>
          </div>
        </div>
        </div>

        {/* Second Slide */}
        <div className='hero-banner-container w-full'>
        <div
          className="h-full rounded-xl"
          style={{
            backgroundImage: `url(${backgroundImageUrlThree})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="text-center max-w-sm mx-auto py-14">
            <h3 className="text-2xl textSmall">Static Heading for Slide 2</h3>
            <p className="text-xl mt-5">Static Content for Slide 2</p>
          </div>
        </div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerComponent;
