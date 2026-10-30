'use client';

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: formValue.email as string,
            password: formValue.password as string,
            callbackURL: "/",
        });

        if (error) {
            console.error("Sign in error:", error.message);
            return;
        }

        if (data) {
            router.push("/");
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: '/',
        });

    };

    return (
        <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    সাইন ইন
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="পাসওয়ার্ড লিখুন"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 px-4 bg-[#058a44] hover:bg-[#047238] text-white font-medium rounded-lg shadow transition-colors text-sm"
                    >
                        সাইন ইন
                    </button>
                </form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-3 text-xs text-gray-500 absolute">
                        অথবা
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-700"
                    >
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-700"
                    >
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link
                        href="/signup"
                        className="text-[#058a44] font-medium hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;
