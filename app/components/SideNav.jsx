"use client"

import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { useStateContext } from "@/context/SideNavBarContext";


const SideNav = () => {
  const { isOpen, setIsOpen, openSections, setOpenSections } =useStateContext();
    

  const toggleSection = (section) => {
    setOpenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  return (
    <div className="w-64 fixed p-5">
      <div className="height overflow-y-scroll">
        <div className="flex justify-between flex-1">
          {isOpen &&
            Object.keys(openSections).some(
              (section) => openSections[section]
            ) && (
              <IoIosArrowBack
                className="w-6 h-6 cursor-pointer"
                onClick={() => setOpenSections({})}
              />
            )}

          {isOpen && (
            <div className="sw:hidden">
              <ThemeSwitcher />
            </div>
          )}

          {isOpen && (
            <FaEdit className="h-10 w-10 lg:h-5 lg:w-5 cursor-pointer sw:hidden" />
          )}

          <div className="flex">
            {isOpen ? (
              <AiFillCloseSquare
                className="w-9 h-9 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  setOpenSections({});
                }}
              />
            ) : (
              <GiHamburgerMenu
                className="w-9 h-9 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>

        {isOpen && (
          <nav className="sidebar">
            <p className="xl:hidden text-5xl mb-4 sm:text-3xl">
              <Link href="/">Glow & Glam</Link>
            </p>
            <div className="mt-6">
              <div className="menu-title flex items-center justify-between mt-14">
                <h1 className="text-3xl">Brand</h1>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${
                    openSections["brand"] ? "-rotate-90" : "rotate-0"
                  }`}
                  onClick={() => toggleSection("brand")}
                />
              </div>

              {openSections["brand"] && (
                <div>
                  <ul className="menu-items">
                    <li className="item">
                      <Link href="#">House of Tara</Link>
                    </li>

                    <li className="item">
                      <Link href="#">Zaron Cosmetics</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Classic Makeup</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Nuban Beauty</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Yanga Beauty</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Prestige Cosmetics</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Pauline Cosmetics</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Kuddy Cosmetics</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Elsas Pro</Link>
                    </li>
                    <li className="item">
                      <Link href="#">Royale Makeup</Link>
                    </li>
                  </ul>
                </div>
              )}

              <div className="menu-title flex items-center justify-between">
                <h1 className="text-3xl">Categories</h1>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${
                    openSections["categories"] ? "-rotate-90" : "rotate-0"
                  }`}
                  onClick={() => toggleSection("categories")}
                />
              </div>

              {openSections["categories"] && (
                <div>
                  <div className="menu-title flex items-center justify-between">
                    <p className="text-2xl">Make-Over</p>
                    <IoIosArrowForward
                      className={`w-6 h-6 cursor-pointer transition-transform transform ${
                        openSections["makeover"] ? "-rotate-90" : "rotate-0"
                      }`}
                      onClick={() => toggleSection("makeover")}
                    />
                  </div>

                  {openSections["makeover"] && (
                    <ul className="menu-items submenu">
                      <div className="flex justify-between">
                        <div>
                          <div className="menu-title">
                            <p className="text-2xl">Face</p>
                          </div>
                          <li className="item">
                            <Link href="#">Foundation</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Concealers</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Primers</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Powder</Link>
                          </li>
                        </div>
                        <div>
                          <div className="menu-title">
                            <p className="text-2xl">Lips</p>
                          </div>
                          <li className="item">
                            <Link href="#">Lip Balm</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Lip Gloss</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Lip pencils</Link>
                          </li>
                          <li className="item">
                            <Link href="#">Lipstick</Link>
                          </li>
                        </div>
                      </div>
                      <div className="menu-title">
                        <p className="text-2xl">Eyes</p>
                      </div>
                      <li className="item">
                        <Link href="#">Eye shadow</Link>
                      </li>
                    </ul>
                  )}

                  {openSections["categories"] && (
                    <div className="menu-title flex items-center justify-between">
                      <p className="text-2xl">Skincare</p>
                      <IoIosArrowForward
                        className={`w-6 h-6 cursor-pointer transition-transform transform ${
                          openSections["skincare"] ? "-rotate-90" : "rotate-0"
                        }`}
                        onClick={() => toggleSection("skincare")}
                      />
                    </div>
                  )}

                  {openSections["skincare"] && (
                    <ul className="menu-items submenu">
                      <li className="item">
                        <Link href="#">Body</Link>
                      </li>
                      <li className="item">
                        <Link href="#">Eyes</Link>
                      </li>
                      <li className="item">
                        <Link href="#">Face</Link>
                      </li>
                      <li className="item">
                        <Link href="#">Feet, hands & Nails</Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default SideNav;
