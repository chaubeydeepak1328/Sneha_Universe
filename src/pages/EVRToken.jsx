import React from "react";
import universeHeroBg from '../assets/images/universeHeroBg.png';
import { Link } from "react-router-dom";

export default function EVRToken() {
  return (
    <div>
      <div
        className="flex flex-col items-center justify-start relative w-full min-h-[100svh] bg-no-repeat bg-center bg-cover px-4 sm:px-6 md:px-10 lg:px-16"
        style={{ background: "linear-gradient(to right, #434343 0%, black 100%)" }}
      >
        {/* Logo */}
        <Link to='/'>
          <img
            src={universeHeroBg}
            alt="logo"
            className="h-24 sm:h-32 md:h-40 mt-8 sm:mt-14 object-contain"
          />
        </Link>

        {/* Main Heading */}
        <h1 className="text-center font-extrabold text-white mt-6 px-2 leading-tight break-words max-w-[95%] sm:max-w-3xl">
          <span className="text-[clamp(1.75rem,5vw,5rem)]">WORLD'S BEST</span>
        </h1>

        {/* Subheading */}
        <p className="text-white text-center mt-2 text-[clamp(1rem,2.5vw,2rem)] max-w-[90%] sm:max-w-2xl">
          100% DECENTRALIZED
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 w-full max-w-4xl px-2">
          <Link
            to="/buy-token"
            className="px-6 py-3 text-white text-sm sm:text-lg font-semibold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg shadow-lg hover:scale-105 transition duration-300"
          >
            Buy Token
          </Link>

          <Link
            to="#"
            className="px-6 py-3 text-white text-sm sm:text-lg font-semibold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-lg hover:scale-105 transition duration-300"
          >
            White Paper
          </Link>

          <Link
            to="/sell-token"
            className="px-6 py-3 text-white text-sm sm:text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg shadow-lg hover:scale-105 transition duration-300"
          >
            Sell Token
          </Link>
        </div>

        {/* Bottom Tagline */}
        <div className="absolute bottom-10 sm:bottom-16 text-center w-full px-4">
          <div className="font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg text-[clamp(1rem,2vw,2rem)] hover:scale-105 transition duration-300">
            dApp on Ramestta Blockchain
          </div>
        </div>
      </div>
    </div>
  );
}
