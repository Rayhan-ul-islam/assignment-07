
"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import type { Product } from "./AllProducts";

const MarketMarquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        const data: Product[] = Array.isArray(result)
          ? result
          : result.data ?? [];

        setProducts(data);
      } catch (error) {
        console.error("Products fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="border-b border-gray-200 bg-white py-2">
      <Marquee
        speed={40}
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
      >
        {products.map((product) => {
          const dir = product.change?.dir;

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <span className="text-gray-700">
                {product.categoryIcon} {product.nameBn}
              </span>

              <span className="font-semibold text-gray-800">
                ৳ {product.today}
              </span>

              <span
                className={`font-semibold ${
                  dir === "up"
                    ? "text-red-600"
                    : dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"}{" "}
                {product.change?.pct ?? 0}%
              </span>

              <span className="ml-3 text-gray-300">|</span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarketMarquee;
