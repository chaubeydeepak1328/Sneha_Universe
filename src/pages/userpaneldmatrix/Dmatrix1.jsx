import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { useLocation } from "react-router-dom";

import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";
import { RxClipboardCopy } from "react-icons/rx";
import { formatWithCommas, handleCopy } from "../../util/helpers";
import { ToastContainer } from "react-toastify";

export default function UserPanel() {
  const location = useLocation();
  const { slotNumber, u3Data } = location.state || {};

  // const [isLoadingU3, setIsLoadingU3] = useState(true);

  const isLoadingU3 = !Array.isArray(u3Data) || u3Data.length === 0;

  const [address, setAddress] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      return data?.userAddress || "";
    } catch {
      return "";
    }
  });


  const [userId, setUserId] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      return data?.userId || "";
    } catch {
      return "";
    }
  });

  // const getU3Details = useStore((state) => state.getU3Details);

  // const [u3Data, setU3Data] = useState();

  // useEffect(() => {
  //   const fetchU3Details = async () => {

  //     setIsLoadingU3(true);
  //     const response = await getU3Details(address);

  //     console.log(response);
  //     setU3Data(response)

  //     setIsLoadingU3(false);
  //   }

  //   fetchU3Details();
  // }, [])

  // const dummyData = [
  //   { slotNo: 1, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
  //   { slotNo: 2, cycles: [[1, 1, 1, 1]] },
  //   { slotNo: 3, cycles: [[1, 1, 1, 0]] },
  //   { slotNo: 4, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
  //   { slotNo: 5, cycles: [[1, 0, 0, 0]] },
  //   { slotNo: 6, cycles: [[1, 1, 0, 0]] },
  //   { slotNo: 7, cycles: [[1, 1, 1, 0]] },
  //   { slotNo: 8, cycles: [[0, 0, 0, 0]] },
  //   { slotNo: 9, cycles: [[0, 0, 0, 0]] },
  //   { slotNo: 10, cycles: [[0, 0, 0, 0]] },
  // ];

  const [slotIndex, setSlotIndex] = useState(slotNumber ? slotNumber : 0);
  const [cycleIndex, setCycleIndex] = useState(0);

  const slot = u3Data?.[slotIndex] ?? { cycles: [] };
  const cycles = slot.cycles;
  const currentCycle = cycles?.[cycleIndex] ?? [];

  const prevSlot = () => {
    setSlotIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setCycleIndex(0);
  };

  const nextSlot = () => {
    setSlotIndex((prev) => (prev < u3Data?.length - 1 ? prev + 1 : prev));
    setCycleIndex(0);
  };

  const prevCycle = () => {
    setCycleIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextCycle = () => {
    setCycleIndex((prev) => (prev < cycles.length - 1 ? prev + 1 : prev));
  };

  // =======================================================================================================
  // Fetch the Table Details
  // ======================================================================================================

  const [tableData, setTableData] = useState([]);

  const fetchU3MatrixLogs = useStore((state) => state.fetchU3MatrixLogs);

  useEffect(() => {
    const fetchTableData = async () => {
      const res = await fetchU3MatrixLogs(address);

      // console.log("res--------------->", res);

      setTableData(res);
    };
    if (address) fetchTableData();
  }, [slotIndex]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Filter the Data on the basis of slot and cycles

  // const filterData = Array.isArray(tableData)
  //   ? tableData.filter(
  //     (val) =>
  //       Number(val.cycleNo) === Number(cycleIndex + 1) &&
  //       Number(val.slotLevel) === Number(slotIndex + 1)
  //   )
  //   : [];

  const filterData = Array.isArray(tableData)
    ? tableData
      .filter(
        (val) =>
          Number(val.cycleNo) === Number(cycleIndex + 1) &&
          Number(val.slotLevel) === Number(slotIndex + 1)
      )
      .sort((a, b) => Number(a.positionIndex) - Number(b.positionIndex)) // Sort by positionIndex ascending
    : [];

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filterData?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filterData?.length / recordsPerPage);

  function convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleString(); // Returns local date and time string
  }

  return (
    <div
      className="bg-black min-h-screen rounded-3xl"
    // style={{
    //   background: "linear-gradient(180deg, #000000, rgb(13, 35, 13))",
    //   position: "relative",
    //   overflow: "hidden",
    //   minHeight: "100vh",
    // }}
    >

      <ToastContainer />
      {/* Dynamic Moving Stars Background */}
      {/* <div className="stars-container fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
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
      </div> */}

      <div className="max-w-6xl mx-auto p-2">
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
              className="grid grid-cols-1 mt-10  p-3 
    bg-cyan-400/10
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    transition-all
    duration-300  border text-cyan-400 px-2  text-sm font-medium  flex-col rounded-2xl w-full lg:w-[700px]  py-4 text-center backdrop-blur-md shadow-xl "
            >
              <div className="w-full">
                <div className="flex justify-start">
                  <span className="text-2xl md:text-5xl text-cyan-400 font-extrabold">
                    Universe
                  </span>{" "}
                  <span className="text-2xl md:text-xl font-bold text-white">
                    U3 Plus {">>>>"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-center gap-0  p-4">
                {/* Recycle Control */}
                <div className="flex flex-col items-center justify-center mt-10">
                  <FaChevronUp
                    onClick={isLoadingU3 ? undefined : prevCycle}
                    className={`cursor-pointer text-3xl ${isLoadingU3
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-blue-500"
                      }`}
                  />
                  <div className="flex justify-center items-center gap-8">
                    <div>RECYCLE</div>
                    <TfiReload className="text-xl text-pink-500" />
                    <div className="text-xl text-pink-500 mt-5">
                      {cycleIndex + 1}/{cycles?.length}
                    </div>
                  </div>
                  <FaChevronDown
                    onClick={isLoadingU3 ? undefined : nextCycle}
                    className={`cursor-pointer text-3xl ${isLoadingU3
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-blue-500"
                      }`}
                  />
                </div>

                {/* Main ID Card with Navigation */}
                <div className="flex flex-col lg:flex-row justify-center items-center ml-0 lg:ml-[-50px]">
                  <div className="flex justify-center items-center gap-2">
                    <FaChevronLeft
                      onClick={isLoadingU3 ? undefined : prevSlot}
                      className={`cursor-pointer text-xl ${isLoadingU3
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:text-blue-500"
                        }`}
                    />
                    <button
                      onClick={isLoadingU3 ? undefined : prevSlot}
                      className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                    >
                      {slot?.slotNo}
                    </button>
                  </div>

                  {/* ID Card */}
                  <div className="flex flex-col items-center p-6 rounded-2xl transition-transform duration-300">
                    <div className="h-16 w-40 border border-cyan-400 rounded-xl flex justify-center items-center text-white text-2xl font-bold">
                      {/* ID : S{slot.slotNo}-C{cycleIndex + 1} */}
                      ID : {userId}
                    </div>
                    <div className="bg-[#24b6ca] w-30 h-8 ml-36 mt-[-10px] z-0 rounded-sm text-white flex justify-center items-center">
                      slot {slotIndex + 1}
                    </div>

                    {/* Vertical Lines */}
                    <div className="mt-4 space-y-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex justify-center gap-5">
                          {[...Array(4)].map((__, j) => (
                            <PiLineVerticalLight
                              key={j}
                              className="text-white text-xl"
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Circles */}
                    <div className="flex justify-center gap-3 mt-2">
                      {currentCycle?.map((status, j) =>
                        j == 2 ? (
                          <GiCircle
                            key={j}
                            className="rounded-full text-xl size-8"
                            style={
                              status
                                ? slotIndex === 0
                                  ? { backgroundColor: "white" }
                                  : {
                                    background:
                                      "linear-gradient(to bottom, white 50%, #ff66d9 50%)",
                                  }
                                : { color: "gray" }
                            }
                          />
                        ) : j == 3 ? (
                          <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "bg-green-300" : "text-gray-400"
                              }`}
                          />
                        ) : (
                          <GiCircle
                            key={j}
                            // className={status ? "bg-white rounded-2xl text-xl" : "text-gray-500 text-xl"}
                            className={`text-xl rounded-full size-8 ${status ? "text-white bg-white" : "text-gray-400"
                              }`}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={nextSlot}
                      className="w-10 h-10 bg-[#24b6ca] text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                    >
                      {slotIndex + 2 <= u3Data?.length ? slotIndex + 2 : "-"}
                    </button>
                    <FaChevronRight
                      onClick={isLoadingU3 ? undefined : nextSlot}
                      className={`cursor-pointer text-xl ${isLoadingU3
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:text-blue-500"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[700px] overflow-x-auto py-4 max-w-6xl mx-auto mt-4 rounded-xl bg-cyan-400/10 border border-cyan-400 backdrop-blur-md transition-all duration-300">
              {/* Table Container */}
              <div className="w-full overflow-auto rounded-xl shadow-xl border border-cyan-500 bg-black/30 backdrop-blur-md p-4">
                {Array.isArray(currentRecords) && currentRecords.length > 0 ? (
                  <>
                    <table className="min-w-[900px] w-full text-sm text-white border-collapse">
                      <thead>
                        <tr className="bg-cyan-600/30 text-cyan-300 text-left">
                          {[
                            "Sno",
                            "Slot",
                            "Cycle",
                            "Position",
                            "Initiated From",
                            "Final Receiver",
                            "Payment Type",
                            "Purpose",
                            "Total Received",
                            "Debited",
                            "Net Profit",
                            "Tx Hash",
                            "Date",
                          ].map((header) => (
                            <th
                              key={header}
                              className="p-3 text-xs sm:text-sm whitespace-nowrap font-semibold"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.map((tx, index) => (
                          <tr
                            key={index}
                            className="border-t border-cyan-800 hover:bg-cyan-900/20 transition"
                          >
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{tx?.slotLevel ?? "-"}</td>
                            <td className="p-2">{tx?.cycleNo ?? "-"}</td>
                            <td className="p-2">{tx?.positionIndex ?? "-"}</td>
                            <td className="p-2 font-mono text-xs text-cyan-200">

                              <a target="_blank" href={`https://ramascan.com/address/${tx.initiatedFrom}`}>
                                {tx?.initiatedFrom
                                  ? `${tx.initiatedFrom.slice(
                                    0,
                                    6
                                  )}...${tx.initiatedFrom.slice(-4)}`
                                  : "-"}
                              </a>
                              <RxClipboardCopy
                                onClick={() => handleCopy(tx.splitedWith)}
                                className="text-xl text-cyan-400  cursor-pointer ml-2 sm:ml-4"
                              />

                            </td>
                            <td className="p-2 font-mono text-xs text-cyan-200">
                              <a target="_blank" href={`https://ramascan.com/address/${tx.finalReceiver}`}>
                                {tx?.finalReceiver
                                  ? `${tx.finalReceiver.slice(
                                    0,
                                    6
                                  )}...${tx.finalReceiver.slice(-4)}`
                                  : "-"}
                              </a>
                              <RxClipboardCopy
                                onClick={() => handleCopy(tx.finalReceiver)}
                                className="text-xl text-cyan-400  cursor-pointer ml-2 sm:ml-4"
                              />
                            </td>
                            <td className="p-2">{tx?.paymentType ?? "-"}</td>
                            <td className="p-2">{tx?.purpose ?? "-"}</td>
                            <td className="p-2 text-green-300">
                              {formatWithCommas(tx?.totalReceivedAmount) ?? "0"} RAMA
                            </td>
                            <td className="p-2 text-red-300">
                              {formatWithCommas(tx?.amountDebitedForPurpose) ?? "0"} RAMA
                            </td>
                            <td className="p-2 text-yellow-300">
                              {formatWithCommas(tx?.netProfit) ?? "0"} RAMA
                            </td>
                            <td className="p-2 font-mono text-blue-400">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://ramascan.com/tx/${tx?.txHash}`}
                                className="truncate block max-w-[120px]"
                              >
                                {tx?.txHash
                                  ? `${tx.txHash.slice(
                                    0,
                                    7
                                  )}...${tx.txHash.slice(-7)}`
                                  : "-"}
                              </a>
                              <RxClipboardCopy
                                onClick={() => handleCopy(tx.txHash)}
                                className="text-xl text-cyan-400  cursor-pointer ml-2 sm:ml-4"
                              />
                            </td>
                            <td className="p-2">{tx?.formattedDate ?? "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6 text-white text-sm">
                      <button
                        className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-lg transition disabled:opacity-40"
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="px-2 py-2">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-lg transition disabled:opacity-40"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 text-cyan-300 font-medium">
                    No transactions found for this slot and cycle.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
