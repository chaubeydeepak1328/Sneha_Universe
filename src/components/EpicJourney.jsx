import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import universeLogo from "../assets/images/universeLogo.png";
import Star2 from '../assets/images/Star2.png';



const facts = [
  {
    title: "Blockchain is Unhackable",
    description:
      "Once a transaction is recorded on the blockchain, it cannot be altered, ensuring maximum security.",
    img: universeLogo,
  },
  {
    title: "Bitcoin’s Limited Supply",
    description:
      "There will only ever be **21 million Bitcoins** in existence, making it a **scarce digital asset**.",
    img: universeLogo,
  },
  {
    title: "Smart Contracts Run Themselves",
    description:
      "Smart contracts execute automatically without needing a middleman, ensuring **trustless transactions**.",
    img: universeLogo,
  },
  {
    title: "Crypto Adoption is Booming",
    description:
      "More than **400 million people** worldwide own cryptocurrency, with adoption rates increasing daily.",
    img: universeLogo,
  },
  {
    title: "DeFi is The Future",
    description:
      "Decentralized Finance (DeFi) allows users to lend, borrow, and trade assets without banks.",
    img: universeLogo,
  },
  {
    title: "NFTs and Digital Ownership",
    description:
      "NFTs allow digital assets like art and music to have **unique ownership rights** on the blockchain.",
    img: universeLogo,
  },
];

const EpicJourney = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center py-20 px-5 bg-cover bg-center  text-white"
      style={{ backgroundImage: `url(${Star2})` }}
    >

      {/* Main Heading */}
      <h2 className="text-6xl font-bold text-center mb-6">
        Explore the Future with Us
      </h2>

      {/* Section Content */}
      <div className="max-w-4xl text-lg leading-relaxed  text-center">
        <p>
          The world of cryptocurrency and blockchain is transforming finance,
          security, and digital ownership. With peer-to-peer transactions, smart
          contracts, and Decentralized Finance (DeFi), users gain more control
          over their assets without middlemen. From borderless payments to NFTs
          redefining digital ownership, blockchain is driving a new digital
          economy. With over 400 million crypto users worldwide, adoption is
          growing fast. The future of finance is decentralized—are you ready to
          be part of it?
        </p>
      </div>

      {/* Swiper Carousel for Facts */}
      <div className="w-full max-w-5xl mt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="px-4"
        >
          {facts.map((fact, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center p-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-lg shadow-lg text-center h-[350px] w-[300px] mx-auto">
                <img
                  className="w-20 h-20 mb-4 rounded-full object-cover"
                  src={fact.img}
                  alt="Fact"
                />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {fact.title}
                </h3>
                <p className="text-lg text-gray-200">{fact.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EpicJourney;
