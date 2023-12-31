"use client"

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerComponent = () => {
  
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
    centerMode: true, 
    centerPadding: "0", 
    arrows: false, 
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
        </div>
        </div>
      </Slider>
    </div>
  );
};

export default BannerComponent;
