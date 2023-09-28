"use client"

// Import necessary modules and dependencies
import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "@/app/firebase/Auth/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Create a context for the authentication provider
export const AuthProviderContext = createContext();

// Define the authentication provider component
export const AuthProductContext = ({ children }) => {
  // Initialize user state as null
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("user", JSON.stringify(authUser));
        setUser(authUser);
        setIsLoggedIn(true); // Set isLoggedIn to true when the user is logged in
      } else {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false); // Set isLoggedIn to false when the user is logged out
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Load user information from localStorage when available
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setEmail(userInfo.email);
      setFullName(userInfo.fullName);
    }
  }, []);

  // Function to sign up a user with email and password
  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Function to sign in a user with email and password
  const signInEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userInfo = {
        email: user.email,
        fullName: user.displayName,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      // Clear user credentials from localStorage
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  // Function to reset the user's password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  // Create a context value object containing all the authentication functions and state
  const contextValue = {
    signUpWithEmailAndPassword,
    signInEmail,
    signOutUser,
    resetPassword,
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
    email,
    setEmail,
    fullName,
    setFullName,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
  };

  // Provide the context value to child components
  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
};

// Create a custom hook to access the authentication context
export const useAuth = () => useContext(AuthProviderContext);
