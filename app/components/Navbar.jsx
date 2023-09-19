"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsFillCartDashFill } from "react-icons/bs";
import {VscAccount} from "react-icons/vsc"
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { usePathname } from "next/navigation"
import InputComponent from "./InputComponent";
import { useStateContext } from "@/context/CartProductContext";
import { useAuth } from "@/context/AuthContext";
import LoaderComponent from "./LoaderComponent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname()
  if (pathname.startsWith("/studio")) return null

  const {totalQuantities } = useStateContext();
  const{signOutUser, isLoggedIn } =useAuth()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    // Handle the logout action here
    if (isLoggedIn) {
      try {
        await signOutUser(); // Call your signOutUser function
        router.push("/");
      } catch (error) {
        console.error("Error logging out:", error);
      } finally {
        // Set isLoading back to false when the logout process is complete
        setIsLoading(false);
      }
    }
  };
  
 

  return (<div className="navbar h-20  bgNav fixed top-0 z-50 ">
    <div className="flex items-center gap-20 justify-between p-3 max-w-6xl mx-auto sm:gap-10">
      <div className="LogoDiv">
        <p className="lg:text-4xl text-5xl sm:text-2xl">
          <Link href="/">Glow & Glam</Link>
        </p>
      </div>

      <div className="w-1/3 sm:hidden">
        <InputComponent />
    </div>

      <div className="flex items-center gap-4">
        <div className="">
          <ThemeSwitcher title="Theme"/>
        </div>

        <div className="cartBag">
          <Link href="/cart">
            <button type="button" className="flex items-center gap-3">
              <BsFillCartDashFill className="h-5 w-5" title="Cart"/>
              <span className="text-sm font-bold">{totalQuantities}</span>
            </button>
          </Link>
        </div>


        <div className="text-left flex items-center ">
          <button
            onClick={toggleDropdown}
            className="">
              <VscAccount className="h-5 w-5" title="Account"/>
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-48 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link href="/signIn" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Login
                </Link>
                <Link href="/signUp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Signup
                </Link>
                <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                 Account
                </Link>
                <button href="/logout" onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" disabled={isLoading}>
                 Log out
                 {isLoading && <LoaderComponent />} 
                </button>
              </div>
            </div>
          )}
        </div>


        <div className="Admin">
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <FaEdit className="h-6 w-6 lg:h-5 lg:w-5 cursor-pointer" title="Admin" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Navbar;

// border  border-red-500
