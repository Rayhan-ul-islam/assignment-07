
import Link from "next/link";

interface ChangeData {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
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
}

interface AllProductsProps {
  products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
  return (
    <section className="bg-[#f7f9f6] px-4 py-10 md:px-8">
    

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold text-gray-800">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-2xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.nameBn}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="mb-1 block text-xs text-gray-400">
                    আজকের দাম
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {product.today}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      টাকা
                    </span>
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    product.change?.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change?.dir === "down"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.change?.dir === "up"
                    ? "▲"
                    : product.change?.dir === "down"
                      ? "▼"
                      : "—"}
                  {product.change?.pct ?? 0}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
