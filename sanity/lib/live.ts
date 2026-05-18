import { defineLive } from "next-sanity/live";

import { client } from "./client";

const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error(
    "Missing Sanity API read token. Set NEXT_PUBLIC_SANITY_API_READ_TOKEN in your environment variables.",
  );
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
