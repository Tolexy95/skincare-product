import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import BannerComponent from "./components/BannerComponent";
import SideNav from "./components/SideNav";
import InputComponent from "./components/InputComponent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomeUser from "./components/welcome";


export default async function Page({searchParams}) {
  const { search } = searchParams

  const productFilter = `_type == "product"`
  const searchFilter = search ? `&& name match "${search}"` : ""
  const filter = `*[${productFilter} ${searchFilter}]`

  const products = await client.fetch(
    groq`${filter} {
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
    <div className="">
      <Navbar />
     
      <div className="py-0 px-14 mt-44 maxWidth mx-auto xs:px-6 sm:px-4 sm:mt-24">
        <div className="w-1/3 sw:hidden">
          <InputComponent />
        </div>
        <div className="absolute left-3/4 top-24 sm:left-1/4 sm:top-36">
          <WelcomeUser/>
        </div>
        <div className="flex gap-7 sm:flex-col sm:mt-24">
          <div> <SideNav /></div>

          <BannerComponent heroBanner={banner.length && banner[0]} />
        </div>
        <div className="mt-12 mb-80">

          <ProductGrid products={products} />
        </div>
        <Footer />
      </div>

    </div>

  );
}
