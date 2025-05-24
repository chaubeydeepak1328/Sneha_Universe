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
      {/* Dynamic Moving Stars Background */}
      <div className="stars-container absolute inset-0 overflow-hidden z-0">
        {[...Array(350)].map((_, i) => {
          // Random properties for each star
          const size = Math.random() * 3;
          const duration = 10 + Math.random() * 40; // Longer duration for smoother movement
          const delay = Math.random() * 10;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;

          // Generate random path (4-6 points)
          const points = [];
          const pointCount = 4 + Math.floor(Math.random() * 3);

          for (let p = 0; p < pointCount; p++) {
            points.push({
              x: startX + (Math.random() * 30 - 15),
              y: startY + (Math.random() * 30 - 15),
              time: (p / (pointCount - 1)) * 100,
            });
          }

          // Create keyframe CSS
          const keyframes = points
            .map(
              (point, index) =>
                `${point.time}% { transform: translate(${point.x}vw, ${point.y}vh); }`
            )
            .join(" ");

          return (
            <>
              <div
                key={i}
                className="star absolute bg-white rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${startX}vw`,
                  top: `${startY}vh`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `
                twinkle-${i} ${3 + Math.random() * 4}s ease-in-out infinite,
                move-${i} ${duration}s linear infinite ${delay}s
              `,
                  filter: `blur(${Math.random()}px)`,
                }}
              />
              <style jsx global>{`
                @keyframes twinkle-${i} {
                  0%,
                  100% {
                    opacity: ${Math.random() * 0.3 + 0.1};
                  }
                  50% {
                    opacity: ${Math.random() * 0.7 + 0.5};
                  }
                }
                @keyframes move-${i} {
                  ${keyframes}
                }
              `}</style>
            </>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ToastContainer />
        <div className="max-w-6xl mx-auto p-2">
          <Header />
          <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
            <LeftUserPannel />
            {userId ? <RightUserPannel /> : <RightUserPannel1 />}
          </div>
        </div>
      </div>
    </div>
  );
}
