"use client"

// Import necessary modules and dependencies
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../style/signup.css";
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext";

// Define the SignUpPage component
const SignUpPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle full name input change
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Function to handle user sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing up:", error);
    }
    return router.push("/signIn");
  };

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="signBackground absolute top-0 left-0 w-full h-full z-0">
        <div className="flex justify-end sm:block">
          <form className="form mt-10 mr-32" onSubmit={handleSignUp}>
            <p className="title">Register</p>
            <p className="message">Signup now and get full access.</p>

            {/* Full Name Input */}
            <label className="w-full">
              <input
                className="input"
                type="text"
                placeholder=""
                required
                value={fullName}
                onChange={handleFullNameChange}
              />
              <span>Full Name</span>
            </label>

            {/* Email Input */}
            <label className="w-full">
              <input
                className="input"
                type="email"
                placeholder=""
                required
                value={email}
                onChange={handleEmailChange}
              />
              <span>Email</span>
            </label>

            {/* Password Input */}
            <div className="relative">
              <label className="w-full">
                <input
                  className="input"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder=""
                  required
                  value={password}
                  maxLength={13}
                  onChange={handlePasswordChange}
                />
                <span className="-mt-5">Password (min of 8 & max of 13)</span>
              </label>
              <div className="absolute left-96 top-3">
                <Image
                  src="/icons8-password-24.png"
                  alt="passwordIcon"
                  width={30}
                  height={30}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="w-full">
                <input
                  className="input"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder=""
                  required
                  value={confirmPassword}
                  maxLength={13}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="-mt-5">Confirm password</span>
              </label>

              <div className="absolute left-96 top-3">
                <Image
                  src="/icons8-password-24.png"
                  alt="passwordIcon"
                  width={30}
                  height={30}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="purchase--btn mt-7">Submit</button>

            {/* Sign In Link */}
            <p className="signin">
              Already have an account?
              <Link href="./signIn" className="signLink">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;