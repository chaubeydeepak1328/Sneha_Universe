


import React from "react";
import Bg2 from "../assets/images/Bg2.png";
import U3 from "../assets/images/U3.png";
import E5 from "../assets/images/E5.png";
import E5Plus from "../assets/images/E5Plus.png";
import UG4Final from "../assets/images/UG4Final.png";
import E3PremiumFinal from "../assets/images/E3PremiumFinal.png";
import uni3 from '../assets/images/uni3.jpg'

const CommissionPayout = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center py-20 px-5 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${uni3})` }}
    >
      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-8 text-white">
        COMMISSION PAYOUT SYSTEM
      </h2>
      <h1 className="text-center text-4xl md:text-6xl font-bold">U3 Plus, U5, U5 Plus, UG4, U3 Premium <br />
      PARTNER INCOME EXPLAINED</h1>
      <p className="text-center text-xl my-10">Whenever you want to go on an epic adventure, show your skills online or play togBNBer with family and friends</p>

      {/* ID & Tagline */}
      <p className="text-md md:text-lg px-4 md:px-6 py-2 rounded-lg border border-yellow-400 text-yellow-400 my-6">
        ID: <span className="font-bold text-white">2322</span>
      </p>

      {/* Top Two Images */}
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        <img src={U3} alt="U3 Plus" className="h-[300px] md:h-[650px] w-[200px] md:w-[500px] rounded-md" />
        <img src={E5} alt="E5" className="h-[300px] md:h-[650px] w-[200px] md:w-[500px] rounded-md" />
      </div>

      {/* Animated Payout Section */}
      <div className="flex flex-col justify-center border-2 m-10 md:m-20 p-5 md:p-2 border-t-0 rounded-xl border-dashed">
        <div className="text-center text-lg md:text-2xl mb-5 font-bold">
          Simultaneous entry into platform one on the E3 Plus & E5 Matrix
          <br />
          automatically occurs during program registration.
        </div>
        <div className="flex justify-between px-5 md:px-10">
          <div className="bg-yellow-500 px-4 md:px-5 py-2 rounded-md relative right-20 sm:right-28">0.005 RAMA</div>
          <div className="bg-yellow-500 px-4 md:px-5 py-2 rounded-md relative left-20 sm:left-28">0.005 RAMA</div>
        </div>

        {/* Slower Animated Ping */}
        <div className="flex justify-center items-center text-center mt-10">
          <div className="relative bg-[#004689] py-3 w-[250px] md:w-[300px] rounded-2xl text-lg md:text-2xl font-bold text-white animate-bounce top-10">
            0.01 RAMA To Join
          </div>
        </div>
      </div>

      {/* Bottom Three Images */}
      <div className="flex flex-wrap justify-center gap-5 md:gap-10">
        <img src={E5Plus} alt="E5 Plus" className="h-[300px] md:h-[400px] w-[200px] md:w-[300px] rounded-md" />
        <img src={UG4Final} alt="UG4 Final" className="h-[300px] md:h-[400px] w-[200px] md:w-[300px] rounded-md" />
        <img src={E3PremiumFinal} alt="E3 Premium" className="h-[300px] md:h-[400px] w-[200px] md:w-[300px] rounded-md" />
      </div>
    </div>
  );
};

export default CommissionPayout;
