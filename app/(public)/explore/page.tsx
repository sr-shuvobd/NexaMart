import ExploreClient from "./ExploreClient";

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.products : [];
  } catch (error) {
    return [];
  }
}

export default async function ExplorePage() {
  const initialProducts = await getProducts();
  return <ExploreClient initialProducts={initialProducts} />;
}
