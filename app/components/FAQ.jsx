import React from "react";

const FAQ = () => {
  return (
    <div className="text-black max-w-4xl">
      <h2 className="text-center text-2xl font-semibold">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-6 text-lg mt-3 px-5 font-serif">
        <p>Got questions? We&apos;ve got answers! Check out our FAQ section to find information on a wide range of topics:</p>
        <ul>
          <li>Product Information: Learn more about our skincare and beauty products.</li>
          <li>Ordering and Payment: Get details on the ordering process and payment methods.</li>
          <li>Shipping and Delivery: Find out about shipping times and tracking your order.</li>
          <li>Returns and Refunds: Understand our return policy and how to initiate a return.</li>
        </ul>
        <p>If you can&apos;t find the information you&apos;re looking for, don&apos;t hesitate to reach out to our friendly customer support team. We&apos;re here to assist you!</p>
      </div>
    </div>
  );
}

export default FAQ;
