"use client"

import React, { useState } from "react";
import Link from "next/link";
import About from "./About";
import TermsAndConditions from "./TermsAndConditions";
import ShippingAndReturnPolicy from "./ShippingAndReturnPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import FAQ from "./FAQ";



const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);


// Function to handle link click and set the selected content
const handleLinkClick = (contentComponent) => {
  setSelectedContent(contentComponent);
  setShowModal(true);
};

// Function to close the modal
const closeModal = () => {
  setSelectedContent(null);
  setShowModal(false);
};

  return (
    <div className="border-t w-full">
      <div className="mx-auto max-w-7xl  px-6 py-12">
      <nav className="flex  md:flex-col md:items-center justify-center gap-x-12 " aria-label="Footer" >
       
        <div className="pb-6">
          <Link href="/" className="text-sm leading-6">
            Home
          </Link>
        </div>
        <div className="pb-6">
          <button
              onClick={() => handleLinkClick("About")}
              className="text-sm leading-6 cursor-pointer"
            >
              About
            </button>
        </div>
        <div className="pb-6">
          <button
              onClick={() => handleLinkClick("TermsAndConditions")}
              className="text-sm leading-6 cursor-pointer"
            >
              Terms & Conditions
            </button>
        </div>

        <div className="pb-6">
          <button
              onClick={() => handleLinkClick("ShippingAndReturnPolicy")}
              className="text-sm leading-6 cursor-pointer"
            >
             Shipping & Return Policy
            </button>
        </div>

        <div className="pb-6">
          <button
              onClick={() => handleLinkClick("PrivacyPolicy")}
              className="text-sm leading-6 cursor-pointer"
            >
            Privacy Policy
            </button>
          
        </div>

        <div className="pb-6">
          <button
              onClick={() => handleLinkClick("FAQ")}
              className="text-sm leading-6 cursor-pointer"
            >
            FAQ
            </button>
        </div>
      </nav>
      <Link href="/" className="mt-10 block text-center text-xs leading-5">
        &copy; {new Date().getFullYear()}  Glow and Glam. All rights reserved.
      </Link>
       {/* Conditional rendering of modal */}
       {showModal && selectedContent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="z-50 bg-white p-4 rounded-lg shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              {/* Dynamically render the selected content */}
              {selectedContent === "About" && <About/>}
              {selectedContent === "TermsAndConditions" && <TermsAndConditions/>}
              {selectedContent === "ShippingAndReturnPolicy" && <ShippingAndReturnPolicy/>}
              {selectedContent === "PrivacyPolicy" && <PrivacyPolicy/>}
              {selectedContent === "FAQ" && <FAQ/>}
              
            </div>
          </div>
        )}
    </div>
    </div>
  );
};

export default Footer;


//   space-x-12