"use client"

import React from "react";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { auth } from "@/app/firebase/Auth/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";


export const AuthProviderContext = createContext();

export const AuthProductContext = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state as null
  const[isLoggedIn, setIsLoggedIn]=useState(false)
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("user", JSON.stringify(authUser));
        setUser(authUser);
        setIsLoggedIn(true); // Set isLoggedIn to true when user is logged in
      } else {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false); // Set isLoggedIn to false when user is logged out
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setEmail(userInfo.email);
      setFullName(userInfo.fullName);
    }
  }, []);


  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // You can save user data to your database here
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signInEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      // Save user credentials and additional info (email and full name)
      const userInfo = {
        email: user.email,
        fullName: user.displayName, // Assuming you have stored the full name in the user's profile
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      // Save user credentials (example: store in local storage)
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // Clear user credentials (example: remove from local storage)
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      // Email sent, inform the user
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  const listenToAuthStateChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // Save user credentials (example: store in local storage)
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // User is signed out
        // Clear user credentials (example: remove from local storage)
        localStorage.removeItem("user");
      }
      callback(user);
    });
  };

  

  const contextValue = {
    signUpWithEmailAndPassword,
    signInEmail,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    listenToAuthStateChanges,
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
    setPhoneNumber
    
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => useContext(AuthProviderContext);
