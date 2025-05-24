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
      <div className="relative z-10  w-full max-w-[1800px] mx-auto px-3 sm:px-1 md:px-8">
        <ToastContainer />
        <div className="flex flex-col items-center py-10 px-4 sm:px-1 md:px-10 lg:px-16 xl:px-20">
          <div
            className="min-h-screen "
            style={{
              background: "linear-gradient(180deg, #000000,rgb(13, 35, 13))",
            }}
          >
            <ToastContainer />

            <div className="flex flex-col items-center py-10 px-1 sm:px-6 md:px-10 lg:px-13 xl:px-16">
              <div
                className="flex flex-col justify-start border-2 border-cyan-400
  bg-cyan-300/10  rounded-xl backdrop-blur-[8px]
  backdrop-brightness-110
  transition-all
  duration-300
  hover:shadow-cyan-400/30
  shadow-xl shadow-cyan-400/20
  text-white items-center rounded-xl w-full max-w-xl p-4 sm:p-6  shadow-lg"
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
                <h1 className="text-2xl uppercase sm:text-4xl font-bold mt-6 text-white text-center">
                  Explore the Universe
                </h1>
                {/* <p className="text-center text-lg sm:text-xl mt-2 text-white">
                  Ramestta Newtork
                </p> */}

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
    </div>
  );
}
