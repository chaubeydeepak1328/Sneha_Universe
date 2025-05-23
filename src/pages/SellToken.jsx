import React from "react";
import universeHeroBg from "../assets/images/universeHeroBg.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function SellToken() {
  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="flex flex-col justify-start items-center border-2 border-blue-500 rounded-lg h-auto sm:h-[85vh] max-w-xl w-full m-auto py-10 px-5 sm:px-10">
        <Link to="/">
          <img
            src={universeHeroBg}
            alt="Logo"
            className="h-[120px] sm:h-[150px] object-contain"
          />
        </Link>
        <div className="text-2xl sm:text-4xl font-bold mt-5 text-blue-500 text-center">
          The Entrance to the Office
        </div>

        <div className="text-center text-lg sm:text-xl mt-2">Rama Wallet</div>
        <div className="text-center text-xl sm:text-lg mt-10 mb-2">
          Enter No EVR toke to sell
        </div>
        <div>
          <input
            className="border-2 border-blue-500 outline-none focus:outline-blue-500 p-2 rounded-sm w-[300px] text-center"
            placeholder="10"
          />
        </div>

        <div className="flex justify-center items-center bg-blue-500 text-lg sm:text-xl font-semibold text-black w-full max-w-xs h-12 rounded-xl text-center mt-20 py-2 cursor-pointer hover:bg-blue-600 transition">
          <div>Sell Token get USDT</div>
        </div>

        <div className="mt-10 sm:mt-5 flex items-center gap-3 sm:gap-2 mb-2 text-center">
          <LuUserRound className="text-xl sm:text-2xl" />
          <span className="text-sm sm:text-lg">
            Join if you are not yet with us:
          </span>
        </div>

        <div className="text-blue-500 text-sm sm:text-lg cursor-pointer hover:underline">
          Check in Ramestta Smart Chain
        </div>
      </div>
      <div className="text-center mt-5 text-sm sm:text-base">
        Telegram channel: @evergreenworld2022
      </div>
    </div>
  );
}
