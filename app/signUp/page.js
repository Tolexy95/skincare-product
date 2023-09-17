"use client"

import React, {useState} from "react";
import Link from "next/link";
import {
    signUpWithEmailAndPassword ,
  } from "../../firebaseAuth"; // Import the Firebase authentication functions
import { useRouter } from "next/navigation";


const SignUpPage = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router =useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailAndPassword (email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
    return router.push("/signIn")
  };
  
  return (
    <section className="">
      <form action="" id="validationForm" onSubmit={handleSignUp}>
        <div className="">
          <h2 className="">Login</h2>
          <div className="">
            <div className="">
              <input
                type="email"
                placeholder="Enter your email"
                className=""
                required
                id="emailBox"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
             
            </div>

            <div className="">
              <input
                type="password"
                placeholder="Enter your Password"
                maxLength="13"
                className=""
                required
                id="passwordBox"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="">
              <input
                type="password"
                placeholder="Enter your Password"
                maxLength="13"
                className=""
                required
                id="passwordBox"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <p className="">
              The password length must be a minimum of 8 characters
            </p>
          </div>


<div>
    <button>Sign Up</button>
</div>
          <div>
            <p className="">
              Already have an account?
              <span>
                <Link href="/signIn" className="">
                  Login
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
      <div>
        {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
      </div>
    </section>
  );
};

export default SignUpPage;
