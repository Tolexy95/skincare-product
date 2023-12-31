"use client"; 


import React, { useState, useEffect } from "react";
import { useStateContext } from "@/context/CartProductContext";
import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import LoaderComponent from "../components/LoaderComponent";
import { useAuth } from "@/context/AuthContext";


const CheckOutPage = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    fullName,
    setFullName,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
  } = useAuth(); // Access user authentication data from context

  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const { totalPrice } = useStateContext(); // Access total price from context

  // Calculate delivery estimate and order total
  const deliveryEstimate = Math.ceil(totalPrice * 0.02);
  const orderTotal = totalPrice + deliveryEstimate;

  // Helper function to format amount as Naira
  const formatAsNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle the checkout process
  const handleCheckout = async () => {
    const userData = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
    };
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "users"), userData); // Add user data to Firebase
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Callback function for a successful payment
  const onSuccess = (reference) => {
    handleCheckout(); // Perform the checkout process
    router.push("/successPage"); // Redirect to success page
  };

  // Callback function when the payment modal is closed
  const onClose = () => {
    alert("We love to see you purchase this item, please proceed");
    router.push("/"); // Redirect to the homepage
  };

  return (
    <div className="mainDiv mt-32 max-w-lg mx-auto mb-36">
      {isLoading ? ( // Display a loader component while loading
        <LoaderComponent />
      ) : (
        <div className="w-full">
          <div className="flex  mb-5 items-center">
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onInput={(e) => setFullName(e.target.value)}
              className="boxItem"
            />
          </div>

          <div className="flex  mb-5 items-center">
            <label>Email Address:</label>
            <input
              type="text"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              className="boxItem"
            />
          </div>

          <div className="flex  mb-5 items-center">
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onInput={(e) => setPhoneNumber(e.target.value)}
              className="boxItem"
            />
          </div>
          <div className="flex  mb-5 items-center">
            <label>Address:</label>
            <textarea
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              className="boxItem"
            />
          </div>

          <div className="flex mb-10 gap-6 items-center">
            <h3 className="text-xl w-36">Subtotal:</h3>
            <h3 className="boxItem text-lg w-min">
              {formatAsNaira(orderTotal)}
            </h3>
          </div>

          <div className="btn-container">
            <PaystackButton
              text="Pay with Paystack"
              className="purchase--btn"
              email={email}
              amount={orderTotal * 100} // Convert to kobo
              publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutPage; 
