"use client"

import { ProductDisplay } from "@/app/components/ProductDisplay";
import React, { useState, useEffect } from "react";
import { groq } from "next-sanity";
import client from "@/lib/client";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import LoaderComponent from "@/app/components/LoaderComponent";


const ProductPage = () => {
  const searchParams = useSearchParams(); // Use useSearchParams to get query parameters
  const brand = searchParams.get("brand"); // Get the brand from the query parameter

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (brand) {
      // Fetch products based on the selected brand
      const fetchProducts = async () => {
        try {
          const data = await client.fetch(
            groq`*[ _type == "product" && brand == $brand ]`,
            { brand }
          );
          setProducts(data);
          setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error("Error fetching products:", error);
          setIsLoading(false); // Set loading to false in case of an error
        }
      };

      fetchProducts();
    }
  }, [brand]);


  return (
    <div className="mt-32 mx-auto mb-96 px-10 maxWidth md:px-4">
      <p className="text-center text-2xl uppercase mb-4">Products from {brand} brand</p>
      <h1 className="text-2xl font-bold tracking-tight mb-3 sm:text-2xl">
        {products.length} result{products.length === 1 ? "" : "s"}
      </h1>
      {isLoading ? (
        <div>
          <LoaderComponent />

        </div>


        // Display a loading message or spinner
      ) : (
        <ProductDisplay products={products} />
      )}
    </div>
  );
};

export default ProductPage;
