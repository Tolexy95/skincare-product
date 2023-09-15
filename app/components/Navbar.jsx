"use client";
import React from "react";
import Link from "next/link";
import { BsFillCartDashFill } from "react-icons/bs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { usePathname} from "next/navigation"
import InputComponent from "./InputComponent";
import { useStateContext } from "@/context/CartProductContext"; 

const Navbar = () => {
  const pathname = usePathname()
  if (pathname.startsWith("/studio")) return null

  const { showCart, setShowCart, totalQuantities } = useStateContext();


  return (<div className="navbar h-20  bgNav fixed top-0 z-50 ">
    <div className="flex items-center gap-20 justify-between p-3 max-w-6xl mx-auto sm:gap-10">
      <div className="LogoDiv">
        <p className="lg:text-4xl text-5xl sm:text-2xl">
          <Link href="/">Glow & Glam</Link>
        </p>
      </div>

      <div className="w-1/3 sm:hidden">
        <InputComponent/>

      </div>


      <div className="flex items-center gap-4">

        <div className="">
          <ThemeSwitcher />
        </div>

        <div className="cartBag">
        <Link href="/cart">
          <button type="button" className="flex items-center gap-3">
            <BsFillCartDashFill className="h-5 w-5" />
            <span className="text-sm font-bold">{totalQuantities}</span>
          </button>
          </Link>
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
