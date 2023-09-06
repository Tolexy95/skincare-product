"use client";
import React from "react";
import Link from "next/link";
import { BsFillCartDashFill } from "react-icons/bs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation"


const Navbar = () => {
  const pathname = usePathname()

  if (pathname.startsWith("/studio")) return null


  return (<div className="navbar h-20 bg-gray-600 fixed top-0 ">
    <div className="flex items-center gap-20 justify-between p-3 max-w-6xl mx-auto sm:gap-10">
      <div className="LogoDiv">
        <p className="lg:text-4xl text-5xl sm:text-2xl">
          <Link href="/">Glow & Glam</Link>
        </p>
      </div>

      <div className="w-1/3 sm:hidden">
        <input
          type="text"
          className="flex  w-full rounded-md border border-input bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 lg:w-[300px]  text-xl text-center "
          placeholder="search by brands or categories"
        />
      </div>


      <div className="flex items-center gap-4">

        <div className="">
          <ThemeSwitcher />
        </div>

        <div className="cartBag">
          <button type="button" className="flex items-center gap-3">
            <BsFillCartDashFill className="h-5 w-5" />
            <span className="">0</span>
          </button>
        </div>

        <div className="Admin">
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <FaEdit className="h-6 w-6 lg:h-5 lg:w-5 cursor-pointer" />
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
