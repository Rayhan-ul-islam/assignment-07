import Image from "next/image";

const NavBar = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="px-4">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
                {/* Logo and Title */}
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

                {/* Authentication Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button className="btn btn-sm sm:btn-md">
                        সাইন ইন
                    </button>

                    <button className="btn btn-success btn-sm sm:btn-md">
                        সাইন আপ
                    </button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;