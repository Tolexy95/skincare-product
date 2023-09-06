import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import { cn } from "@/lib/utils";
import BannerComponent from "./components/BannerComponent";


export default async function Page() {

  const products = await client.fetch(groq`*[_type == "product"]{
        _id,
        _createdAt,
        name,
        brand,
        images,
        currency,
        price,
        description,
        "slug": slug.current
      }
    `
  )

  const banner = await client.fetch(groq`*[_type == "banner"]`);

  return (
    <>

      <div className="absolute top-28 py-0 px-14 -z-50">
        <BannerComponent heroBanner={banner.length && banner[0]} />
        <div className="mt-10 mb-80">
          <ProductGrid products={products} />
        </div>
      </div>


    </>
  );
}
