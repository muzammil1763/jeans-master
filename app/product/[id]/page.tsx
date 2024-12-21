// /app/product/[id]/page.tsx

import ProductDefault from "@/components/Other/ProductDefault";
import Breadcrumb from "@/components/Other/Breadcrumb";

// Fetch function for server-side data fetching
async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}api/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.jean; // Adjust based on your API response structure
}

// Server Component
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(params.id); // Fetch data for the product

  return (
    <>
      <Breadcrumb heading="Product" subHeading="Product" />
      <ProductDefault product={product} /> {/* Pass data to client component */}
    </>
  );
}
