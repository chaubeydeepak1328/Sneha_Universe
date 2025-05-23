
import React from "react";
import universeLogo from "../assets/images/universeLogo.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BuyToken() {
  return (
    <div className="flex flex-col items-center pt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full bg-gradient-to-b from-black to-green-800 min-h-screen">
      <div className="flex flex-col justify-start items-center rounded-lg h-auto sm:min-h-[85vh] max-w-xl w-full m-auto py-10 px-5 sm:px-10 bg-gradient-to-b from-[#eceefa] via-[#096f72e8] to-[#096f72e8] shadow-lg">

        {/* Logo */}
        <Link to="/">
          <img
            src={universeLogo}
            alt="Logo"
            className="h-24 sm:h-36 object-contain"
          />
        </Link>

        {/* Heading */}
        <div className="text-center font-bold mt-5 text-white text-[clamp(1.5rem,3vw,2.5rem)] break-words">
          The Entrance to the Office
        </div>

        {/* Subheadings */}
        <div className="text-center text-[clamp(1rem,2vw,1.25rem)] mt-2 text-white">
          Rama Wallet
        </div>
        <div className="text-center text-[clamp(1rem,1.5vw,1.1rem)] mt-2 text-white">
          EVR token Rate: <span className="font-semibold">$5</span>
        </div>

        {/* Input for EVR */}
        <input
          className="border-2 text-black border-blue-500 outline-none focus:outline-blue-500 p-2 rounded-md w-full max-w-[300px] text-center mt-4 bg-white placeholder:text-gray-500"
          placeholder="Enter number of EVR to buy"
        />

        {/* USDT Rate */}
        <div className="text-center text-[clamp(1rem,1.5vw,1.1rem)] mt-6 text-white">
          USDT Token (BEP20) Rate: <span className="font-semibold">$1</span>
        </div>

        {/* Input for USDT */}
        <input
          className="border-2 text-black border-blue-500 outline-none focus:outline-blue-500 p-2 rounded-md w-full max-w-[300px] text-center mt-2 bg-white placeholder:text-gray-500"
          placeholder="0"
        />

        {/* Disclaimer */}
        <div className="text-center text-sm mt-3 px-4 sm:px-10 text-gray-200 break-words">
          The displayed rate is for calculation purposes only. Actual rate may vary slightly.
        </div>

        {/* Buy Button */}
        <div
          className="flex justify-center items-center text-black font-semibold w-full max-w-xs h-12 rounded-xl text-center my-6 py-2 cursor-pointer hover:bg-blue-600 transition"
          style={{
            background:
              "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
          }}
        >
          Buy Token Using USDT
        </div>

        {/* Join Info */}
        <div className="mt-8 flex items-center gap-2 text-center text-white">
          <span className="text-sm sm:text-lg">
            Join if you are not yet with us:
          </span>
        </div>

        {/* Check Link */}
        <div className="text-white text-sm sm:text-lg cursor-pointer hover:underline mt-1 flex items-center gap-2 text-center">
          <LuUserRound className="text-xl sm:text-2xl" />
          Check in Ramestta Smart Chain
        </div>
      </div>

      {/* Telegram Link */}
      <div className="text-center mt-5 text-[clamp(0.8rem,1.5vw,1rem)] text-white px-4 break-words">
        Telegram channel: @evergreenworld2022
      </div>
    </div>
  );
}
