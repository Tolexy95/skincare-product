"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from "../../context/CartProductContext";
import { runFireworks } from '../../lib/utils';


const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="text-xl text-white">Check your email inbox for the receipt.</p>
        <p className="description text-white">
          If you have any questions, please email 
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/" className='w-72 mt-8'>
          <button type="button" className="purchase--btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success; 
