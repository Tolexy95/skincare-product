"use client"

import { useState } from "react"
import { useStateContext } from "@/context/CartProductContext";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';


export function CartSummary() {
  const [isLoading, setLoading] = useState(false)
  const { totalPrice} = useStateContext();
  const { isLoggedIn } = useAuth(); 

  // Function to format a number as Naira currency
  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

   // Calculate delivery estimate as 2% of the subtotal and round up to the nearest whole number
const deliveryEstimate = Math.ceil(totalPrice * 0.02);


   // Calculate the order total
  const orderTotal = totalPrice + deliveryEstimate;

  const navigateToCheckout = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      // User is logged in, navigate to the checkout page
      window.location.href = "/checkout";
    } else {
      alert("You need to login to access this page.");
    }
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-lg border-2 border-gray-200  px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 max-w-lg"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{formatAsNaira(totalPrice)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Delivery estimate</span>
          </dt>
          <dd className="text-sm font-medium">
          {formatAsNaira(deliveryEstimate)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
          {formatAsNaira(orderTotal)}
          </dd>
        </div>
      </dl>

      <div className="flex justify-center">
        <button className="mt-3 purchase--btn" onClick={navigateToCheckout} >
          proceed to checkout

        </button>
      </div>


    </section>
  )
}