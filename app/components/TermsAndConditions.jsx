import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="text-black max-w-4xl height">
      <h2 className="text-center text-2xl font-semibold">Terms &amp; Conditions</h2>
      <div className="flex flex-col gap-6 text-lg mt-3 px-5 font-serif">
        <p>By using the Glow and Glam website, you agree to our terms and conditions. We want to ensure that your shopping experience is enjoyable and secure, so we&apos;ve outlined important information below:</p>
        <ul>
          <li>Ordering Process</li>
          <li>Return and Refund Policy</li>
          <li>Privacy and Data Protection</li>
          <li>Shipping and Delivery</li>
          <li>Payment Methods</li>
        </ul>
        <p>Your satisfaction is our priority, and we&apos;re here to assist you every step of the way.</p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
