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
            <div className="relative z-10 min-h-screen  text-white">
                <ToastContainer />
                <div className="max-w-4xl mx-auto px-4 py-10">
                    <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

                    <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 mb-8 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">User Income Plan</p>
                                <p className="text-sm text-white text-lg">0x742d35Cc...4438f44e</p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">User Management</p>
                                <p className="text-white font-medium text-lg">1.5 RAM</p>
                            </div>
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">U3+</p>
                                <p className="text-white font-medium text-lg">Ramestta Mainnet</p>
                            </div>
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">U5</p>
                                <p className="text-white font-medium text-lg">Online</p>
                            </div>
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">U4</p>
                                <p className="text-white font-medium text-lg">Online</p>
                            </div>
                            <div>
                                <p className=" font-semibold text-xl text-cyan-400">U3 Primium</p>
                                <p className="text-white font-medium text-lg">Online</p>
                            </div>
                            <div>


                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1c1c1e] border border-[#2dd4bf] rounded-lg p-6 shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="displayName">
                                Display Name
                            </label>
                            <input
                                id="displayName"
                                type="text"
                                placeholder="Enter your display name"
                                className="w-full px-3 py-2 bg-[#2a2a2e] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-gray-400 text-xs mt-1">
                                This is how you'll appear to others in the chat.
                            </p>
                        </div>



                        <div className="flex justify-end">
                            <button className="px-4 py-2 text-sm font-medium text-black bg-teal-400 hover:bg-teal-500 rounded-md" style={{ cursor: 'pointer' }} >
                                Save Profile
                            </button>
                        </div>
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
};

export default Profile;
