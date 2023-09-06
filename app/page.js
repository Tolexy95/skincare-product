import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import BannerComponent from "./components/BannerComponent";
import SideNav from "./components/SideNav";


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
    <div className="py-0 px-14 mt-32 maxWidth mx-auto xs:px-6 sm:px-4 sm:mt-24">
    <div className="w-1/3 sw:hidden">
        <input
          type="text"
          className="flex  w-full rounded-md border border-input bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 lg:w-[300px]  text-xl text-center "
          placeholder="search by brands or categories"
        />
      </div>
      <div className="flex gap-7 sm:flex-col sm:mt-10">
        <div> <SideNav/></div>
     
        <BannerComponent heroBanner={banner.length && banner[0]} />
      </div>
     
        <div className="mt-10 mb-80">
          <ProductGrid products={products} />
        </div>
      </div>


    </>
  );
}
