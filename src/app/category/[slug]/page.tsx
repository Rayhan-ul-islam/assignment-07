
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
};

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();

    const [products, setProducts] = useState<Product[]>([]);
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`
                );

                if (!res.ok) {
                    throw new Error("Products fetch failed");
                }

                const data = await res.json();

                const productList = Array.isArray(data)
                    ? data
                    : data.data ?? [];

                setProducts(productList);

            } catch (error) {
                console.error("Product Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProducts();
        }
    }, [slug]);

    // Sort Products
    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "low") {
            return a.today - b.today;
        }

        if (sort === "high") {
            return b.today - a.today;
        }

        return a.id - b.id;
    });

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f1f6f1] flex items-center justify-center">
                <p className="text-gray-500">পণ্য লোড হচ্ছে...</p>
            </div>
        );
    }

    const categoryName = products[0]?.categoryNameBn || "পণ্য";
    const categoryIcon = products[0]?.categoryIcon || "🛒";

    return (
        <main className="min-h-screen bg-[#f1f6f1] px-4 py-8">

            <div className="mx-auto max-w-6xl">

                {/* Category Header */}
                <div className="mb-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-3xl">
                        {categoryIcon}
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            {categoryName}
                        </h1>

                        <p className="text-xs text-gray-500">
                            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>

                </div>

                {/* Sorting */}
                <div className="mb-3 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-3">

                    <label className="text-xs text-gray-500">
                        সাজান
                    </label>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="select select-bordered select-xs bg-white text-gray-700"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low">দাম: কম থেকে বেশি</option>
                        <option value="high">দাম: বেশি থেকে কম</option>
                    </select>

                </div>

                {/* Product Count */}
                <p className="mb-3 text-xs text-gray-500">
                    মোট {products.length}টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </div>
                ) : (

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                        {sortedProducts.map((product) => (

                            <div
                                key={product.id}
                                className="rounded-xl border border-gray-200 bg-white/80 p-3 transition hover:border-green-200 hover:shadow-sm"
                            >

                                {/* Product Name */}
                                <div className="mb-3 flex items-center gap-3">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f1f6f1] text-2xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="truncate text-sm font-bold text-gray-800">
                                            {product.nameBn}
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            প্রতি {product.unit}
                                        </p>
                                    </div>

                                </div>

                                {/* Price */}
                                <div className="flex items-end justify-between">

                                    <div>
                                        <p className="mb-1 text-[11px] text-gray-500">
                                            আজকের বাজার দর
                                        </p>

                                        <p className="text-lg font-bold text-gray-900">
                                            {product.today} টাকা
                                        </p>
                                    </div>

                                    {/* Price Change */}
                                    <div
                                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                            product.change.dir === "up"
                                                ? "bg-red-50 text-red-500"
                                                : product.change.dir === "down"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {product.change.dir === "up"
                                            ? "▲"
                                            : product.change.dir === "down"
                                            ? "▼"
                                            : "—"
                                        } {product.change.pct}%
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
};

export default CategoryPage;
