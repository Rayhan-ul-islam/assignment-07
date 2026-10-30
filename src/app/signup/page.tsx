'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const SignUpPage = () => {
const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: formValue.name as string,
            email: formValue.email as string,
            password: formValue.password as string,
            callbackURL: "/",
        });

        if(data){
            router.push('/');
        }
    
    }


    return (
        <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
            {/* Title & Subtitle */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="আবার লিখুন"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 py-3 px-4 bg-[#058a44] hover:bg-[#047238] text-white font-medium rounded-lg shadow transition-colors text-sm"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-3 text-xs text-gray-500 absolute">
                        অথবা
                    </span>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-700"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span>Google দিয়ে চালিয়ে যান</span>
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-700"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                {/* Footer Link Inside Card */}
                <div className="text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{' '}
                    <Link
                        href="/signin"
                        className="text-[#058a44] font-medium hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </div>
            </div>

            {/* Bottom Back to Home Link */}
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

export default SignUpPage;