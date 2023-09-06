"use client"

import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { useStateContext } from "@/context/SideNavBarContext";
import client from "@/lib/client";
import { groq } from "next-sanity";


const SideNav = () => {
  const [brands, setBrands] = useState([]);
  const { isOpen, setIsOpen, openSections, setOpenSections } = useStateContext();
  
  

  const fetchBrands = async () => {
    const data = await client.fetch(groq`*[_type == "product"]{ brand }`);
    const uniqueBrands = [...new Set(data.map((product) => product.brand.trim()))];
    setBrands(uniqueBrands);
  };
  


  useEffect(() => {
    // Fetch the list of brands from Sanity
    fetchBrands();
  }, []);



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
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["brand"] ? "-rotate-90" : "rotate-0"
                    }`}
                  onClick={() => toggleSection("brand")}
                />
              </div>

              {openSections["brand"] && (
                <div>
                   <ul className="menu-items">
                    {brands.map((brand) => (
                      <li className="item" key={brand}>
                        <Link href={`/ProductPage?brand=${encodeURIComponent(brand)}`}>
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="menu-title flex items-center justify-between">
                <h1 className="text-3xl">Categories</h1>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["categories"] ? "-rotate-90" : "rotate-0"
                    }`}
                  onClick={() => toggleSection("categories")}
                />
              </div>

              {openSections["categories"] && (
                <div>
                  <div className="menu-title flex items-center justify-between">
                    <p className="text-2xl">Make-Over</p>
                    <IoIosArrowForward
                      className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["makeover"] ? "-rotate-90" : "rotate-0"
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
                            <Link href="/product/foundation">Foundation</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/concealers">Concealers</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/primers">Primers</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/powder">Powder</Link>
                          </li>
                        </div>
                        <div>
                          <div className="menu-title">
                            <p className="text-2xl">Lips</p>
                          </div>
                          <li className="item">
                            <Link href="/product/lip-balm">Lip Balm</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/lip-gloss">Lip Gloss</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/lip-pencils">Lip pencils</Link>
                          </li>
                          <li className="item">
                            <Link href="/product/lipstick">Lipstick</Link>
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
                        className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["skincare"] ? "-rotate-90" : "rotate-0"
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