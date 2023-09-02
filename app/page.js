import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import { cn } from "@/lib/utils";
import BannerComponent from "./components/BannerComponent";
import Layout from "./components/Layout";
import RootLayout from "./layout";

// import { ProductFilters } from "@/components/product-filters";
// import { ProductSort } from "@/components/product-sort";

export default async function Page({ searchParams }) {

const { date = "desc", price, size, color, category, search } = searchParams;

  const priceOrder = price ? `|order(price ${price})` : "";

  const dateOrder = date ? `|order( _createdAt ${date})` : "";

  const order = `${priceOrder} ${dateOrder}`;

  const productFilter = `_type == "product"`;
  const colorFilter = color ? `&& "${color}" in colors` : "";
  const categoryFilter = category ? `&& "${category}" in categories` : "";
  const sizeFilter = size ? `&& "${size}" in sizes` : "";
  const searchFilter = search ? `&& name match "${search}"` : "";
  const filter = `*[${productFilter} ${colorFilter} ${categoryFilter} ${sizeFilter} ${searchFilter}]`;

  const products = await client.fetch(groq`*[_type == "product"]`);

  const banner = await client.fetch(groq`*[_type == "banner"]`);

  return (
    <>
      <RootLayout suppressHydrationWarning={true}>
        <Layout>
          <div className="absolute top-28 py-0 px-14 -z-50">
            <BannerComponent heroBanner ={banner.length && banner[0]} />
            <div className="mt-10 mb-80">
              <ProductGrid products={products} />
            </div>
          </div>
        </Layout>
      </RootLayout>

    </>
  );
}
