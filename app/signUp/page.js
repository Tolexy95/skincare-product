"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../style/signup.css"
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext";

const SignUpPage = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordVisible, setPasswordVisible] = useState(false);
const{signUpWithEmailAndPassword} =useAuth()
  const router = useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
    return router.push("/signIn")
  };

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="signBackground absolute top-0 left-0 w-full h-full z-0">
      <div className="flex justify-end sm:block">
      <form className="form mt-10 mr-32" onSubmit={handleSignUp}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access.</p>

        <label className="w-full">
          <input className="input"
            type="text"
            placeholder=""
            required
            value={fullName}
            onChange={handleFullNameChange} />
          <span>Full Name</span>
        </label>


        <label className="w-full">
          <input className="input "
            type="email"
            placeholder=""
            required
            value={email}
            onChange={handleEmailChange} />
          <span>Email</span>
        </label>

        <div className="relative">
          <label className="w-full">
            <input className="input"
              type={isPasswordVisible ? "text" : "password"}
              placeholder=""
              required
              value={password}
             maxLength={13}
              onChange={handlePasswordChange} />
            <span className="-mt-5">Password (min of 8 & max of 13)</span>
          </label>
          <div className="absolute left-96 top-3 ">
            <Image
              src="/icons8-password-24.png"
              alt="passwordIcon"
              width={30}
              height={30}
              onClick={togglePasswordVisibility}
              className="cursor-pointer" />
          </div>
        </div>



        <div className="relative">
          <label className="w-full">
            <input className="input"
              type={isPasswordVisible ? "text" : "password"}
              placeholder=""
              required
              value={confirmPassword}
              maxLength={13}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className="-mt-5">Confirm password</span>
          </label>

          <div className="absolute left-96 top-3">
            <Image
              src="/icons8-password-24.png"
              alt="passwordIcon"
              width={30}
              height={30}
              onClick={togglePasswordVisibility}
              className="cursor-pointer" />
          </div>
        </div>

        <button className="purchase--btn mt-7">Submit</button>
        <p className="signin">Already have an account?
          <Link href="./signIn" className="signLink">Sign in</Link>
        </p>
      </form>

      {/* <div className="social-buttons">
        <button className="social-button google">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            <path d="M1 1h22v22H1z" fill="none"></path>
          </svg>
          <span>Sign up with Google</span>
        </button>
        </div> */}
      </div>
      </div>
    </section>
  );
};

export default SignUpPage;
