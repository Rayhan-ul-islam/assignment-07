
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Product Interface
interface ChangeData {
  dir: "up" | "down";
  pct: number;
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
}

interface PriceIncreaseProps {
  items: Product[];
}

// Bangla Number
const toBanglaDigit = (num: number | string): string => {
  const banglaDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return num.toString().replace(/[0-9]/g, (w) => banglaDigits[w]);
};

// Format Unit
const formatUnit = (unit: string): string => {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "liter") return "প্রতি লিটার";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";

  return `প্রতি ${unit}`;
};

const PriceIncrease: React.FC<PriceIncreaseProps> = ({
  items = [],
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full bg-[#f4fbf6] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-lg text-red-600">▲</span>

          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            আজ দাম বেড়েছে
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-[#f8faf9] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {/* Product Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white p-1.5 text-xl shadow-sm">
                    {item.image?.startsWith("/") ? (
                      <Image
                        src={item.image}
                        alt={item.nameBn}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <span>
                        {item.image || item.categoryIcon}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {item.nameBn}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {formatUnit(item.unit)}
                    </p>
                  </div>

                </div>
              </div>

              {/* Price Info */}
              <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-3">

                <div>
                  <span className="mb-0.5 block text-xs text-gray-500">
                    আজকের দাম
                  </span>

                  <span className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                    {toBanglaDigit(item.today)}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      টাকা
                    </span>
                  </span>
                </div>

                {/* Price Increase Badge */}
                <div className="flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                  <span>▲</span>

                  <span>
                    {toBanglaDigit(item.change.pct)}%
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PriceIncrease;
