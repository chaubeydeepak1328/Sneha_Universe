import React, { useEffect, useState } from "react";

import RightUserPannel1 from "../components/RightUserPannel1";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";

export function Profile() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000, rgb(13, 35, 13))",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Dynamic Moving Stars Background */}
      <div className="stars-container fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
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
                className="star  bg-white rounded-full"
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
      <div className="relative z-10 min-h-screen  text-white">
        <ToastContainer />
        <div className="max-w-4xl mx-auto px-1 py-10">
          <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

          <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 mb-8 shadow-xl">
            <h2>Basic Profile</h2>
            <div className="flex justify-between items-center mb-4 mt-4">
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  Connected Address
                </p>
                <p className=" text-white text-md">0x742d35Cc...4438f44e</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  Connected Status
                </p>
                <p className=" text-green-400 text-md">Online</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">User Id</p>
                <p className="text-white  text-md">12334</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">Sponser</p>
                <p className="text-white  text-md">xyz</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  Sponser Id
                </p>
                <p className="text-white font-medium text-md">Onl123</p>
              </div>

              <div></div>
            </div>
          </div>
          <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 mb-8 shadow-xl">
            <h2>Earning Information</h2>
            <div className="flex justify-between items-center mb-4 mt-4">
              <div>
                <p className=" font-semibold text-md text-cyan-400">U3+</p>
                <p className=" text-white text-md">0x742d35Cc...4438f44e</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className=" font-semibold text-md text-cyan-400">U5</p>
                <p className=" text-white text-md">Onhhhh</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">U4</p>
                <p className="text-white  text-md">12334</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  U3 Primium
                </p>
                <p className="text-white  text-md">xyz</p>
              </div>

              <div>
                <div>
                  <p className=" font-semibold text-md text-cyan-400">
                    Grand Total
                  </p>
                  <p className="text-white font-medium text-md">Onl123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 mb-8 shadow-xl">
            <div className="flex justify-between items-center mb-4 mt-4 gap-10">
              <h2>Matrix Information</h2>
              <h3 className="text-green-400">Running</h3>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4">
              <div>
                <p className=" font-semibold text-md text-cyan-400">U5</p>
                <p className=" text-white text-md">12345678</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className=" font-semibold text-md text-cyan-400">U4</p>
                <p className=" text-white text-md">Online</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">U3</p>
                <p className="text-white  text-md">12334</p>
              </div>

              {/* <div>
                <p className=" font-semibold text-md text-cyan-400">
                  Sponser Id
                </p>
                <p className="text-white font-medium text-md">Onl123</p>
              </div> */}

              <div></div>
            </div>
          </div>
          <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 mb-8 shadow-xl">
            <h2>Contract Information</h2>
            <div className="flex justify-between items-center mb-4 mt-4">
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  User Management
                </p>
                <p className=" text-white text-md">0x742d35Cc...4438f44e</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className=" font-semibold text-md text-cyan-400">U3+</p>
                <p className=" text-white text-md">Onhhhh</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">U5</p>
                <p className="text-white  text-md">12334</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">U4</p>
                <p className="text-white  text-md">xyz</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">
                  U3 Primium
                </p>
                <p className="text-white font-medium text-md">Onl123</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">View</p>
                <p className="text-white font-medium text-md">Onl123</p>
              </div>
              <div>
                <p className=" font-semibold text-md text-cyan-400">Registry</p>
                <p className="text-white font-medium text-md">Onl123</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
