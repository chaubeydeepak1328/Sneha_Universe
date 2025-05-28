import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { PiLineVerticalLight } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { BsCaretUpFill } from "react-icons/bs";
import Header from "../../components/Header";
import LeftUserPannel from "../../components/LeftUserPannel";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";
import { formatWithCommas } from "../../util/helpers";
import React from "react";

export default function UserPanel() {
  const location = useLocation();
  const { id, slotVal, matrixData } = location.state || {};

  const dummyData = [
    [
      "$40",
      "$80",
      "$160",
      "$320",
      "$640",
      "$1280",
      "$2560",
      "$5120",
      "$10240",
      "$20480",
    ],
    [
      "$40",
      "$80",
      "$160",
      "$320",
      "$640",
      "$1280",
      "$2560",
      "$5120",
      "$10240",
      "$20480",
    ],
    [
      "$40",
      "$80",
      "$160",
      "$320",
      "$640",
      "$1280",
      "$2560",
      "$5120",
      "$10240",
      "$20480",
    ],
    [
      "$40",
      "$80",
      "$160",
      "$320",
      "$640",
      "$1280",
      "$2560",
      "$5120",
      "$10240",
      "$20480",
    ],
    [
      "$40",
      "$80",
      "$160",
      "$320",
      "$640",
      "$1280",
      "$2560",
      "$5120",
      "$10240",
      "$20480",
    ],
  ];

  const maximumCycle = 4; //position
  const maximumSlot = dummyData[0]?.length || 0; //slots

  const [cycleIndex, setCycleIndex] = useState(0); // vertical
  const [slotIndex, setSlotIndex] = useState(slotVal ? slotVal - 1 : 0);

  const handleLeft = () => {
    if (slotIndex > 0) setSlotIndex(slotIndex - 1);

    // for table
    setCurrentPage(1);
  };

  const handleRight = () => {
    if (slotIndex < maximumSlot - 1) setSlotIndex(slotIndex + 1);
  };

  const handleUp = () => {
    if (cycleIndex > 0) setCycleIndex(cycleIndex - 1);
  };

  const handleDown = () => {
    if (cycleIndex < maximumCycle - 1) setCycleIndex(cycleIndex + 1);
  };

  useEffect(() => {
    handlePositionClick(cycleIndex);
  }, [cycleIndex]);

  const [selectedPos, setSeletedPos] = useState(-1);

  const handlePositionClick = (index) => {
    setSeletedPos(index);
    // console.log("Selected Position:", selectedPos);

    // for table filter
    setCurrentPage(1);
  };

  // ========================================================================================
  // for table
  // ========================================================================================
  const getU4table = useStore((state) => state.getU4table);

  const [tableData, setTableData] = useState();

  useEffect(() => {
    const fetchtableDat = async () => {
      // console.log(
      //   "++++++++++++++++++++++++++++++",
      //   id,
      //   slotIndex + 1,
      //   selectedPos + 1
      // );
      const data = await getU4table(id, slotIndex + 1, selectedPos + 1);

      setTableData(data);
    };

    fetchtableDat();
  }, [slotIndex, selectedPos]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;

  // // Filter data based on selection
  // const filteredData = u5dummytableData.filter(tx =>
  //     slotIndex && selectedPos ?
  //         tx.slotNumber === slotIndex && tx.positionNumber === selectedPos :
  //         []
  // );
  // // Pagination calculations
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = tableData?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(tableData?.length / recordsPerPage);

  // // Generate unique slots and positions for dropdowns
  // const slots = [...new Set(u5dummytableData.map(tx => tx.slotNumber))];
  // const positions = [...new Set(u5dummytableData.map(tx => tx.positionNumber))];

  function convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleString(); // Returns local date and time string
  }

  return (
    <div
      className=" min-h-screen rounded-3xl"
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
            <React.Fragment key={`star-${i}`}>
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
            </React.Fragment>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto ">
        {/* Top Header */}
        <Header />

        {/* Main Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side Card */}
          <LeftUserPannel />

          {/* Right Side Content */}
          <div className="">
            <div className="hidden md:block   block sm:hidden">
              <DashboardInfo />
            </div>

            {/* Universe U3 Plus Section */}
            <div
              className="grid grid-cols-1 mt-10 rounded-2xl p-6 text-center bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-cyan-400
    bg-cyan-400/10
    overflow-hidden
    backdrop-blur-md
    shadow-lg
    transition-all
    duration-300   border-1 rounded-2xl p-6 text-center"
            >
              <div className="mt-10">
                <span className="border-2 text-2xl px-12 py-2 bg-cyan-400/10 border-cyan-400 rounded-2xl">
                  {" "}
                  Detailed View
                </span>
              </div>
              <div className="mt-10">
                <span className="border-2 text-2xl px-12 py-2 bg-cyan-400/10 border-cyan-400  rounded-2xl">
                  slot {slotIndex + 1}
                </span>
              </div>

              {/* Matrix View */}
              <div className="flex flex-wrap justify-center items-center gap-10 lg:mt-10 p-4">
                <div className="flex flex-col items-center justify-center mt-10 lg:mt-30">
                  <FaChevronUp
                    onClick={handleUp}
                    className="text-3xl hover:text-4xl hover:text-blue-500"
                  />
                  <div className="flex justify-center items-center gap-2">
                    <div>Position</div>
                    <div>
                      {cycleIndex + 1}/{"4"}
                    </div>
                  </div>
                  <FaChevronDown
                    onClick={handleDown}
                    className="text-3xl hover:text-4xl hover:text-blue-500"
                  />
                </div>

                <div className="flex justify-center gap-6 lg:gap-30 items-center ml-0 lg:ml-[-50px]">
                  <div className="flex justify-center items-center gap-2">
                    <FaChevronLeft
                      onClick={handleLeft}
                      className="hover:text-blue-500 text-xl"
                    />
                    <button
                      onClick={handleLeft}
                      className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                    >
                      {slotIndex + 1}
                    </button>
                  </div>

                  {/* User Card */}
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <button className="h-10 w-30 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg">
                        {dummyData[cycleIndex][slotIndex]}
                      </button>
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex justify-center gap-4">
                          {[...Array(4)].map((__, j) => (
                            <PiLineVerticalLight key={j} />
                          ))}
                        </div>
                      ))}
                      <div className="flex justify-center items-center gap-3">
                        {matrixData
                          .find((val) => val.id == id)
                          .slotsPosition[slotIndex].map((val, j) => (
                            <button
                              onClick={() => handlePositionClick(j)}
                              key={j}
                              className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                                                                      ${j ===
                                  selectedPos
                                  ? "ring-2 ring-green-500 shadow-[0_0_20px_3px_rgba(34,197,94,0.7)]"
                                  : ""
                                }                                              ${val === "1"
                                  ? j % 2 === 0
                                    ? "bg-yellow-500"
                                    : "bg-blue-400"
                                  : ""
                                } hover:opacity-80`}
                            >
                              {val === "1" && j % 2 === 0 && (
                                <BsCaretUpFill className="text-black text-xl" />
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={handleRight}
                      className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                    >
                      {slotIndex == 9 ? "0" : slotIndex + 2}
                    </button>
                    <FaChevronRight
                      onClick={handleRight}
                      className="hover:text-blue-500 text-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Partners Table */}
            {/* <div className="flex flex-col mt-10 border-2 rounded-2xl p-4 sm:p-6 text-center w-full">
                            <div className="text-2xl sm:text-3xl font-bold mb-4 text-start">
                                U4Profits’s
                            </div>

                            <div className="w-full overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse text-sm sm:text-base">
                                    <thead className="">
                                        <tr>
                                            <th className="p-2 border">S. No.</th>
                                            <th className="p-2 border">USD</th>
                                            <th className="p-2 border">RAMA</th>
                                            <th className="p-2 border">Tx Hash</th>
                                            <th className="p-2 border">Date & Time</th>
                                            <th className="p-2 border">Status</th>
                                            <th className="p-2 border">Re-Generate</th>
                                            <th className="p-2 border">Net Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(4)].map((_, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="p-2 border">1</td>
                                                <td className="p-2 border">10</td>
                                                <td className="p-2 border">0xc03...38624</td>
                                                <td className="p-2 border">0.000 / $0.000</td>
                                                <td className="p-2 border">2022-11-12 10:12:56</td>
                                                <td className="p-2 border">0x4f0...98c0E</td>
                                                <td className="p-2 border">0xc03...38624</td>
                                                <td className="p-2 border">0.000 / $0.000</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}

            <div className="w-full py-4 mt-3 rounded-xl max-w-6xl mx-auto bg-cyan-400/10 border-2 border-cyan-400">
              {/* Table Display */}
              {tableData?.length > 0 ? (
                <>
                  {/* Scrollable Table Container */}
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {/* Table with fixed minimum width */}
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-cyan-200">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Sno
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Slot
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Position
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Chunk
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              RAMA
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              REGENERATE
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Date/Time
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            >
                              Net Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" divide-y  divide-gray-200">
                          {currentRecords?.map((tx, index) => (
                            <tr key={index}>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {index + 1}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {slotIndex + 1}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {selectedPos + 1}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {index + 1}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {formatWithCommas(tx?.receivedAmountInRAMA)}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {formatWithCommas(tx?.totalAmountAccountedForRegenerationInRAMA)}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {convertTimestampToDateTime(tx?.receivedDate)}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                                {formatWithCommas(tx?.totalProfitInRAMA)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination Controls - Now properly responsive */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-200">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * recordsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          currentPage * recordsPerPage,
                          tableData.length
                        )}
                      </span>{" "}
                      of <span className="font-medium">{tableData.length}</span>{" "}
                      results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  Select a Slot and Position to view transactions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
