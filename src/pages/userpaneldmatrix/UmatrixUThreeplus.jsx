import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsCaretUpFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import LeftUserPannel from "../../components/LeftUserPannel";
import Header from "../../components/Header";
import DashboardInfo from "../../components/DashboardInfo";
import { useStore } from "../../Store/UserStore";
import React from "react";

export default function UserPanel() {
  const navigate = useNavigate();

  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData")).userAddress
  );

  const getU3premInfo = useStore((state) => state.getU3premInfo);

  const dummyData = [
    {
      id: "N/a",
      values: ["$640", "$1280", "$2560", "$5120", "$10240"],
      slotsPosition: [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"],
      ],
    },
  ];

  const [currentIdIndex, setCurrentIdIndex] = useState(0);

  const [matrixData, setMatrixData] = useState(dummyData);

  useEffect(() => {
    const fetchU3prem = async () => {
      try {
        const response = await getU3premInfo(address);
        // console.log("==========U5 response---->", response);
        if (response) {
          setMatrixData(response.length == 0 ? dummyData : response); // Make sure this is an array
        }
      } catch (err) {
        console.error("Error fetching U5 info:", err);
      }
    };

    if (address) {
      fetchU3prem();
    }
  }, [address]);

  const currentMatrix = matrixData?.[currentIdIndex];
  const id = currentMatrix?.id;
  const values = currentMatrix?.values || [];
  const slotsPosition = currentMatrix?.slotsPosition || [];

  // const { id, values, slotsPosition } = matrixData[currentIdIndex];

  const [currentCount, setCurrentCount] = useState(0);

  const next = () => {
    if (currentIdIndex < matrixData.length - 1)
      setCurrentIdIndex(currentIdIndex + 1);

    if (currentCount < matrixData?.length - 1)
      setCurrentCount(currentCount + 1);
  };

  const prev = () => {
    if (currentIdIndex > 0) setCurrentIdIndex(currentIdIndex - 1);

    if (currentCount > 0) setCurrentCount(currentCount - 1);
  };




  // ==================================================================
  // Basic Matric Info
  // ==================================================================

  const getU3PremMartixInfo = useStore((state) => state.getU3PremMartixInfo);

  const [MatrixDetails, setMatrixDetails] = useState();

  const fetchmatrixInfo = async () => {
    const res = await getU3PremMartixInfo(address);
    setMatrixDetails(res);
  };

  useEffect(() => {
    if (address) fetchmatrixInfo();
  }, [address]);

  return (
    <div
      className="rounded-3xl"
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
        {/* Header */}
        <Header />

        {/* Panel */}
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* Left Side */}
          <LeftUserPannel />

          {/* Right Side */}
          <div className="">
            {/* Buttons */}

            <div className="hidden md:block   block sm:hidden">
              <DashboardInfo />
            </div>

            {/* Universe U5 Section */}
            <div
              className="grid grid-cols-1 mt-10 bg-cyan-400/10
   
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-2 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full lg:w-[700px]  py-4 text-center backdrop-blur-md shadow-xl  border-1 rounded-2xl "
            //   style={{
            //     background:
            //       "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
            //   }}
            >
              <div className="flex justify-between items-center">
                <button
                  className="cursor-pointer"
                  onClick={prev}
                  disabled={currentIdIndex === 0}
                >
                  <FaChevronLeft className="text-3xl hover:text-yellow-500" />
                </button>

                <button
                  onClick={prev}
                  className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                >
                  {currentCount + 1}
                </button>

                <div>
                  <div className="flex  justify-content lg:justify-between items-center flex-wrap">
                    <div>
                      <span className="text-4xl md:text-5xl text-cyan-400 font-extrabold">
                        Universe
                      </span>
                      <span className="text-2xl md:text-xl font-bold text-white">
                        {" "}
                        U3 Premium {">>>"}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-center items-center gap-1">
                        <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-yellow-500">
                          <BsCaretUpFill className="text-black text-xl" />
                        </div>
                        <div className="ml-[5px]">1-3 Upgrade</div>
                      </div>
                      <div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black bg-blue-500"></div>
                          <div>2 Your Wallet</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Levels */}
                  {/* Levels */}
                  <div className="flex flex-col items-center gap-4 mt-10">
                    <div className="my-10">
                      <span className="border-2 lg:text-2xl px-12 py-2 rounded-xl ">
                        {" "}
                        Id {id}{" "}
                      </span>
                    </div>
                    {/* First Card - First Line */}
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center">
                        <button
                          // onClick={() => navigate('', { state: { id: id, slotVal: 1, plan: values[0].replace(/\$/g, "").trim() } })}

                          onClick={() => {
                            if (id == "N/a") {
                              alert("data is Loading ");
                            } else {
                              navigate(
                                "/user-panel-home/user-panel-umatrix-3pre-details",
                                {
                                  state: {
                                    id: id,
                                    slotVal: 0,
                                    matrixData: matrixData,
                                  },
                                }
                              );

                              // console.log({
                              //   id: id,
                              //   slotVal: 0,
                              //   matrixData: matrixData,
                              //   plan: values[0].replace(/\$/g, "").trim(),
                              // });
                            }
                          }}
                          className={`h-10 w-30 ${currentMatrix?.slotsPosition[0][0] == "1"
                            ? "bg-green-500"
                            : "bg-[#DED8C8]"
                            } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}
                        >
                          {values[0]}
                        </button>
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="flex justify-center gap-7">
                            {[...Array(3)].map((__, j) => (
                              <PiLineVerticalLight key={j} />
                            ))}
                          </div>
                        ))}
                        <div className="flex justify-center items-center gap-6">
                          {slotsPosition[0].map((value, j) => (
                            <button
                              key={j}
                              className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                                                                     ${value ===
                                  "1"
                                  ? j %
                                    2 ===
                                    0
                                    ? "bg-yellow-500"
                                    : "bg-blue-400"
                                  : ""
                                } hover:opacity-80`}
                            >
                              {value === "1" && j % 2 === 0 && (
                                <BsCaretUpFill className="text-black text-xl" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Remaining Cards - Second Line */}
                    <div className="flex flex-wrap justify-center gap-4 my-10">
                      {values.slice(1).map((value, index) => (
                        <div
                          key={index + 1}
                          className="flex flex-col items-center"
                        >
                          <button
                            // onClick={() => {
                            //     navigate('', { state: { id: id, slotVal: index + 2, plan: value.replace(/\$/g, "").trim() } });
                            //     console.log("id==========================================", id, "slotVal", index + 2, "plan", value.replace(/\$/g, "").trim())
                            // }}

                            onClick={() => {
                              if (id == "N/a") {
                                alert("data is Loading ");
                              } else {
                                navigate(
                                  "/user-panel-home/user-panel-umatrix-3pre-details",
                                  {
                                    state: {
                                      id: id,
                                      slotVal: index + 1,
                                      matrixData: matrixData,
                                    },
                                  }
                                );
                              }
                              // console.log(
                              //   "id==========================================",
                              //   {
                              //     id: id,
                              //     slotVal: index + 1,
                              //     matrixData: matrixData,
                              //     plan: value.replace(/\$/g, "").trim(),
                              //   }
                              // );
                            }}
                            className={`h-10 w-30 ${currentMatrix?.slotsPosition[index + 1][0] === "1"
                              ? "bg-green-500"
                              : "bg-[#DED8C8]"
                              } rounded-xl flex justify-center items-center text-black text-lg cursor-pointer`}
                          >
                            {value}
                          </button>
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex justify-center gap-7">
                              {[...Array(3)].map((__, j) => (
                                <PiLineVerticalLight key={j} />
                              ))}
                            </div>
                          ))}
                          <div className="flex justify-center items-center gap-6">
                            {slotsPosition[index + 1]?.map((val, j) => (
                              <button
                                key={j}
                                className={`h-[20px] w-[20px] rounded-full flex justify-center items-center cursor-pointer border border-black
                                                                           ${val ===
                                    "1"
                                    ? j %
                                      2 ===
                                      0
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
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  {/* Levels */}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 bg-[#24b6ca] text-white text-3xl font-bold flex justify-center items-center rounded-sm cursor-pointer"
                >
                  {currentCount == matrixData.length - 1
                    ? "0"
                    : currentCount + 2}
                </button>
                <button
                  className="cursor-pointer"
                  onClick={next}
                  disabled={currentIdIndex === matrixData.length - 1}
                >
                  <FaAngleRight className="text-4xl hover:text-yellow-500" />
                </button>
              </div>
            </div>

            {/* Table */}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
              {/* Box */}
              {(() => {
                const matchedMatrix = MatrixDetails?.find(
                  (val) =>
                    val.matrixID?.toString() === currentMatrix?.id?.toString()
                );

                const detail = matchedMatrix?.u5MatrixDetail || {};

                const cards = [

                  {
                    title: "Generated",
                    rama: detail.Generated?.toString() || "0",
                  },
                  {
                    title: "Net Profit",
                    rama: detail.NetProfit?.toString() || "0", // use correct key here if exists
                  },
                  {
                    title: "Generated ID's",
                    totalId: detail.GeneratedID?.toString() || "0",
                  },
                ];

                return cards.map((item, index) =>
                  item.title !== "Generated ID's" &&
                    item.title !== "view Matrix" ? (
                    <div
                      key={index}
                      // style={{
                      //   background:
                      //     "linear-gradient(45deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                      // }}
                      className="p-2 rounded-2xl shadow hover:shadow-lg transition bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-2 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full  py-4 text-center backdrop-blur-md shadow-xl  border-1 rounded-2xl  text-center"
                    >
                      <h3 className="text-sm font-semibold text-white mb-2 ">
                        {item.title}
                      </h3>
                      <div className="text-cyan-400 space-y-1">
                        <p>
                          <span className="font- text-[13px]">Rama:</span>{" "}
                          {item.rama}
                        </p>
                      </div>
                    </div>
                  ) : item.title === "view Matrix" ? (
                    <button
                      key={index}
                      // style={{
                      //   background:
                      //     "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                      // }}
                      className="p-3 rounded-2xl shadow hover:shadow-lg transition bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full  p-10 py-4 text-center backdrop-blur-md shadow-xl  border-1 rounded-2xl p-6 text-center"
                    >
                      <div className="text-cyan-400 flex justify-center gap-4"></div>
                    </button>
                  ) : (
                    <div
                      key={index}
                      // style={{
                      //   background:
                      //     "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                      // }}
                      className="p-3 rounded-2xl shadow hover:shadow-lg transition bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border border-cyan-400 text-cyan-400 px-4 py-1 text-sm font-medium  items-center justify-center flex flex-col rounded-2xl w-full  p-10 py-4 text-center backdrop-blur-md shadow-xl  border-1 rounded-2xl p-6 text-center"
                    >
                      <h3 className="text-sm font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <div className="text-cyan-400 space-y-1">
                        <p style={{ fontSize: "15px" }}>
                          <span className="font-sm">TotalID :</span>{" "}
                          {item.totalId}
                        </p>
                      </div>
                    </div>
                  )
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
