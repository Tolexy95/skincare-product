"use client"

import React, { useEffect, useState } from "react";
import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductInfo } from "@/app/components/ProductInfo";
import { ProductGallery } from "@/app/components/ProductGallery";
import { Relatedproduct } from "@/app/components/RelatedProduct";
import LoaderComponent from "@/app/components/LoaderComponent";



export default function ProductDetails({ params }) {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [animationStarted, setAnimationStarted] = useState(false);




    


    useEffect(() => {
        // Add a slight delay before starting the animation (adjust as needed)
        const animationTimeout = setTimeout(() => {
            setAnimationStarted(true);
        }, 500);

        return () => {
            clearTimeout(animationTimeout);
        };
    }, []);


    useEffect(() => {
        // Define an asynchronous function to fetch the product
    async function fetchProduct() {
        try {
            const productData = await client.fetch(
                groq`*[_type == "product" && slug.current == "${params.slug}"][0]{
          _id,
          _createdAt,
          "id": _id,
          name,
          images,
          brand,
          currency,
          price,
          description,
          sections,
          "slug": slug.current,
          "subcategories": sections[].subcategories[0]
        }`
            );
            setProduct(productData);
        } catch (error) {
            console.error("Error fetching product:", error);
            // Handle error, e.g., set an error state
        }
    }
fetchProduct()

    }, [params.slug]);



    useEffect(() => {
        if (product) {
            const subcategory = product.subcategories[0];

            // Fetch all other products in the same subcategory
            async function fetchRelatedProducts() {
                try {
                    const relatedProductsData = await client.fetch(
                        groq`*[_type == "product" && $subcategory in sections[].subcategories[] && _id != $productId]`,
                        {
                            subcategory: subcategory,
                            productId: product._id,
                        }
                    );
                    setRelatedProducts(relatedProductsData);
                } catch (error) {
                    console.error("Error fetching related products:", error);
                    // Handle error, e.g., set an error state
                }
            }

            // Call the fetchRelatedProducts function when the component mounts and when the product changes
            fetchRelatedProducts();
        }
    }, [product]);



    if (!product) {
        return <div>
            <LoaderComponent />

        </div>;
    }


    return (
        <main className="mt-36  lg:px-5 mb-44 z-50">
            {/* <Navbar/> */}
            <div className="grid grid-cols-2 items-start gap-8 mx:grid-cols-1 lg:gap-11 max-w-5xl mx-auto ">
                {/* Product */}
                <div className={`product-card ${animationStarted ? "animate-slide-left" : ""
                    }`}>
                    {/* Product gallery */}
                    <ProductGallery product={product} />
                </div>

                <div>
                    {/* Product info */}
                    <ProductInfo product={product} />
                </div>
            </div>


            <div className="mt-24 py-0 px-14 maxWidth mx-auto xs:px-6 sm:px-4 sm:mt-24 maylike-products-wrapper">
                <h2 className="text-center text-2xl mb-12">Related Product</h2>

                <div className="marquee">


                    <div key={relatedProducts._id} className="maylike-products-container track">
                        <Relatedproduct products={relatedProducts} />
                    </div>
                </div>


            </div>
            </main>
    );
}

