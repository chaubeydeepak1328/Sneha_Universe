import React, { useEffect, useState } from "react";
import { FaCheckToSlot } from "react-icons/fa6";
import { GiSplitArrows } from "react-icons/gi";
import { MdOutlineContactMail } from "react-icons/md";
import { PiUsersFourBold } from "react-icons/pi";
import { RxCopy } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../Store/UserStore";
import { ToastContainer, toast } from "react-toastify";

const DashboardInfo = () => {
  const homePannelInfo = useStore((state) => state.homePannelInfo);

  const navigate = useNavigate();

  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData")).userAddress
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userData")).userId
  );
  const [ActivatedSlot, setActivatedSlot] = useState();
  const [InvitedPartners, setInvitedPartners] = useState();

  useEffect(() => {
    // console.log("=========================================================");
    const DahPannelInfo = async () => {
      const data = await homePannelInfo(address);

      // console.log(
      //   "=========================================================",
      //   data
      // );
      if (data) {
        setActivatedSlot(data.slotActivated);
        setInvitedPartners(data.InvitedPartner);
      } else {
        setActivatedSlot("N/A");
        setInvitedPartners("N/A");
      }
    };

    if (address) DahPannelInfo();
  }, [address]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <Link
        className="  w-full
    rounded-xl
    bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[330px] p-10 py-4 text-center backdrop-blur-md shadow-xl "
        to="/user-panel-home/upline-bonus"
      // className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl  text-black p-4"
      // style={{
      //     background:
      //         "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
      // }}
      >


        <div className="flex justify-center items-center gap-6 ">
          <div>
            {" "}
            <PiUsersFourBold className="text-5xl text-white" />
          </div>
          <div className="">
            <div className="text-lg md:text-xl font-bold">
              Partners Invited :
              <span className="text-green-400">{InvitedPartners}</span>
            </div>
          </div>
        </div>
      </Link>
      <Link
        to="/user-panel-home/split-bonus"
        className=" rounded-xl
    bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[330px] p-10 py-4 text-center backdrop-blur-md shadow-xl "
      // to="/user-panel-home/upline-bonus"
      // className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl  text-black p-4"
      // style={{
      //     background:
      //         "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
      // }}
      >
        <div className="flex justify-center items-center gap-6">
          <div>
            <GiSplitArrows className="text-5xl text-white" />
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold">Split Bonus</span>
            <br />
          </div>
        </div>
      </Link>
      <button
        onClick={() => {
          if (ActivatedSlot < 10) {
            navigate("/user-panel-home/slot-activate", {
              state: { ActivateSlot: Number(ActivatedSlot + 1) }
            });
          }
        }}
        className=" bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[330px] p-10 py-4 text-center backdrop-blur-md shadow-xl "

      // to="/user-panel-home/slot-activate" ActivatedSlot
      // className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-blue-500 text-black p-4 cursor-pointer"
      // style={{
      //     background:
      //         "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
      // }}
      >
        <div
          className="flex justify-center items-center gap-6"
          style={{ cursor: "pointer" }}
        >
          <div>
            <FaCheckToSlot className="text-5xl text-white" />
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold">
              Slot Activated :{" "}
              <span className="text-green-400">{ActivatedSlot}</span>
            </span>
            <br />
          </div>
        </div>
      </button>
      <div
        className=" bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300 border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[330px] p-10 py-4 text-center backdrop-blur-md shadow-xl "
        to="/user-panel-home/upline-bonus"
      // className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-blue-500 text-black p-4 cursor-pointer"
      // style={{
      //     background:
      //         "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
      // }}
      >
        <div className="flex justify-center items-center gap-6">
          <div>
            <MdOutlineContactMail className="text-5xl text-white" />
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold">
              Affiliated Link
            </span>
            <br />
            <span>Click to Copy</span>
          </div>
          <div className="cursor-pointer">
            <RxCopy
              onClick={() =>
                handleCopy(`${window.location.origin}/referral/${userId}`)
              }
              className="text-3xl text-green-400 hover:text-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
