
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignIn = () => {
    const router = useRouter();

    // Email and Password Login
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল!");
                console.error("Sign in error:", error.message);
                return;
            }

            if (data) {
                toast.success("সফলভাবে Login হয়েছে!");
                router.push("/");
            }
        } catch (error) {
            toast.error("Login করা সম্ভব হয়নি!");
            console.error(error);
        }
    };

    // Google Login
    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google Login ব্যর্থ হয়েছে!");
            console.error(error);
        }
    };

    return (


        <div className="min-h-screen bg-[#f3f6f3] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        সাইন ইন
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        বিস্তারিত দাম দেখতে আপনার অ্যাকাউন্টে সাইন ইন করুন।
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-full text-white"
                    >
                        সাইন ইন
                    </button>

                </form>

                <div className="divider my-6">অথবা</div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full"
                >
                    Google দিয়ে সাইন ইন
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="font-semibold text-green-600 hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default SignIn;
