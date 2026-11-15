import React, { Suspense } from "react";
import Hero from "./Hero";
import PriceIncrease from "./PriceIncrease";
import PriceDecreased from "./PriceDecreased";
import AllProducts from "@/components/AllProducts";

type Product = React.ComponentProps<typeof AllProducts>["products"][number];

interface ApiResponse {
  data?: Product[];
}

async function ProductSections() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: Product[] | ApiResponse = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? [];

  const risers = products
    .filter((item) => item.change?.dir === "up")
    .slice(0, 6);

  const fallers = products
    .filter((item) => item.change?.dir === "down")
    .slice(0, 6);

  return (
    <>
      {/* এখানে `as any` বা কম্পোনেন্টের নিজস্ব টাইপ ব্যবহার না করে সরাসরি প্রপস পাস করা হলো */}
      <PriceIncrease items={risers as React.ComponentProps<typeof PriceIncrease>["items"]} />
      <PriceDecreased items={fallers as React.ComponentProps<typeof PriceDecreased>["items"]} />
      <AllProducts products={products} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense
        fallback={
          <p className="py-10 text-center">
            বাজারের তথ্য লোড হচ্ছে...
          </p>
        }
      >
        <ProductSections />
      </Suspense>
    </>
  );
}