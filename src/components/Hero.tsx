import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="w-full bg-[#f4fbf6] py-8 md:py-12">
          
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
               
                <div className="bg-[#f8faf9] border border-gray-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        
                       
                        <div className="w-full lg:w-3/5 space-y-5 text-left">
                         
                            <div className="inline-block">
                                <p className="bg-[#e3f5ea] text-[#1b7a43] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full">
                                    {new Date().toLocaleDateString("bn-BD", {
                                        dateStyle: "full",
                                    })}
                                </p>
                            </div>

                            
                            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1f2937] leading-tight">
                                আজকের বাজারের দাম এক নজরে
                            </h1>

                           
                            <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                            </p>

                            
                            <div className="pt-2">
                                <button className="bg-[#058240] hover:bg-[#046c35] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                                    সব পণ্য দেখুন
                                </button>
                            </div>
                        </div>

                        
                        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                                <Image
                                    src="/bazar-hero.png"
                                    alt="আজকের বাজারদর"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;