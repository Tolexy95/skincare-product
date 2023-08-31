"use client";
import React from "react";
import Link from "next/link";
import { BsFillCartDashFill } from "react-icons/bs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import SideNav from "./SideNav";
import { usePathname, useRouter, useSearchParams } from "next/navigation"


const Navbar = () => {
const pathname =usePathname()

if(pathname.startsWith("/studio")) return null


  return (
    <div className="flex mt-3 ml-4 ">
      <SideNav />
      <div className="flex items-center gap-20 fixed left-96 ml-10 justify-evenly w-3/4  lg:gap-16 md:gap-10 md:ml-2 sm:left-64 sm:ml-6">
        <p className="lg:hidden text-5xl">
          <Link href="/">Glow & Glam</Link>
        </p>

        <div className="flex items-center gap-7 mr-4 lg:gap-4 lg:mr-16 md:mr-44">
          <input
            type="text"
            className="flex  w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 lg:w-[300px] md:w-[200px] sm:hidden "
            placeholder="search"
          />
          <div className="xs:hidden">
            <ThemeSwitcher />
          </div>
          <button type="button" className="flex items-center xs:mr-8">
            <BsFillCartDashFill className="h-5 w-5" />
            <span className="">0</span>
          </button>

          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <FaEdit className="h-6 w-6 lg:h-5 lg:w-5 cursor-pointer xs:hidden" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// border  border-red-500
