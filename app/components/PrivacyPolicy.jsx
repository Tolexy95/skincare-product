import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="text-black max-w-4xl">
      <h2 className="text-center text-2xl font-semibold">Privacy Policy</h2>
      <div className="flex flex-col gap-6 text-lg mt-3 px-5 font-serif">
        <p>Your privacy is paramount to us. Our privacy policy outlines how we handle your personal information:</p>
        <ul>
          <li>Data Collection: Learn about the types of data we collect and how we use it to improve your shopping experience.</li>
          <li>Data Security: We employ advanced security measures to protect your information from unauthorized access.</li>
          <li>Opt-Out Options: We respect your preferences and offer options to control the data you share with us.</li>
        </ul>
        <p>We value your trust and are committed to maintaining the confidentiality of your information.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
