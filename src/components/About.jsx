import React from "react";
import BlockchainImg from '../assets/images/BlockchainImg.png'
import Star from '../assets/images/Star.png';

const About = () => {
  return (
    <section className="w-full bg-black dark:bg-gray-900 py-16 px-5"
      style={{ backgroundImage: `url(${""})` }}
    >

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={BlockchainImg}
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
        
          <p className="mt-4 text-lg text-white dark:text-gray-300">
          Welcome to UNIVERSE, your gateway to the future of decentralized finance. In a world driven by digital transformation, blockchain technology is reshaping industries by offering secure, transparent, and efficient solutions. Whether you're a seasoned investor, a trader, or a newcomer to the crypto space, our platform provides everything you need—from secure transactions and real-time trading to blockchain-based applications and smart contracts.
          </p>
          <p className="mt-4 text-lg text-white dark:text-gray-300">
          With cutting-edge security protocols and a user-friendly interface, we ensure a seamless experience for buying, selling, and managing digital assets. Join us and be part of the revolution that is redefining finance, ownership, and trust in the digital age.
          </p>
          {/* <a
            href="/contact"
            className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default About;
