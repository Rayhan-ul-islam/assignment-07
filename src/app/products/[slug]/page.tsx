
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

interface ChangeData {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
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
  change: ChangeData;
  markets: Market[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Check Login Session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/products/${slug}`)}`);
  }

  // Fetch Product
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const result = await res.json();
  const product: Product = result.data ?? result;

  const prices = [
    { title: "আজকের দাম", price: product.today },
    { title: "গতকালের দাম", price: product.yesterday },
    { title: "গত সপ্তাহের দাম", price: product.lastWeek },
    { title: "গত মাসের দাম", price: product.lastMonth },
  ];

  return (
    <main className="min-h-screen bg-[#f0f6f1] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back to Home Button */}
        <div className="mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-green-50 hover:text-green-700"
          >
            <span>←</span>
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Product Header */}
        <section className="mb-5 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-4xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <p className="text-xs text-gray-400">
                প্রতি {product.unit}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f6f1] p-4 text-center">
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              ৳ {product.today}
            </h2>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit}
            </p>

            <span
              className={`text-xs font-semibold ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct}%
            </span>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mb-5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="mb-4 font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {prices.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4"
              >
                <p className="text-xs text-gray-500">
                  {item.title}
                </p>

                <h3 className="mt-1 text-xl font-bold text-green-700">
                  ৳ {item.price}
                </h3>

                <p className="text-xs text-gray-400">
                  টাকা / {product.unit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Prices */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <h2 className="mb-4 font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">

              <thead>
                <tr className="border-b border-gray-200 bg-[#f8faf8] text-gray-600">
                  <th className="p-3">বাজার</th>
                  <th className="p-3">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {(product.markets ?? []).map((market, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 transition-colors hover:bg-green-50"
                  >
                    <td className="p-3 font-medium text-gray-700">
                      {market.market}
                    </td>

                    <td className="p-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="p-3 text-right text-gray-700">
                      ৳ {market.min}
                    </td>

                    <td className="p-3 text-right font-semibold text-gray-800">
                      ৳ {market.max}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetails;
