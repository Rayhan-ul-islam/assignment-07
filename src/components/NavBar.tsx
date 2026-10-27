"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const NavBar = () => {
    const [date, setDate] = useState<string>("");
    const [category, setCategory] = useState<Category[]>([]);
    const pathName = usePathname();

    useEffect(() => {
        setDate(
            new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            })
        );
    }, []);

    useEffect(() => {
        fetch("https://openapi.programming-hero.com/api/bazardor/categories")
            .then((res) => res.json())
            .then((data: Category[]) => {
                setCategory(data);
            });
    }, []);

    return (
        <div>
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="shrink-0 rounded-md bg-[#05893E] p-2">
                            <Image
                                src="/logo-icon.png"
                                alt="logo"
                                width={40}
                                height={30}
                                className="h-auto w-8 sm:w-10"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-2xl font-bold sm:text-3xl md:text-4xl">
                                বাজার দর
                            </p>
                            <p className="text-xs text-gray-600 sm:text-sm">
                                {date}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href='/signin'>
                            <button className="btn btn-sm sm:btn-md">
                                সাইন ইন
                            </button>
                        </Link>
                        <Link href='/signup'>
                            <button className="btn btn-success btn-sm sm:btn-md">
                                সাইন আপ
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <nav className="border-b border-gray-200">
                <div className="mx-auto py-2 flex max-w-6xl flex-wrap items-center gap-2">
                    {category.map((cat) => {

                        const isActive = pathName === `/category/${cat.slug}`
                        return (

                            <Link
                                href={`/category/${cat.slug}`}
                                key={cat.id}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-green-100 hover:text-green-700 ${isActive ? "bg-[#05893E]" : ''} `}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameBn}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;