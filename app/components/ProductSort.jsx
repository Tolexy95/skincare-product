"use client"

import React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const ProductSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname =usePathname()

  const sortOptions = [
    { name: "Newest", value: "date=desc" },
    { name: "Price, low to high", value: "price=asc" },
    { name: "Price, high to low", value: "price=desc" },
  ];

 
  const handleSortChange = (value) => {
   router.replace(value)
  };

  return (
    <div className="w-48">
    <label htmlFor="touch">
      <span className="span">Sort by</span>
    </label>
    <input type="checkbox" id="touch" />

    <ul className="slide">
      <div className="liBg">
        {sortOptions.map((option) => (
          <li
            key={option.name}
            onClick={() => handleSortChange(option.value)}
          >
            {option.name}
          </li>
        ))}
      </div>
    </ul>
  </div>
  );
};

export default ProductSort;

