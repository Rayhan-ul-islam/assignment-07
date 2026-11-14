import Image from 'next/image';

const PriceIncrease = () => {

    const items = [
        { name: 'পেঁয়াজ', unit: 'প্রতি কেজি', price: '৫৪', change: '৪২.৫%', image: '/onion.png' },
        { name: 'আদা', unit: 'প্রতি কেজি', price: '৮৫', change: '৯.০%', image: '/ginger.png' },
        { name: 'বেগুন', unit: 'প্রতি কেজি', price: '৪৪', change: '৪.৮%', image: '/ brinjal.png' },
        { name: 'রুই মাছ', unit: 'প্রতি কেজি', price: '৪৬', change: '৪.০%', image: '/fish.png' },
        { name: 'ডিম', unit: 'প্রতি ডজন', price: '১৫৮', change: '৩.৯%', image: '/egg.png' },
        { name: 'মাখন (১০০ গ্রাম)', unit: 'প্রতি পিস', price: '১৪৫', change: '৩.৬%', image: '/butter.png' },
    ];

    return (

        <section className="w-full bg-[#f4fbf6] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* সেকশন হেডিং (লাল রঙের আইকন ও টেক্সট) */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-red-600 text-lg">▲</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                {/* ৬টি কার্ডের গ্রিড (ডেস্কটপে ৩ কলাম, ট্যাবলেটে ২, মোবাইলে ১) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
                        >
                            {/* কার্ডের ওপরের অংশ: আইকন ও নাম */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 bg-white rounded-full p-1.5 shadow-xs flex items-center justify-center border border-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={28}
                                            height={28}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.unit}</p>
                                    </div>
                                </div>
                            </div>

                            {/* কার্ডের নিচের অংশ: আজকের দাম এবং শতকরা পরিবর্তন */}
                            <div className="mt-6 pt-3 border-t border-gray-100 flex items-end justify-between">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
                                    <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                        {item.price} <span className="text-sm font-normal text-gray-600">টাকা</span>
                                    </span>
                                </div>

                                {/* দাম বৃদ্ধির ব্যাজ (লাল কালার) */}
                                <div className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                    <span>▲</span>
                                    <span>{item.change}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>

    );
};

export default PriceIncrease;