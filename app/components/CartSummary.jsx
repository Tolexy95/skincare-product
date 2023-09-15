"use client"

import { useState } from "react"
import { useStateContext } from "@/context/CartProductContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CartSummary() {
  const router =useRouter()
  const [isLoading, setLoading] = useState(false)
  const {totalPrice } = useStateContext();


  // const navigateToCheckout = () => {
  //   window.location.href = '/'; 
  //   console.log("hello")
   
  // }

  // const navigateToCheckout = () => {
  //   // router.push('/checkout');
  //   router.replace("/");
  //   console.log("hello")
  // };
 
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
          <dd className="text-sm font-medium">{totalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            0
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {totalPrice}
          </dd>
        </div>
      </dl>
     
     <div className="flex justify-center">
     <button className="mt-3 hover:bg-slate-500 p-3 rounded-xl text-xl" >
      
      <Link href="/checkout">Proceed to checkout</Link>
      </button>
     </div>
     
     
    </section>
  )
}
