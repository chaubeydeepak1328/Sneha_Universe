import React, { useEffect, useState } from "react";

import universeCoin from "../assets/images/universeCoin.png";
import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";

import RightUserPannel from "../components/RightUserPannel";
import RightUserPannel1 from "../components/RightUserPannel1";
import { useDisconnect } from "@reown/appkit/react";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import LeftUserPannel from "../components/LeftUserPannel";

export default function UserPanel() {
  const [userId, setUserId] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.userId);
      setUserAddress(parsedUser.userAddress);
      setData(parsedUser.data);
    }
  }, []);

  console.log("User ID:", userId, userAddress, data);

  const [RamaValueUsd, setRamaValueUsd] = useState("345");

  const handleCopy = (address) => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000, rgb(13, 35, 13))",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Twinkling Stars Background */}
      <div className="stars-container absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ToastContainer />
        <div className="max-w-6xl mx-auto p-4">
          <Header />
          <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
            <LeftUserPannel />
            {userId ? <RightUserPannel /> : <RightUserPannel1 />}
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
        .star {
          will-change: opacity;
        }
      `}</style>
    </div>
  );
}
