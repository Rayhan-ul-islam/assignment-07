import AllProducts, { Product } from "@/components/AllProducts";

const page = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? [];

  return (
    <div>
      <AllProducts products={products} />
    </div>
  );
};

export default page;