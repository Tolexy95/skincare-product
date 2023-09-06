import client from "@/lib/client";
import { groq } from "next-sanity";
import { ProductGrid } from "./components/ProductGrid";
import { cn } from "@/lib/utils";
import BannerComponent from "./components/BannerComponent";
import Layout from "./components/Layout";
import RootLayout from "./layout";


export default async function Page() {
  //   const { brand, category, subcategory } = searchParams

  // // This variable is used to get all products.
  //   const productFilter = `_type == "product"`;
  //   // This variable is used to filter products by brand.
  //   const brandFilter = brand ? `&& brand == "${brand}"` : "";
  //  // This variable is used to filter products by categories.
  //   const categoryFilter = category ? `&& category == "${category}"` : "";
  //   // This variable is used to filter products by subCategories.
  //   const subcategoryFilter = subcategory ? `&& subcategory == "${subcategory}"` : "";
  // // This variable is used to construct the filter query.
  //   const filter = `*[${productFilter} ${brandFilter} ${categoryFilter} ${subcategoryFilter}]`;

  // const products = await client.fetch(
  //   groq`${filter}{
  //   _id,
  //   _createdAt,
  //   name,
  //   brand,
  //   images,
  //   currency,
  //   price,
  //   description,
  //   "slug": slug.current
  // }
  //  `
  // )

  const products = await client.fetch( groq`*[_type == "product"]{
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
      <RootLayout suppressHydrationWarning={true}>
        <Layout>
          <div className="absolute top-28 py-0 px-14 -z-50">
            <BannerComponent heroBanner={banner.length && banner[0]} />
            <div className="mt-10 mb-80">
              <ProductGrid products={products} />
            </div>
          </div>
        </Layout>
      </RootLayout>

    </>
  );
}
