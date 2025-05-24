import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiLineVerticalLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";

import { useStore } from "../Store/UserStore";
import DashboardInfo from "./DashboardInfo";

import cart from "../assets/images/cart.png";
import RamaLoader from "../util/RamaLoader";
import pointingFinger from "../assets/images/pointingFinger.png";

const RightUserPannel = () => {
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("userData")).userAddress
  );

  const [u3Data, setU3Data] = useState();
  const [slotData, setSloatData] = useState([]);
  const [MatrixInfo, setMatrixInfo] = useState();

  useEffect(() => {
    console.log("Address:", address);
  }, [address]);

  const getU3Plus = useStore((state) => state.getU3Plus);
  const generatedId = useStore((state) => state.generatedId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getU3Plus(address);
        console.log("response: U3", response);

        setU3Data(response);

        const formatted = response.map((slot) => ({
          cycles: slot.cycles.length,
          users: slot.lastUser,
        }));
        setSloatData(formatted);

        const response1 = await generatedId(address);
        setMatrixInfo(response1);
        console.log("generatedId:", response1);
      } catch (error) {
        console.error("Error fetching U3Plus:", error);
      }
    };

    fetchData();
  }, []);

  const values = [10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120];

  // Determine last active slot with users > 0
  const lastActiveIndex = slotData.reduce(
    (acc, curr, idx) => (curr.users > 0 ? idx : acc),
    -1
  );

  return (
    <div className="w-full lg:w-[700px]">
      <DashboardInfo />

      {/* Universe U3 Plus Section */}
      <div
        className=" grid-cols-1 mt-10  bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-green-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300   border-1 rounded-2xl p-6 text-center"
        // style={{
        //     background:
        //         "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgb(7, 7, 4) 100%)",
        // }}
      >
        <div>
          <span className="text-4xl md:text-5xl text-[#00d3f3] font-extrabold">
            Universe
          </span>{" "}
          <span className="text-2xl md:text-xl font-bold text-white">
            U3 Plus {">>>>"}
          </span>
        </div>

        {/* First Card - First Row */}
        <div className="flex justify-center mt-10">
          {values.slice(0, 1).map((value, index) => {
            const slotIndex = index + 1;
            const slot = slotData[index];
            const isLastActive = index === lastActiveIndex;
            const circleClass =
              isLastActive && slot?.users === 2 ? "text-white" : "";

            return (
              <button
                key={index}
                onClick={() =>
                  navigate("/user-panel-dmatrix1", {
                    state: { slotNumber: index, u3Data: u3Data },
                  })
                }
                className="flex flex-col items-center p-0" // Removed all responsive paddings
              >
                <div
                  className={`h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl cursor-pointer ${
                    slotIndex < slotData.length + 1 ? "bg-green-500" : ""
                  }`}
                >
                  ${value}
                </div>

                {/* Vertical lines section */}
                <div className="w-full px-0">
                  {" "}
                  {/* Removed horizontal padding */}
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex justify-center gap-2">
                      {[...Array(4)].map((__, j) => (
                        <PiLineVerticalLight
                          key={j}
                          className="text-gray-400"
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Circles section */}
                <div className="w-full px-0 flex justify-center gap-2">
                  {" "}
                  {/* Removed horizontal padding */}
                  {[...Array(4)].map((_, j) => {
                    const isFilled = j < slot?.users;
                    return j == 2 ? (
                      <GiCircle
                        key={j}
                        className={`rounded-full ${
                          isFilled ? "bg-white" : "text-gray-500"
                        }`}
                        size={14}
                      />
                    ) : (
                      <GiCircle
                        key={j}
                        className={`${
                          isFilled ? "bg-white rounded-full" : "text-gray-500"
                        }`}
                        size={14}
                      />
                    );
                  })}
                </div>

                {/* Users/cycles section */}
                <div className="flex justify-center items-center gap-2 mt-1 text-sm">
                  {" "}
                  {/* Reduced top margin */}
                  <div>{slot?.users}</div>
                  <LuUsers size={16} />
                  <div>{slot?.cycles}</div>
                  <TfiReload className="text-pink-600" size={14} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 5 Cards - Second Row */}

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {values.slice(1, 6).map((value, index) => {
            const slotIndex = index + 1;
            const slot = slotData[slotIndex];
            {
              /* console.log(slot, "slot") */
            }
            const isLastActive = slotIndex === lastActiveIndex;
            const circleClass =
              isLastActive && slot?.users === 2 ? "text-white" : "";

            return (
              <button
                key={slotIndex}
                onClick={() => {
                  if (slotIndex < slotData.length) {
                    navigate("/user-panel-dmatrix1", {
                      state: { slotNumber: slotIndex, u3Data: u3Data },
                    });
                  } else if (slotIndex == slotData.length) {
                    navigate("/user-panel-home/slot-activate", {
                      state: { ActivateSlot: Number(slotIndex + 1) },
                    });
                  }
                }}
                className="relative flex flex-col items-center"
              >
                <div className="absolute top-[-6px] rotate-[30deg] right-0">
                  {slotIndex == slotData.length ? (
                    <img src={cart} className="w-6" alt="" />
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className={`h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl cursor-pointer ${
                    slotIndex < slotData.length ? "bg-green-500" : ""
                  }`}
                >
                  ${value}
                </div>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-center gap-2">
                    {[...Array(4)].map((__, j) => (
                      <PiLineVerticalLight key={j} />
                    ))}
                  </div>
                ))}
                <div className="flex justify-center gap-2">
                  {[...Array(4)].map((_, j) => {
                    const isFilled = j < slot?.users; // Fill based on user count
                    return j == 2 ? (
                      <GiCircle
                        key={j}
                        className="rounded-full"
                        style={
                          isFilled
                            ? {
                                background:
                                  "linear-gradient(to bottom, white 50%, #ff66d9 50%)",
                              }
                            : { color: "gray" }
                        }
                      />
                    ) : (
                      <GiCircle
                        key={j}
                        className={
                          isFilled ? "bg-white rounded-2xl" : "text-gray-500"
                        }
                      />
                    );
                  })}
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <div>{slot?.users}</div>
                  <LuUsers />
                  <div>{slot?.cycles}</div>
                  <TfiReload className="text-pink-600 font-bold" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Remaining Cards - Third Row */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {values.slice(6).map((value, index) => {
            const slotIndex = index + 6;
            const slot = slotData[slotIndex];
            const isLastActive = slotIndex === lastActiveIndex;
            const circleClass =
              isLastActive && slot?.users === 2 ? "text-white" : "";

            return (
              <button
                key={slotIndex}
                onClick={() => {
                  if (slotIndex < slotData.length) {
                    navigate("/user-panel-dmatrix1", {
                      state: { slotNumber: slotIndex, u3Data: u3Data },
                    });
                  } else if (slotIndex == slotData.length) {
                    // navigate('/user-panel-home/slot-activate');

                    navigate("/user-panel-home/slot-activate", {
                      state: { ActivateSlot: Number(slotIndex + 1) },
                    });
                  }
                }}
                className="relative flex flex-col items-center"
              >
                <div className="absolute top-[-6px] rotate-[30deg] right-0">
                  {slotIndex == slotData.length ? (
                    <img src={cart} className="w-6" alt="" />
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className={`h-10 w-20 sm:w-24 md:w-28 lg:w-26 bg-[#DED8C8] rounded-xl flex justify-center items-center text-black text-lg sm:text-xl cursor-pointer ${
                    slotIndex < slotData.length ? "bg-green-500" : ""
                  }`}
                >
                  ${value}
                </div>

                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-center gap-2">
                    {[...Array(4)].map((__, j) => (
                      <PiLineVerticalLight key={j} />
                    ))}
                  </div>
                ))}

                <div className="flex justify-center gap-2">
                  {[...Array(4)].map((_, j) => {
                    const isFilled = j < slot?.users; // Fill based on user count
                    return j == 2 ? (
                      <GiCircle
                        key={j}
                        className="rounded-full"
                        style={
                          isFilled
                            ? {
                                background:
                                  "linear-gradient(to bottom, white 50%, #ff66d9 50%)",
                              }
                            : { color: "gray" }
                        }
                      />
                    ) : (
                      <GiCircle
                        key={j}
                        className={
                          isFilled ? "bg-white rounded-2xl" : "text-gray-500"
                        }
                      />
                    );
                  })}
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <div>{slot?.users}</div>
                  <LuUsers />
                  <div>{slot?.cycles}</div>
                  <TfiReload className="text-pink-600 font-bold" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {["U5", "U4", "U3 Premium"].map((name, idx) => {
        // Map each name to its unique URL
        const urlMap = {
          U5: "user-panel-umatrix5",
          U4: "user-panel-umatrix4",
          "U3 Premium": "user-panel-umatrix-3plus",
        };

        const MatrixName = {
          U5: "ENTER ",
          U4: "ENTER",
          "U3 Premium": "ENTER",
        };

        // Map each name to its unique value
        const idMap = {
          U5: MatrixInfo?.u5gen?.length ?? 0,
          U4: MatrixInfo?.u4gen?.length ?? 0,
          "U3 Premium": MatrixInfo?.u3genprem?.length ?? 0,
        };

        const EarnedRama = {
          U5: "2",
          U4: "6",
          "U3 Premium": "4",
        };

        return (
          <div
            key={idx}
            className="grid grid-cols-1 mt-10 bg-cyan-400/10
    flex
    items-center
    justify-center
    mx-auto
    border-cyan-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  border-2 rounded-2xl p-6 text-center"
            // style={{
            //     background:
            //         "linear-gradient(100deg, rgba(5, 53, 102, 1) 0%, rgba(169, 190, 10, 1) 100%)",
            // }}
          >
            <div>
              <span className="text-4xl md:text-5xl text-[#00d3f3] font-extrabold">
                Universe
              </span>{" "}
              <span className="text-2xl md:text-xl font-bold text-white">
                {name}{" "}
                {name == "U5" ? ">>>>>" : name == "U3 Premium" ? ">>>" : ">>>>"}
              </span>
              <br />
            </div>

            {/* Box for Dynamic Data */}

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-ehite text-center">
                Total Matrix Summary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Box */}
                {[
                  {
                    title: "Received",
                    usd: "$23",
                    rama:
                      MatrixInfo?.[name]?.RamaPrice
                        ?.totalReceivedAmountInRAMA || 0,
                  },
                  {
                    title: "Upgraded",
                    usd: "$23",
                    rama:
                      MatrixInfo?.[name]?.RamaPrice
                        ?.totalForwardedAmountInRAMA || 0,
                  },
                  {
                    title: "Generated",
                    usd: "$20",
                    rama:
                      MatrixInfo?.[name]?.RamaPrice
                        ?.totalRegenerationAmountInRAMA || 0,
                  },
                  {
                    title: "Net Profit",
                    usd: "$23",
                    rama: MatrixInfo?.[name]?.RamaPrice?.totalProfitInRAMA || 0,
                  },
                  {
                    title: "Generated ID's",
                    totalId: MatrixInfo?.[name]?.generatedId.length || 0,
                  },
                  { title: "view Matrix" },
                ].map((item, index) =>
                  item?.title !== "Generated ID's" &&
                  item?.title !== "view Matrix" ? (
                    <div
                      key={index}
                      style={
                        {
                          // background:
                          //     "linear-gradient(45deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                        }
                      }
                      className="p-5 rounded-2xl shadow hover:shadow-lg transition bg-cyan-400/10
    items-center
    justify-center
    border-cyan-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300 "
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <div className="text-[#00d3f3] space-y-1">
                        {/* <p><span className="font-medium">USD:</span> {item.usd}</p> */}
                        <p>
                          <span className="font-medium">Rama:</span> {item.rama}
                        </p>
                      </div>
                    </div>
                  ) : item?.title === "view Matrix" ? (
                    <Link
                      to={urlMap[name]}
                      key={index}
                      style={
                        {
                          // background:
                          //     "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                        }
                      }
                      className="p-5 items-center
    justify-center
    border-cyan-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  rounded-2xl shadow hover:shadow-lg transition"
                    >
                      {/* <h3 className=" border-1 w-fit m-auto px-2 py-1 bg-yellow-500 rounded border-yellow-600 text-md font-semibold text-white mb-2">{MatrixName[name]} </h3> */}

                      <div className="text-yellow-500 flex justify-center gap-4">
                        {/* <TbUniverse size={60} color='yellow' /> */}
                        <img
                          className="-rotate-270 w-5"
                          src={pointingFinger}
                          alt=""
                        />
                        <RamaLoader />
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={index}
                      style={
                        {
                          // background:
                          //     "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                        }
                      }
                      className="p-5 items-center
    justify-center
    border-cyan-400
    overflow-hidden
    backdrop-blur-md
    transition-all
    duration-300  rounded-2xl shadow hover:shadow-lg transition"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <div className="text-[#00d3f3]  space-y-1">
                        <p>
                          <span className="font-medium">Total ID :</span>{" "}
                          {item.totalId}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Box for Dynamic Data */}
          </div>
        );
      })}
    </div>
  );
};

export default RightUserPannel;
