"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from 'next/image';


const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
const {signInEmail, resetPassword, signInWithGoogle} =useAuth()
    const router = useRouter()

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
            setError(error.message); 
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

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <section className="h-screen relative overflow-hidden">
            <div className="signBackground absolute top-0 left-0 w-full h-full z-0">
        <div className="flex justify-end">
            <div className="form-container mt-10 mr-32">
                <div className="logo-container">
                    Welcome Back!
                </div>

                <div className="social-buttons">
                    <button className="social-button google" onClick={handleGoogleSignIn}>
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            <path d="M1 1h22v22H1z" fill="none"></path>
                        </svg>
                        <span>Sign in with Google</span>
                    </button>

                </div>
                <div className="line mb-0 mt-0 text-center">OR</div>
                <form className="formSignIn" id="validationForm" onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input required=""
                            placeholder="Enter your email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            type="text" />
                    </div>

                    <div className="relative">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input required=""
                                name="password"
                                placeholder="password(min of 8 & max of 13)"
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                maxLength={13}
                                onChange={handlePasswordChange} />

                            <div className="absolute left-64 top-10">
                                <Image src="/icons8-password-24.png" alt="passwordIcon" width={30} height={30} onClick={togglePasswordVisibility} className="cursor-pointer" />
                            </div>
                        </div>
                    </div>



                    <button type="submit" className="purchase--btn mt-5">Sign In</button>
                </form>

                <p className="forgot-password-link link" onClick={handleForgotPassword}>
                    Forget password
                </p>

                <p className="signup-link">
                    Don't have an account?

                    <Link href="/signUp" className="signup-link link">Sign up</Link>
                </p>
            </div>
        </div>
        </div>
        {error && <p className="absolute top-24">{error}</p>} 
        </section>
    );
}

export default SignInPage;
