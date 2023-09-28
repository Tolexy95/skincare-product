"use client"

// Import necessary modules and dependencies
import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useStateContext } from "@/context/CartProductContext";
import client from "@/lib/client";
import { groq } from "next-sanity";



// Define the SideNav component
const SideNav = () => {
  const { openSections, setOpenSections } = useStateContext();
  const [brands, setBrands] = useState([]);

  // Function to fetch brands from Sanity
  const fetchBrands = async () => {
    const data = await client.fetch(groq`*[_type == "product"]{ brand }`);
    const uniqueBrands = [...new Set(data.map((product) => product.brand.trim()))];
    setBrands(uniqueBrands);
  };

  useEffect(() => {
    // Fetch the list of brands from Sanity when the component mounts
    fetchBrands();
  }, []);

  // Function to toggle the visibility of a section
  const toggleSection = (section) => {
    setOpenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  // Data for the Make-Over category and its subcategories
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
    <div className="w-80 -z-50 md:w-64">
      <div className="height overflow-y-scroll">
        <div className="flex justify-between flex-1">
          <nav className="">
            <div className="">
              {/* Brand Section */}
              <div className="menu-title flex items-center gap-44 md:gap-36 mb-4">
                <h1 className="text-3xl">Brand</h1>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${
                    openSections["brand"] ? "-rotate-90" : "rotate-0"
                  }`}
                  onClick={() => toggleSection("brand")}
                />
              </div>

              {/* List of Brands */}
              {openSections["brand"] && (
                <div>
                  <ul className="mt-2">
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

              {/* Categories Section */}
              <div className="flex items-center justify-between mt-2 mb-4">
                <h1 className="text-3xl">Categories</h1>
              </div>

              {/* Make-Over Category */}
              <div className="flex items-center justify-between mt-2 mb-4">
                <p className="text-2xl">Make-Over</p>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${
                    openSections["makeover"] ? "-rotate-90" : "rotate-0"
                  }`}
                  onClick={() => toggleSection("makeover")}
                />
              </div>

              {/* Subcategories of Make-Over */}
              {openSections["makeover"] && (
                <ul className="mt-2">
                  <div className="grid grid-cols-2 gap-x-24">
                    {makeoverData.map((categoryData, index) => (
                      <div key={categoryData.category}>
                        <div className="">
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

              {/* Skincare Category */}
              <div className="menu-title flex items-center justify-between mt-2">
                <p className="text-2xl">Skincare</p>
                <IoIosArrowForward
                  className={`w-6 h-6 cursor-pointer transition-transform transform ${
                    openSections["skincare"] ? "-rotate-90" : "rotate-0"
                  }`}
                  onClick={() => toggleSection("skincare")}
                />
              </div>

              {/* Subcategories of Skincare */}
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

export default SideNav; // Export the SideNav component
