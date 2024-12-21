// /app/shop/page.tsx

import Breadcrumb from "@/components/Other/Breadcrumb";
import ProductList from "@/components/Other/ProductList";

// Function to fetch data on the server
async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
    cache: "no-store", // Disable caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.jean || []; // Return the fetched products
}

// Server Component
export default async function ShopPage() {
  const products = await fetchProducts(); // Fetch data on the server

  return (
    <>
      <Breadcrumb heading="Shop" subHeading="Shop" />
      <ProductList products={products} /> {/* Pass data to client component */}
    </>
  );
}
