import React, { Suspense } from 'react';
import Hero from './Hero';
import PriceIncrease from './PriceIncrease';
import PriceDecreased from './PriceDecreased';

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

// 1. Data Fetching and Display Component
const ProductSections = async () => {
    const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        cache: 'no-store'
    });
    const data: Product[] = await productRes.json();

    const riserProduct = data
        ?.filter((item) => item.change?.dir === "up")
        .slice(0, 6) || [];

    const fallerProduct = data
        ?.filter((item) => item.change?.dir === "down")
        .slice(0, 6) || [];

    return (
        <>
            {riserProduct.length > 0 && <PriceIncrease items={riserProduct} />}
            {fallerProduct.length > 0 && <PriceDecreased items={fallerProduct} />}
        </>
    );
};

// 2. Main HomePage Component with Suspense
const HomePage = () => {
    return (
        <div>
            <Hero />
            <Suspense fallback={<div className="text-center py-10">বাজারের তথ্য লোড হচ্ছে...</div>}>
                <ProductSections />
            </Suspense>
        </div>
    );
};

export default HomePage;