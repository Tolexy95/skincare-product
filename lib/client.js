import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";


const client = createClient({
  projectId: "1dgz2vj4",
  dataset: "production",
  apiVersion: "2023-08-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;