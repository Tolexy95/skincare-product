"use client"

import React, { useEffect, useState } from "react";
import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "@/app/components/ProductGrid";
import { ProductInfo } from "@/app/components/ProductInfo";
import { ProductGallery } from "@/app/components/ProductGallery";
import Layout from "@/app/components/Layout";




export default function ProductDetails({ params }) {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Function to fetch product data
    async function fetchProductData() {
        try {
            const fetchedProduct = await client.fetch(groq`
        *[_type == "product" && slug.current == "${params.slug}"][0]{
          _id,
          _createdAt,
          "id": _id,
          name,
          images,
          brand,
          currency,
          price,
          description,
          categories,
          "slug": slug.current
        
}
    
    `);

    console.log(fetchedProduct)

            setProduct(fetchedProduct);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    // // Function to fetch related products
    // async function fetchRelatedProducts() {
    //     try {
    //         // Fetch related products (all products for demonstration).
    //         const allProducts = await client.fetch(groq`
    //   *[_type == "product"]{
    //     _id,
    //     name,
    //     images,
    //     brand,
    //     currency,
    //     price,
    //     "slug": slug.current
    //   }
    // `);

    //         setRelatedProducts(allProducts);
    //     } catch (error) {
    //         console.error("Error fetching related products:", error);
    //     }
    // }

    useEffect(() => {
        console.log("starting")
        // Fetch product data
        fetchProductData();

    }, [params.slug]);

    if (!product) {
        return <div>Loading...</div>;
    }



    return (
        <Layout>
            
            <main className="mt-36 mx-auto max-w-5xl sm:w-max sm:px-8">
                <div className="flex gap-12 sm:flex-col ">
                   
                    {/* Product */}
                    <div className="">
                        {/* Product gallery */}
                        <ProductGallery product={product} />
                    </div>
                   
                    <div>
                        {/* Product info */}
                        <ProductInfo product={product} />
                    </div>
                </div>
            </main>

        </Layout>
    );
}
