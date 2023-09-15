"use client"

import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { FaEdit } from "react-icons/fa";
import { useStateContext } from "@/context/CartProductContext";
import client from "@/lib/client";
import { groq } from "next-sanity";


const SideNav = () => {
  const { openSections, setOpenSections } = useStateContext();
  const [brands, setBrands] = useState([]);

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

  const makeoverData = [
    {
      category: "Face",
      items: [
        { subcategory: "Foundation", label: "Foundation" },
        { subcategory: "Concealers", label: "Concealers" },
        { subcategory: "Primers", label: "Primers" },
        { subcategory: "Powders", label: "Powders" },
      ],
    },
    {
      category: "Lips",
      items: [
        { subcategory: "Lip-Balm", label: "Lip Balm" },
        { subcategory: "Lip-Gloss", label: "Lip Gloss" },
        { subcategory: "Lip-Pencils", label: "Lip Pencils" },
      ],
    },
    {
      category: "Eyes",
      items: [{ subcategory: "Eye-Shadow", label: "Eye Shadow" }],
    },
  ];

  return (
    <div className="w-80  -z-50 md:w-64">
      <div className="height overflow-y-scroll">
        <div className="flex justify-between flex-1">
          <nav className="sidebar">
            <div className="">
              <div className="menu-title flex items-center gap-44 md:gap-36">
                <h1 className="text-3xl">Brand</h1>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["brand"] ? "-rotate-90" : "rotate-0"
                    }`}
                  onClick={() => toggleSection("brand")}
                />
              </div>


              {openSections["brand"] && (
                <div>
                  <ul className="menu-items mt-2">
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


              <div className="menu-title flex items-center justify-between mt-2">
                <h1 className="text-3xl">Categories</h1>
              </div>

              <div className="menu-title flex items-center justify-between mt-2">
                <p className="text-2xl">Make-Over</p>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["makeover"] ? "-rotate-90" : "rotate-0"}`}
                  onClick={() => toggleSection("makeover")}
                />
              </div>
              {openSections["makeover"] && (
                <ul className="mt-2">
                  <div className="grid grid-cols-2 gap-x-24">
                  {makeoverData.map((categoryData, index) => (
                    <div key={categoryData.category}>
                      <div className="menu-title">
                        <p className="text-2xl">{categoryData.category}</p>
                      </div>
                      
                      {categoryData.items.map((item) => (
                        <li className="item" key={item.subcategory}>
                          <Link href={`/ProductMakeover?subcategory=${encodeURIComponent(item.subcategory)}`}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </div>
                   
                    
                  ))}
                   </div>
                </ul>
              )}

              <div className="menu-title flex items-center justify-between mt-2">
                <p className="text-2xl">Skincare</p>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${openSections["skincare"] ? "-rotate-90" : "rotate-0"
                    }`}
                  onClick={() => toggleSection("skincare")}
                />
              </div>

              {openSections["skincare"] && (
                <ul className="menu-items submenu mt-2">
                  <li className="item">
                    <Link href="/ProductMakeover?subcategory=Body-cream">Body</Link>
                  </li>

                  <li className="item">
                    <Link href="/ProductMakeover?subcategory=eyes">Eyes</Link>
                  </li>

                  <li className="item">
                    <Link href="/ProductMakeover?subcategory=face">Face</Link>
                  </li>

                  <li className="item">
                    <Link href="/ProductMakeover?subcategory=feet-hands-nails">Feet, hands & Nails</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>

        </div>

      </div>

    </div>
  );
};

export default SideNav;
