"use client";

import React, { useRef, useState } from "react";
import { useStateContext } from "@/context/CartProductContext";
import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation"


const CheckOutPage = () => {
    const router =useRouter()
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { totalPrice } = useStateContext();

  
  
  const onSuccess = (reference) => {
    // Use router to navigate to the success page
    router.push('/successPage');
  };

//   const onSuccess = (reference) => {
//     window.location.href = "/successPage"; 
//   };

  // you can call this function anything
  const onClose = () => {
   alert("We love to see you purchase this item, please proceed")
    window.location.href = "/"; // 
  };

  return (
    <div className="mt-32 max-w-lg mx-auto mb-36">
      <div className="w-full">
      <div className="flex gap-9 mb-5 items-center">
         <label className="w-36 text-xl">Full Name:</label>
       
        <input
          type="text"
          value={fullName}
          onInput={(e) => setFullName(e.target.value)}
          className="input"
        />
      </div>

      <div className="flex gap-9 mb-5 items-center">
        <label className="w-36 text-xl">Email Address:</label>
        <input
          type="text"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>

      <div className="flex gap-9 mb-5 items-center">
        <label className="w-36 text-xl">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onInput={(e) => setPhoneNumber(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex gap-9 mb-5 items-center">
        <label className="w-36 text-xl">Address:</label>
        <input
          type="text"
          value={address}
          onInput={(e) => setAddress(e.target.value)}
          className="input"
        />
      </div>
      </div>

      <div className=" flex mb-10 gap-9 items-center">
        <h3 className="text-xl w-36">Subtotal:</h3>
        <h3 className="input text-lg w-min">₦{totalPrice}</h3>
      </div>

      <div className="btn-container">
        <PaystackButton
          text="Pay with Paystack"
          className="purchase--btn"
          email={email}
          amount={totalPrice * 100} // Convert to kobo
          publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CheckOutPage;
