import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductInfo } from "@/app/components/ProductInfo";
import { ProductGallery } from "@/app/components/ProductGallery";


export default async function ProductDetails({ params }) {

 const product = await client.fetch(groq `*[_type == "product" && slug.current == "${params.slug}"][0]{
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
       `)


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
      
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
    );
}
