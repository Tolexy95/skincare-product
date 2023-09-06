"use client"

import { ProductGrid } from "@/app/components/ProductGrid";
import React, { useState, useEffect } from "react";
import { groq } from "next-sanity";
import client from "@/lib/client";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Layout from "@/app/components/Layout";


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
          console.log("data", data);
        } catch (error) {
          console.error("Error fetching products:", error);
          setIsLoading(false); // Set loading to false in case of an error
        }
      };

      fetchProducts();
    }
  }, [brand]);

  console.log("Brand:", brand);

  return (
    // <Layout>
      <div>
        {isLoading ? (
          <p>Loading...</p> // Display a loading message or spinner
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    // </Layout>

  );
};

export default ProductPage;
