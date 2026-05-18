/**
 * Sanity Studio mounted in the Next.js app at /studio (Server Component).
 * Re-exports metadata/viewport from next-sanity, then renders the Client child.
 */
import { Studio } from "./Studio";

export { metadata, viewport } from "next-sanity/studio";
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
