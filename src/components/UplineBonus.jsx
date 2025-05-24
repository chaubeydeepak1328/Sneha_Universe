import React, { useEffect, useState } from "react";
import { RxClipboardCopy } from "react-icons/rx";

import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";

import { useStore } from "../Store/UserStore";
import { formatWithCommas, handleCopy } from "../util/helpers";
import { ToastContainer } from "react-toastify";

export default function UplineBonus() {
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData")).userAddress
  );

  const partnerTable = useStore((state) => state.partnerTable);

  const [partnerDetails, setPartnerDetails] = useState([]);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      const res = await partnerTable(address);
      if (res) setPartnerDetails(res);
    };

    if (address) fetchPartnerDetails();
  }, [address]);




  return (
    <>

      <div
        className=" px-4"
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
        <ToastContainer />
        <div className="max-w-6xl  h-auto m-auto p-1">
          {/* Top Header */}
          <Header />
          {/* Main Panel */}
          <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
            {/* Left Side Card */}
            <LeftUserPannel />

            {/* Right Part */}
            <div className="">
              <div className="hidden md:block   block sm:hidden">
                <DashboardInfo />
              </div>

              <div
                className="flex flex-col mt-10  border-1 rounded-2xl p-6 text-center  bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[700px] p-10 py-4 text-center backdrop-blur-md shadow-xl "
              // style={{
              //   background:
              //     "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              // }}
              >
                <div className="text-3xl font-bold mb-5 text-start text-cyan-400">
                  Partners
                </div>

                <div className="w-full overflow-x-auto">
                  {" "}
                  {/* Enables horizontal scrolling on small screens */}
                  <table
                    className="w-full text-white border-collapse"
                    style={{ minWidth: "600px" }}
                  >
                    <thead>
                      <tr>
                        <th className="p-2 border">id</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">My Partners</th>
                        {/* <th className="p-2 border">Tx Hash</th> */}
                        <th className="p-2 border">Profit (RAMA / USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr className="border-t">
                      <td className="p-2 border">34</td>
                      <td className="p-2 border">12/02/2024</td>
                      <td className="p-2 border">0xc09...12344</td>
                      <td className="p-2 border">0xc03...38624</td>
                      <td className="p-2 border">0.000 / $0.000</td>
                    </tr> */}

                      {partnerDetails?.length > 0 ? (
                        partnerDetails.map((partner, index) => (
                          <tr key={index} className="border-t border-gray-600">
                            <td className="p-2 border text-center">
                              {partner.id}
                            </td>
                            <td className="p-2 border text-center">
                              {new Date(
                                parseInt(partner.registrationTime) * 1000
                              ).toLocaleDateString()}
                            </td>
                            <td className="p-2 border text-center flex justify-evenly">
                              <a href={`https://ramascan.com/address/${partner.wallet}`} target="_blank" >
                                {" "}
                                {partner.wallet?.slice(0, 6)}...
                                {partner.wallet?.slice(-4)}
                              </a>
                              <RxClipboardCopy
                                onClick={() => handleCopy(partner.wallet)}
                                className="text-xl text-cyan-400  cursor-pointer ml-2 sm:ml-4"
                              />
                            </td>
                            {/* <td className="p-2 border text-center">—</td> */}
                            <td className="p-2 border text-center">
                              {formatWithCommas(partner?.totalProfit)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-4 text-center text-gray-400"
                          >
                            No partner data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  );
}
