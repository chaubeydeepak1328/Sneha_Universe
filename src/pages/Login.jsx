import React, { useEffect, useState } from "react";
import universeLogo from "../assets/images/Universe_dahboard_Loogo.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

import { useAppKit } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTelegram } from "react-icons/fa"; // Font Awesome Telegram icon

import { useAppKitAccount } from "@reown/appkit/react";

import { useStore } from "../Store/UserStore";
import { Spinner } from "../util/helpers";

export default function Login() {
  const getAllusers = useStore((state) => state.getAllusers);
  const IsUserExist = useStore((state) => state.IsUserExist);

  const [authLoading, setAuthLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const { open } = useAppKit(); // This triggers wallet connection
  const { address, isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState("");

  const [walletPrompted, setWalletPrompted] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const localAddress = JSON.parse(
      localStorage.getItem("userData")
    )?.userAddress;

    console.log("step1 ==========", localAddress);

    if (address && isConnected && localAddress) {
      setAuthLoading(false);
      navigate("/user-panel-home");
    } else if (address && isConnected && localAddress == "undefined") {
      if (walletPrompted && isConnected && address) {
        try {
          const user = await IsUserExist(address);
          console.log("this is User=========>", user?.userId?.toString(), user);

          const safeUser = {
            ...user,
            regTime: user.regTime?.toString(), // convert BigInt to string
          };

          localStorage.setItem(
            "userData",
            JSON.stringify({
              userId: safeUser?.userId || null,
              userAddress: safeUser?.walletAdd,
              data: safeUser,
            })
          );

          // Storing to the local storage end
          setAuthLoading(false);
          navigate("/user-panel-home", {
            state: {
              userId: user?.userId?.toString() || null,
              userAddress: user?.walletAdd,
              data: user || null,
            },
          });
        } catch (err) {
          setAuthLoading(false);
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        } finally {
          setAuthLoading(false);
          setWalletPrompted(false); // Reset to prevent re-trigger
        }
      }
    } else {
      try {
        await open(); // Trigger wallet connection
        setWalletPrompted(true);
      } catch (err) {
        console.error("Wallet connect error:", err);
        setAuthLoading(false);
        return;
      }
    }
  };

  useEffect(() => {
    const checkUserAfterConnect = async () => {
      if (walletPrompted && isConnected && address) {
        try {
          const user = await IsUserExist(address);
          console.log("this is User=========>", user?.userId?.toString(), user);

          const safeUser = {
            ...user,
            regTime: user.regTime?.toString(), // convert BigInt to string
          };

          localStorage.setItem(
            "userData",
            JSON.stringify({
              userId: safeUser?.userId || null,
              userAddress: safeUser?.walletAdd,
              data: safeUser,
            })
          );

          // Storing to the local storage end
          setAuthLoading(false);
          navigate("/user-panel-home", {
            state: {
              userId: user?.userId?.toString() || null,
              userAddress: user?.walletAdd,
              data: user || null,
            },
          });
        } catch (err) {
          setAuthLoading(false);
          console.error("Error checking user:", err);
          toast.error("Failed to verify user.");
        } finally {
          setAuthLoading(false);
          setWalletPrompted(false); // Reset to prevent re-trigger
        }
      }
    };

    checkUserAfterConnect();
  }, [walletPrompted, isConnected, address]);

  const handleUserIdClick = async (e) => {
    e.preventDefault(); // Prevent navigation
    setViewLoading(true);

    if (inputData) {
      // Perform any action with the input data, like navigating to a user panel
      console.log("User ID entered:", inputData);

      try {
        const UserInfo = await getAllusers(parseInt(inputData) - 1);
        console.log("UserInfo:", UserInfo); // Log the fetched users to the console

        if (
          UserInfo &&
          UserInfo.userAddress &&
          UserInfo.userAddress.toString()
        ) {
          // Convert all relevant data fields to strings if they are BigInt
          const dataToStore = {
            userId: UserInfo.userId || inputData,
            userAddress: UserInfo.userAddress.toString(), // Ensure userAddress is a string
            data: {
              ...UserInfo,
              userAddress: UserInfo.userAddress.toString(), // Convert if any BigInt in UserInfo
              sponserAdd: UserInfo.sponserAdd.toString(),
              regTime: UserInfo.regTime.toString(),
              directReferral: UserInfo.directReferral.toString(),
            },
          };

          // Store user data in localStorage
          localStorage.setItem("userData", JSON.stringify(dataToStore));

          // Navigate to user panel home page
          navigate("/user-panel-home");
        } else {
          setViewLoading(false);
          toast("Please enter a valid user ID.");
        }
      } catch (error) {
        console.error("Error:", error);
        setViewLoading(false);
        toast("An error occurred while fetching user data.");
      }
    } else {
      setViewLoading(false);
      toast("Please enter a valid user ID.");
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
      {/* Twinkling Stars Background - Improved */}
      <div className="stars-container absolute inset-0 overflow-hidden z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3, // More visible stars
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10  w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8">
        <ToastContainer />
        <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div
            className="min-h-screen "
            style={{
              background: "linear-gradient(180deg, #000000,rgb(13, 35, 13))",
            }}
          >
            <ToastContainer />

            <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
              <div
                className="flex flex-col justify-start border-2 border-cyan-400
  bg-cyan-300/10  rounded-xl backdrop-blur-[8px]
  backdrop-brightness-110
  transition-all
  duration-300
  hover:shadow-cyan-400/30
  shadow-xl shadow-cyan-400/20
  text-white items-center rounded-xl w-full max-w-xl p-6 sm:p-10  shadow-lg"
              >
                {/* Logo */}
                <Link to="/">
                  <img
                    src={universeLogo}
                    alt="Logo"
                    className="h-20 sm:h-36 object-contain"
                  />
                </Link>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl font-bold mt-6 text-white text-center">
                  Explore the Universe
                </h1>
                <p className="text-center text-lg sm:text-xl mt-2 text-white">
                  Ramestta Newtork
                </p>

                {/* Authorization Button */}
                <button
                  // to="/d-matrix"
                  onClick={handleClick}
                  className="w-full border 
    w-full
    rounded-xl
    mt-5
    bg-cyan-400/10
    h-10
    flex
    border-cyan-400
    items-center
    justify-center
    mx-auto
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer max-w-xs mt-6 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110 cursor-pointer"
                // style={{
                //   background:
                //     "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
                // }}
                >
                  {authLoading ? (
                    <Spinner loading={authLoading} />
                  ) : (
                    "Authorization"
                  )}
                </button>

                {/* ID Input Section */}
                <div className="mt-6 text-center text-white">
                  <h2 className="text-xl sm:text-2xl">
                    To View, enter the account ID
                  </h2>
                  <input
                    type="text"
                    className="mt-4 w-full max-w-xs px-4 py-2 rounded-md text-center border 
    w-full
    mt-5
    bg-cyan-400/10
    h-10
    flex
    border-cyan-400
    items-center
    justify-center
    mx-auto
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  text-white font-semibold py-2  shadow hover:shadow-lg transition duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Enter user ID"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                </div>

                {/* Viewing Button */}
                <button
                  // to="/user-panel-home"
                  onClick={handleUserIdClick}
                  className="w-full border 
    w-full
    rounded-xl
    mt-5
    bg-cyan-400/10
    h-10
    flex
    border-cyan-400
    items-center
    justify-center
    mx-auto
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer max-w-xs mt-8 rounded-xl text-lg sm:text-xl font-semibold text-black py-3 text-center transition hover:brightness-110 cursor-pointer"
                // style={{
                //   background:
                //     "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
                // }}
                >
                  {viewLoading ? <Spinner loading={viewLoading} /> : "Viewing"}
                </button>

                {/* Join Info */}
                <div className="mt-10 text-center text-white">
                  <p className="text-sm sm:text-lg">
                    Join if you are not yet with us:
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm sm:text-lg cursor-pointer hover:underline">
                    <LuUserRound className="text-xl sm:text-2xl" />
                    <a
                      href="https://ramascan.com/"
                      target="_blank"
                      className="flex justify-center items-center gap-2"
                    >
                      Check in RamaScan
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-white text-sm sm:text-base">
                <a
                  href="https://t.me/ramauniverse"
                  target="_blank"
                  className="flex justify-center items-center gap-2"
                >
                  <div>{/* <FaTelegram className="text-blue-500" /> */}</div>
                  <div className="flex">
                    Telegram channel : Universe &nbsp;
                    <FaTelegram className="text-blue-500 text-2xl" />{" "}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Animation - Add to your globals.css */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
      `}</style>
    </div>
  );
}
