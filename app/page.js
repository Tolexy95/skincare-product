import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import BannerComponent from "./components/BannerComponent";
import SideNav from "./components/SideNav";
import InputComponent from "./components/InputComponent";

export default async function Page({searchParams}) {
  const {search} =searchParams
  const productFilter =`_type == "product"`
  const searchFilter =search ? `&& name match "${search}"` : ""
  const filter =`*[${productFilter} ${searchFilter}]`
  
  const products = await client.fetch(
    groq`${filter}{
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
        <InputComponent/>
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
