"use client"

import { ProductDisplay } from "@/app/components/ProductDisplay";
import React, { useState, useEffect } from "react";
import { groq } from "next-sanity";
import client from "@/lib/client";
import { useStateContext } from "@/context/SideNavBarContext";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
 

   function ProductMakeover() {
     const searchParams = useSearchParams();
     const subcategory = searchParams.get('subcategory');
     const [isLoading, setIsLoading] = useState(true);
   

     const { openSections, setOpenSections, foundation,
      setFoundation,
      concealers,
      setConcealers,
      primers,
      setPrimers,
      powders,
      setPowders,
      lipBalm,
      setLipBalm,
      lipGloss,
      setLipGloss,
      lipPencils,
      setLipPencils,
      lipstick,
      setLipstick,
      eyeShadow,
      setEyeshadow,
      bodyCream,
      setBodyCream,
      eyesCream,
      setEyesCream,
      faceCream,
      setFaceCream,
      FeethandsNailsCream,
      setFeethandsNailsCream,
      products,
      setProducts,
     } = useStateContext();
    
     const fetchProducts = async (subcategory) => {
       // Fetch products based on the subcategory
       const data = await client.fetch(groq`*[_type == "product" && $subcategory in sections[].subcategories[]]`, { subcategory });
       return data;
     };
   
     useEffect(() => {
       if (subcategory) {
         // Fetch products for the selected subcategory
         fetchProducts(subcategory)
           .then((data) => {
             setProducts(data);
             setIsLoading(false);
           });
       }
     }, [subcategory]);
   
     return (
       <div className="mt-32 mx-auto mb-96 px-10 maxWidth md:px-4">
         <p className="text-center text-4xl uppercase mb-4">{subcategory}</p>
         <h1 className="text-2xl font-bold tracking-tight sm:text-2xl mb-3">
              {products.length} result{products.length === 1 ? "" : "s"}
            </h1>
         {isLoading ? (
           <p>Loading...</p>
         ) : (
          
           <ProductDisplay products={products} />
         )}
       </div>
     );
   }
   
   export default ProductMakeover;
   