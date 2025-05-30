import React, { useEffect, useState } from 'react';
import universeLogo from "../assets/images/Universe_dahboard_Loogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { FaTelegram } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { formatWithCommas, removeAddress } from '../util/helpers';
import { useStore } from '../Store/UserStore';
import { GiNetworkBars } from 'react-icons/gi';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { disconnect } = useDisconnect(); // ✅ Move hook inside component
  const ramaPriceInUsD = useStore((state) => state.ramaPriceInUsD);
  const [ramaInUSD, setRamaInUSD] = useState();
  const navigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();

  const handleDisconnect = async () => {
    try {
      await disconnect();
      removeAddress();
      navigate('/user-login');
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  useEffect(() => {
    const fetchRamaPrice = async () => {
      const res = await ramaPriceInUsD();
      setRamaInUSD(res);
    };
    fetchRamaPrice();
  }, [ramaPriceInUsD]);

  return (
    <header className="w-full px-4 md:px-10 py-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Logo */}
      <Link to="/user-panel-home" className='cursor-pointer'>
        <img src={universeLogo} alt="Logo" className="h-25 md:h-20" />
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-6 text-white text-sm md:text-base">
        <a
          href="/profile"

          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200 flex items-center gap-2"
        >
          <FaUserCircle className="text-cyan-400 text-3xl" />
        </a>
        {/* RAMA Price */}
        <div className="border border-cyan-400 text-cyan-300 rounded-full px-4 py-1 bg-black/20 backdrop-blur-md shadow-inner text-xs sm:text-sm">
          <span className="font-medium">1 RAMA = ${formatWithCommas((Number(ramaInUSD) || 0) / 1e6)}</span>
        </div>


        {/* Telegram */}
        <a
          href="https://t.me/ramauniverse"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200 flex items-center gap-2"
        >
          <FaTelegram className="text-cyan-400 text-lg" />
        </a>

        {/* Logout */}
        <button
          onClick={handleDisconnect}
          className="flex items-center gap-2 hover:text-red-500 duration-200 hover:scale-110 transition-transform cursor-pointer"
        >
          <RiLogoutCircleRLine className="text-red-400 text-lg" />
        </button>



        <GiNetworkBars color={isConnected ? "green" : "red"} />





      </div>
    </header>
  );
};

export default Header;
