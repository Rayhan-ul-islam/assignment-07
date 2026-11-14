import React from 'react';
import Image from 'next/image';

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

interface PriceDecreasedProps {
    items: Product[];
}

const toBanglaDigit = (num: number | string): string => {
    const banglaDigits: { [key: string]: string } = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    return num.toString().replace(/[0-9]/g, (w) => banglaDigits[w]);
};

const formatUnit = (unit: string): string => {
    if (unit === 'kg') return 'প্রতি কেজি';
    if (unit === 'liter') return 'প্রতি লিটার';
    if (unit === 'dozen') return 'প্রতি ডজন';
    if (unit === 'piece') return 'প্রতি পিস';
    return `প্রতি ${unit}`;
};

const PriceDecreased: React.FC<PriceDecreasedProps> = ({ items = [] }) => {
    if (!items || items.length === 0) return null;

    return (
        <section className="w-full bg-[#f4fbf6] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-2 mb-6">
                    <span className="text-emerald-600 text-lg">▼</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        আজ দাম কমেছে
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.slice(0, 6).map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 bg-white rounded-full p-1.5 shadow-xs flex items-center justify-center border border-gray-100 text-xl">
                                        {item.image?.startsWith('/') ? (
                                            <Image
                                                src={item.image}
                                                alt={item.nameBn}
                                                width={28}
                                                height={28}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <span>{item.image || item.categoryIcon}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">{item.nameBn}</h3>
                                        <p className="text-xs text-gray-500">{formatUnit(item.unit)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-gray-100 flex items-end justify-between">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
                                    <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                        {toBanglaDigit(item.today)} <span className="text-sm font-normal text-gray-600">টাকা</span>
                                    </span>
                                </div>

                                <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                    <span>▼</span>
                                    <span>{toBanglaDigit(item.change.pct)}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PriceDecreased;