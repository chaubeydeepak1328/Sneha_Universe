import { useAppKitAccount } from "@reown/appkit/react";
import React, { useEffect, useState } from "react";
import { useStore } from "../Store/UserStore";

import universeCoin from "../assets/images/universeCoin.png";

import { RxCopy } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "../pages/Home";
import { formatWithCommas } from "../util/helpers";

const LeftUserPannel = () => {
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData")).userAddress
  );

  const LeftUserPanInfo = useStore((state) => state.LeftUserPanInfo);

  const { isConnected } = useAppKitAccount()

  const [fetchData, setFetchData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) {
        const res = await LeftUserPanInfo(address);
        console.log(
          "*******************Fetched Matrix Earnings:",
          res, res?.earnedDollar
        );

        if (res) {
          setFetchData(res);
        }
      }
    };

    fetchUserData();
  }, [address]);

  const getBalance = useStore((state) => state.getBalance);

  const [Wallbalance, setWallBalance] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getBalance(address);
      setWallBalance(res);
    };

    if (address) fetchBalance();
  }, []);

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
      className="relative
  bg-cyan-300/10               
  border border-green-400        
  text-cyan-400
  px-4
  text-sm
  font-medium
  flex flex-col
  items-center justify-center
  rounded-2xl
  w-full lg:w-[300px]
  p-2
  text-center
  shadow-xl
  shadow-cyan-400/20            
  min-h-[300px]                 
  max-h-[60vh]                
  overflow-y-auto              
  transition-all duration-300
  lg:min-h-[400px]"
    // style={{
    //     background:
    //         "linear-gradient(180deg, rgba(11, 11, 142, 1) 0%, rgba(115, 118, 120, 1) 100%)",
    // }}
    >
      <ToastContainer />
      <div className="flex flex-row justify-between items-center gap-4 p-1 w-full">
        <div className="text-md font-semibold text-blue-500">
          {/* <RiBitCoinLine /> */}
          {/* <img
                        src={universeCoin}
                        alt="universeCoin"
                        className="h-10 w-10"
                    /> */}
          <Link
            to="/user-panel-home"
            className="uppercase text-white cursor-pointer text-xl"
          >
            Dashboard <span className="text-sm text-cyan">{'>>'}</span>
          </Link>
        </div>
        <div className=" text-xl order-2 text-red-400  font-semibold bg-gray-800/50 px-2 py-2 rounded-lg">
          {userId ? "ID :" + userId : "Not Registered"}
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <p className="text-3xl md:text-4xl lg:text-4xl text-pink-500">
          ${formatWithCommas(fetchData?.earnedDollar) || 0}
        </p>
      </div>

      <div
        style={{ background: "linear-gradient(135deg, #00f20, #0575e6)" }}
        className="
    relative
    border 
    w-full
    rounded-xl
    mt-5
    bg-cyan-400/10
    h-10
    flex
    items-center
    justify-center
    lg:w-[260px]
    mx-auto
    overflow-hidden
    backdrop-blur-md
    shadow-white/20
    transition-all
    duration-300
  "
      >
        RAMA &nbsp; :
        <span className=" text-2xl md:text-2xl lg:text-3xl text-green-400">
          {" "}
          &nbsp;{formatWithCommas(fetchData?.grandTotal) || 0}
        </span>
      </div>

      <div className="flex justify-between items-center mt-2 px-2 w-full">
        {/* Left icon - External Link */}
        <a
          target="_blank"
          href={`http://ramascan.com/address/${userAddress}`}
          className="flex justify-start mx-5"
        >
          <FaExternalLinkAlt className="hover:text-blue-700 cursor-pointer text-lg" />
        </a>
        <div className="mt-2 h-10 flex items-center justify-center w-full lg:w-[250px] mx-auto text-xl font-bold">
          {userAddress
            ? userAddress.slice(0, 7) + "..." + userAddress.slice(-7)
            : "0x"}
        </div>
        {/* Right icon - Copy */}
        <div className="flex justify-end mx-5">
          <RxCopy
            onClick={() => handleCopy(userAddress)}
            className="text-xl hover:text-blue-700 cursor-pointer"
          />
        </div>
      </div>
      <div
        className=" relative
    border 
    w-full
    rounded-xl
    mt-5
    bg-cyan-400/10
    h-10
    flex
    items-center
    justify-center
    lg:w-[260px]
    mx-auto
    overflow-hidden
    backdrop-blur-md
    shadow-white/20
    transition-all
    duration-300"
      >
        Ramestta wallet &nbsp;


        <span className="text-green-400 text-xl">{isConnected ? formatWithCommas(Wallbalance) : 0}</span>
      </div>
      <Link
        to="https://ramestta.com"
        target="_blank"
        className=" h-10 flex text-green-400 text-md font-semibold items-center justify-center w-full lg:w-[250px] mx-auto hover:to-blue-700 "
      >
        https://ramestta.com
      </Link>
      <div
        className=" relative
    border 
    w-full
    rounded-xl
    mt-2
    bg-cyan-400/10
    h-10
    flex
    items-center
    justify-center
    lg:w-[260px]
    mx-auto
    overflow-hidden
    backdrop-blur-md
    shadow-white/20
    transition-all
    duration-300"
      >
        Sponser Address
      </div>

      <div className="flex items-center justify-between w-full mt-2 px-2">
        {/* Left-aligned icon - fixed spacing */}

        <a
          target="_blank"
          href={`http://ramascan.com/address/${data?.sponserAdd}`}
        >
          <FaExternalLinkAlt className="text-xl text-cyan-400  cursor-pointer mr-2 sm:mr-4" />
        </a>

        {/* Center text - responsive truncation */}
        <div className="flex-1 min-w-0 text-center px-2">
          <p className="text-sm sm:text-base font-medium truncate">
            {data?.sponserAdd
              ? `${data.sponserAdd.slice(0, 7)}...${data.sponserAdd.slice(-7)}`
              : "Not Available"}
          </p>
          {data?.sponserId && (
            <p className="text-xs sm:text-sm text-cyan-400">
              ID: {data.sponserId}
            </p>
          )}
        </div>

        {/* Right-aligned icon - fixed spacing */}
        <RxCopy
          onClick={() => handleCopy(data?.sponserAdd)}
          className="text-xl text-cyan-400  cursor-pointer ml-2 sm:ml-4"
        />
      </div>
    </div>
  );
};

export default LeftUserPannel;
