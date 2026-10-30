"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const pathName = usePathname();
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    // Logout
    const handleLogout = async () => {
        await authClient.signOut();
        setDropdownOpen(false);
        router.push("/signin");
        router.refresh();
    };

    useEffect(() => {
        setDate(
            new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            })
        );
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
            .then((res) => res.json())
            .then((data: Category[]) => {
                setCategory(data);
            });
    }, []);

    return (
        <div>
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Logo */}
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

                    {/* Authentication */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {user ? (
                            <div className="relative">

                                {/* User Dropdown Button */}
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <span className="max-w-24 truncate text-sm font-medium">
                                        {user.name}
                                    </span>

                                    <span className="text-gray-500">
                                        ▼
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">

                                        {/* User Info */}
                                        <div className="border-b border-gray-100 px-4 py-3">
                                            <p className="truncate text-sm font-medium text-gray-800">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs font-light text-gray-500">
                                                {user.email}
                                            </p>
                                        </div>

                                        {/* Profile */}
                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm font-normal text-gray-600 hover:bg-green-50 hover:text-green-700"
                                        >
                                            আমার প্রোফাইল
                                        </Link>

                                        {/* Logout */}
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm font-normal text-red-500 hover:bg-red-50"
                                        >
                                            Logout
                                        </button>

                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <button className="btn btn-sm sm:btn-md">
                                        সাইন ইন
                                    </button>
                                </Link>

                                <Link href="/signup">
                                    <button className="btn btn-success btn-sm sm:btn-md">
                                        সাইন আপ
                                    </button>
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            </header>

            {/* Category Navigation */}
            <nav className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 py-2">
                    {category.map((cat) => {
                        const isActive = pathName === `/category/${cat.slug}`;

                        return (
                            <Link
                                href={`/category/${cat.slug}`}
                                key={cat.id}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-green-100 hover:text-green-700 ${isActive
                                    ? "bg-[#05893E] text-white"
                                    : ""
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameBn}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
