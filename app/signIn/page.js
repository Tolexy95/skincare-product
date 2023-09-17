"use client"

import React, {useState} from "react";
import Link from "next/link";
import {
    signInEmail,
    resetPassword,
    signInWithGoogle
  } from "../../firebaseAuth"; // Import the Firebase authentication functions
import { useRouter } from "next/navigation";


const SignInPage = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router =useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      await resetPassword(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("An error occurred while sending the password reset email. Please try again later.");
    }
    
  };

 
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInEmail(email, password);
      // Redirect or handle successful sign-in
      router.push("/checkout");
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Display error message to the user (e.g., using state)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Handle redirection or display success message
      router.push("/checkout"); // Redirect to the desired page after Google sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle and display error messages as needed
    }
  };
  
  
  return (
    <section className="">
      <form action="" id="validationForm" onSubmit={handleSignIn}>
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

            <p className="">
              The password length must be a minimum of 8 characters
            </p>
          </div>

          <div className="">
            <div className="">
              <input type="checkbox" className="" />
              <p className="">Remember me</p>
            </div>

            <p className=""  onClick={handleForgotPassword}>
              Forget password
            </p>
          </div>


<div>
    <button>Login</button>
</div>
          <div>
            <p className="">
              Don't have an account?
              <span>
                <Link href="/signUp" className="">
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
      <div>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </section>
  );
};

export default SignInPage;
