

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import uni4 from '../assets/images/uni4.jpg'

const carouselData = [
  {
    title: "Universe Earnings",
    data: [
      { title: "Income in USD", value: "$320,891.248" },
      { title: "Income in RAMA", value: "503.5800 RAMA" },
      { title: "UniverseE3 Plus", value: "19.4650 RAMA" },
      { title: "UniverseE5", value: "89.8950 RAMA" },
      { title: "UniverseE5 Plus", value: "77.0000 RAMA" },
      { title: "UniverseEG4", value: "7.2000 RAMA" },
      { title: "UniverseE3 Premium", value: "310.0000 RAMA" },
    ],
  },
  {
    title: "Blockchain Stats",
    data: [
      { title: "Total Transactions", value: "2,456,789" },
      { title: "Active Users", value: "187,432" },
      { title: "New Accounts Today", value: "4,589" },
      { title: "Network Fees Collected", value: "12,300 RAMA" },
      { title: "Validators Online", value: "1,024" },
      { title: "Smart Contracts Deployed", value: "56,345" },
      { title: "Average Transaction Speed", value: "3.2s" },
    ],
  },
  {
    title: "Crypto Market Overview",
    data: [
      { title: "Bitcoin (BTC)", value: "$67,450" },
      { title: "Ethereum (ETH)", value: "$3,250" },
      { title: "RAMA Token", value: "$45.78" },
      { title: "24h Trading Volume", value: "$1.4B" },
      { title: "Market Cap", value: "$450B" },
      { title: "Top Gainer", value: "SOL +8.9%" },
      { title: "Top Loser", value: "DOGE -4.3%" },
    ],
  },
];

const EvergreenCarousel = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center py-20 px-5 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${uni4})` }}
    >
      {/* Main Heading */}
      <h2 className="text-6xl font-bold text-center mb-10">Universe Insights</h2>
      <div className="max-w-4xl text-lg leading-relaxed  text-center">
        <p className="mb-10">
        The Universe Insights platform provides real-time data and analytics on blockchain transactions, cryptocurrency earnings, and decentralized finance (DeFi) trends. Whether you are a trader, investor, or blockchain enthusiast, our insights help you stay ahead in the rapidly evolving crypto space.

With accurate financial metrics, market trends, and transaction statistics, Universe Insights empowers users with the knowledge they need to make informed decisions. From earnings breakdowns to live network updates, experience a new level of transparency in the digital economy.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full max-w-5xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="px-4"
        >
          {carouselData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="p-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg shadow-lg text-center">
                <h3 className="text-3xl font-bold mb-6 text-yellow-400">{item.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.data.map((dataItem, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-white/10 p-4 rounded-lg border border-white/20"
                    >
                      <span className="text-lg font-semibold">{dataItem.title}</span>
                      <span className="text-lg font-bold text-yellow-400">{dataItem.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EvergreenCarousel;

