import React from "react";
import universeLogo from "../assets/images/universeLogo.png";
import { RxCopy } from "react-icons/rx";
import { FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import { RiBitCoinLine } from "react-icons/ri";
import { CgArrowsVAlt } from "react-icons/cg";
import { GiCircle } from "react-icons/gi";

import { FaChevronDown} from "react-icons/fa6";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

export default function Team() {
  const values = [0.005, 0.001, 0.003, 0.003, 0.002, 0.004, 0.002];
  return (
    <div className="bg-black min-h-screen px-4">
      <div className="max-w-6xl  h-auto m-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center  mx-4 md:mx-10">
          <Link to="/">
            <img src={universeLogo} alt="Logo Image" className="h-20 md:h-[100px]" />
          </Link>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-xl text-white  md:mt-0">
            <div>Ramestta Foundation</div>
            <div>Official Channel</div>
            <div>Audit Report</div>
            <div className="flex gap-1 items-center "> 
                <div>Logout</div> <IoMdLogOut className="text-red-500"/>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-10 mx-4 md:mx-10 gap-10">
          {/* left part */}
          <div className="flex flex-col border-amber-300 border-2 rounded-2xl w-full lg:w-[500px] lg:h-[100vh] p-10 text-white text-center">
            <div className="flex justify-between items-center">
              <div className="text-6xl text-yellow-500">
                <RiBitCoinLine />
              </div>
              <div className="text-3xl font-bold">Id</div>
            </div>
            <div className="flex justify-center items-center  bg-yellow-500 w-full rounded-sm lg:w-[260px] mt-5 h-10">
              RAMA 0.000
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              0xf3585...6347733
            </div>

            <div className="flex justify-between text-yellow-500">
              <div>
                <FaExternalLinkAlt />
              </div>
              <div className="text-xl font-bold">
                <RxCopy />
              </div>
            </div>
            <div className="flex justify-center items-center  bg-yellow-500 w-full rounded-sm lg:w-[260px] mt-5 h-10">
              Ramestta Foundation
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              Not Quality
            </div>
            <div className="flex justify-center items-center  text-xl underline w-full rounded-xl lg:w-[250px] mt-2 h-10">
              Send Tether Usdt (BEP-20)
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              0xeD832...A497Def
            </div>
            <div className="flex justify-between  text-yellow-500">
              <div>
                <FaExternalLinkAlt />
              </div>
              <div className="text-xl font-bold">
                <RxCopy />
              </div>
            </div>
            <div className="flex justify-center items-center  bg-yellow-500 w-full rounded-sm lg:w-[260px] mt-5 h-10">
              G.F.D. Benefit
            </div>
            <div className="flex justify-center items-center  text-xl underline w-full rounded-xl lg:w-[250px] mt-2 h-10">
              Send 5 USDT (BEP-20)
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              0xeD832...A497Def
            </div>
            <div className="flex justify-between  text-yellow-500">
              <div>
                <FaExternalLinkAlt />
              </div>
              <div className="text-xl font-bold">
                <RxCopy />
              </div>
            </div>
            <div className="flex justify-center items-center  bg-yellow-500 w-full rounded-sm lg:w-[260px] mt-5 h-10">
              EVR Points
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              0
            </div>
            <div className="flex justify-center items-center  bg-yellow-500 w-full rounded-sm lg:w-[260px] mt-5 h-10">
              Victor Club
            </div>
            <div className="flex justify-center items-center   w-full rounded-xl lg:w-[250px] mt-2 h-10">
              Not Quality
            </div>
          </div>

          {/* Right Part */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-yellow-500 text-black p-4 text-center">
                <div>
                  <span className="text-lg md:text-2xl font-bold">
                    Partners Invites
                  </span>
                  <br />
                  <span>Income : 0000000.00 RAMA</span>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-yellow-500 text-black p-4 text-center">
                <div>
                  <span className="text-lg md:text-2xl font-bold">
                    Upline & Bonus
                  </span>
                  <br />
                  <span>Income : 0000000.00 RAMA</span>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-yellow-500 text-black p-4 text-center">
                <div>
                  <span className="text-lg md:text-2xl font-bold">
                    Slot Activated
                  </span>
                  <br />
                  <span>Income : 0000000.00 RAMA</span>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 w-full md:w-[320px] rounded-xl bg-yellow-500 text-black p-4 text-center">
                <div>
                  <span className="text-lg md:text-2xl font-bold">
                    Affiliated Link
                  </span>
                  <br />
                  <span>Click to Copy</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-10 border-amber-300 border-2 rounded-2xl p-6 text-center">
      <div className="mt-10">
       
        <span className="text-2xl md:text-3xl border-1 rounded-md px-10 py-2 font-bold">
          Upline ID : ##
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-10 p-4">
        <div className="flex flex-col justify-center items-center w-full"> 

          <div className="flex items-center justify-between w-full max-w-[400px]"> 
            <div className="text-4xl md:text-5xl"><FaChevronCircleLeft /></div>
            <div className="flex justify-center items-center h-16 md:h-20 w-[200px] md:w-[250px] bg-yellow-500 rounded-xl">
              <div className="text-lg text-black text-center">000.01</div>
            </div>
            <div className="text-4xl md:text-5xl"><FaChevronCircleRight /></div>
          </div>

          <div className="flex justify-center gap-6 md:gap-10">
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
          </div>
          <div className="flex justify-center gap-6 md:gap-10 mt-2">
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
          </div>
          <div className="flex justify-center gap-6 md:gap-10 mt-2">
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
            <div>
              <CgArrowsVAlt />
            </div>
          </div>
          <div className="flex justify-between w-full max-w-[400px] ">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl"><FaChevronUp /></div>
              <div>0</div>
            </div>

            <div className="flex justify-center gap-2 text-4xl md:text-5xl">
              <div>
                <GiCircle />
              </div>
              <div>
                <GiCircle />
              </div>
              <div>
                <GiCircle />
              </div>
              <div>
                <GiCircle />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-3xl"><FaChevronDown /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
                {/* table  */}
        <table>
            <tr className="flex justify-evenly gap-30 mt-10">
                <th>(3)</th>
                <th>Date</th>
                <th>Id</th>
                <th>Wallet</th>
                <th>Rama/USD</th>
            </tr>
            <tr className="flex justify-evenly gap-20 mt-2">
                <td><GiCircle /></td>
                <td>01/10/200</td>
                <td>001</td>
                <td>#ggggvd..gg</td>
                <td>30.21/2.50</td>
            </tr>
            <tr className="flex justify-evenly gap-20 mt-2">
                <td><GiCircle /></td>
                <td>01/10/200</td>
                <td>001</td>
                <td>#ggggvd..gg</td>
                <td>30.21/2.50</td>
            </tr>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
}

