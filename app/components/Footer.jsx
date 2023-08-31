import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute -bottom-full  border-t w-11/12">
      <div className="mx-auto max-w-7xl  px-6 py-12 sm:py-20 lg:px-8">
      <nav className="flex justify-center space-x-12" aria-label="Footer">
        <div className="pb-6">
          <Link href="/" className="text-sm leading-6">
            Home
          </Link>
        </div>
        <div className="pb-6">
          <Link href="#" className="text-sm leading-6">
            About
          </Link>
        </div>
        <div className="pb-6">
          <Link href="#" className="text-sm leading-6">
            Terms & Conditions
          </Link>
        </div>

        <div className="pb-6">
          <Link href="#" className="text-sm leading-6">
            Shipping & Return Policy
          </Link>
        </div>

        <div className="pb-6">
          <Link href="#" className="text-sm leading-6">
            Privacy Policy
          </Link>
        </div>

        <div className="pb-6">
          <Link href="#" className="text-sm leading-6">
            FAQ
          </Link>
        </div>
      </nav>
      <Link href="/" className="mt-10 block text-center text-xs leading-5">
        &copy; {new Date().getFullYear()} Skincare LLC. All rights reserved.
      </Link>
    </div>
    </div>
  );
};

export default Footer;
