"use client"; 


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from 'next/image';
import LoaderComponent from "../components/LoaderComponent";

// Define the SignInPage component
const SignInPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const { signInEmail, resetPassword } = useAuth()

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle password input change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle forgot password functionality
    const handleForgotPassword = async () => {
        try {
            await resetPassword(email);
            alert("Password reset email sent. Please check your inbox.");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("An error occurred while sending the password reset email. Please try again later.");
        }
    };

    // Handle the sign-in process
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInEmail(email, password);
            router.push("/");
        } catch (error) {
            console.error("Error signing in:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <section className="h-screen relative overflow-hidden">
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <div className="signBackground absolute top-0 left-0 w-full h-full z-0">
                    <div className="flex justify-end sm:block">
                        <div className="form-container mt-24 mr-32">
                            <div className="logo-container">Welcome!</div>

                            <form className="formSignIn" id="validationForm" onSubmit={handleSignIn}>
                                <div className="form-group">
                                    <input
                                        required=""
                                        placeholder="Enter your email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        type="text"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            required=""
                                            name="password"
                                            placeholder="password(min of 8 & max of 13)"
                                            id="password"
                                            type={isPasswordVisible ? "text" : "password"}
                                            value={password}
                                            maxLength={13}
                                            onChange={handlePasswordChange}
                                        />

                                        <div className="absolute left-80 top-10">
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
                                </div>

                                <button type="submit" className="purchase--btn mt-5" disabled={isLoading}>
                                    Sign In
                                </button>
                            </form>

                            <p className="forgot-password-link link" onClick={handleForgotPassword}>
                                Forget password
                            </p>

                            <p className="signup-link">
                                Don&apos;t have an account?
                                <Link href="/signUp" className="signup-link link">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {error && <p className="absolute top-24">{error}</p>}
        </section>
    );
}

export default SignInPage; 