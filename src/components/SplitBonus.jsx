import React, { useEffect, useState } from "react";
import LeftUserPannel from "./LeftUserPannel";
import Header from "./Header";
import DashboardInfo from "./DashboardInfo";
import { useStore } from "../Store/UserStore";

export default function UplineBonus() {
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData") || "{}")?.userAddress
  );
  const [splitData, setSplitData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);

  const getSplitBonus = useStore((state) => state.getSplitBonus);

  useEffect(() => {
    const fetchSplit = async () => {
      const data = await getSplitBonus(address);
      console.log("&&&&&&&&&&&&&&&&&&&", data);
      setSplitData(data);
    };
    if (address) fetchSplit();
  }, [address]);

  const handleSlotChange = (e) => {
    setSelectedSlot(Number(e.target.value));
    setSelectedCycle(null); // Reset cycle when slot changes
  };

  const handleCycleChange = (e) => {
    setSelectedCycle(Number(e.target.value));
  };

  const slotOptions = splitData.map((item) => item.slot);
  const cycleOptions =
    selectedSlot != null
      ? splitData.find((item) => item.slot === selectedSlot)?.cycleList || []
      : [];

  const selectedData = splitData.find((item) => item.slot === selectedSlot);
  const splitPayments =
    selectedData?.splitPayments?.filter((p) => p.cycle === selectedCycle) || [];

  return (
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

      <div className="max-w-6xl  h-auto m-auto p-2">
        {/* Top Header */}
        <Header />
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* left part */}
          <LeftUserPannel />

          {/* Right Part */}
          <div className="">
            <div className="hidden md:block   block sm:hidden">
              <DashboardInfo />
            </div>

            {/* Partners table */}
            <div
              className="flex flex-col mt-10  border-1 rounded-2xl p-6 text-center bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[700px] p-10 py-4 text-center backdrop-blur-md shadow-xl"
              // style={{
              //   background:
              //     "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              // }}
            >
              <div className="text-3xl font-bold mb-5 text-start text-cyan-400">
                Split Bonus Details
              </div>

              <div className="flex gap-4 mb-6">
                <select
                  value={selectedSlot ?? ""}
                  onChange={handleSlotChange}
                  className="p-2 rounded bg-white text-black"
                >
                  <option value="" disabled>
                    Select Slot
                  </option>
                  {slotOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCycle ?? ""}
                  onChange={handleCycleChange}
                  className="p-2 rounded bg-white text-black"
                  disabled={selectedSlot === null}
                >
                  <option value="" disabled>
                    Select Cycle
                  </option>
                  {cycleOptions.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {cycle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full overflow-x-auto">
                {" "}
                {/* Enables horizontal scrolling on small screens */}
                <table
                  className="w-full text-white border-collapse"
                  style={{ minWidth: "600px" }}
                >
                  <thead>
                    <tr className="">
                      <th className="p-2 border">Initiated From</th>
                      <th className="p-2 border">Splited With</th>
                      <th className="p-2 border">Second Upline</th>
                      <th className="p-2 border">RAMA</th>
                      <th className="p-2 border">USD</th>
                      <th className="p-2 border">Receiver</th>
                      <th className="p-2 border">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {splitPayments.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2 border">
                          {item.initiatedFrom.slice(0, 6) +
                            "...." +
                            item.initiatedFrom.slice(-8)}
                        </td>
                        <td className="p-2 border">
                          {item.splitedWith.slice(0, 6) +
                            "...." +
                            item.splitedWith.slice(-8)}
                        </td>
                        <td className="p-2 border">
                          {item.isReceiverSecondUpline ? "Yes" : "No"}
                        </td>
                        <td className="p-2 border">
                          {Number(item.amountInRAMA?.toString()) / 1e18} RAMA
                        </td>
                        <td className="p-2 border">
                          ${Number(item.amountInUSD?.toString())}
                        </td>
                        <td className="p-2 border">
                          {item.receiver.slice(0, 6) +
                            "...." +
                            item.receiver.slice(-8)}
                        </td>
                        <td className="p-2 border">
                          {new Date(
                            Number(item.timeStamp?.toString()) * 1000
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {splitPayments.length === 0 && (
                      <tr>
                        <td className="p-2 border text-center" colSpan="7">
                          No split payments for this cycle.
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
  );
}
