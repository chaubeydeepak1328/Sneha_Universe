import universeLogo from "../assets/images/universeLogo.png";
import { LuUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function ExpressLogin() {
  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20"
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
      }}>
      <div className="flex flex-col justify-start items-center  rounded-lg h-auto sm:min-h-[85vh] max-w-xl w-full m-auto py-10 px-5 sm:px-10 bg-gradient-to-b from-[#eceefa] via-[#096f72e8] to-[#096f72e8] shadow-lg">

        {/* Logo */}
        <Link to="/">
          <img
            src={universeLogo}
            alt="Logo"
            className="h-[120px] sm:h-[150px] object-contain"
          />
        </Link>

        {/* Heading */}
        <div className="text-center font-bold mt-5 text-white text-[clamp(1.5rem,3vw,2.5rem)]">
          The Entrance to the Office
        </div>

        {/* Subheading */}
        <div className="text-center text-[clamp(1rem,1.5vw,1.2rem)] mt-2">
          RAMA Wallet
        </div>

        {/* Authorization Button */}
        <div className="flex justify-center items-center bg-blue-500 text-[clamp(1rem,1.25vw,1.125rem)] font-semibold text-white w-full max-w-xs h-12 rounded-xl text-center my-5 py-2 cursor-pointer hover:bg-blue-600 transition"
          style={{
            background:
              "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
          }}>
          Authorization
        </div>

        {/* Prompt Text */}
        <div className="mt-5 mb-2 text-center text-[clamp(1.125rem,1.5vw,1.5rem)]">
          To View, enter the account ID
        </div>

        {/* Input */}
        <input
          className="border-2 border-blue-500 outline-none focus:outline-blue-500 p-2 rounded-md w-full max-w-[300px] text-center bg-gray-300 focus:ring-2 placeholder:text-gray-500"
          placeholder="Enter user ID"
        />

        {/* Viewing Button */}
        <Link
          to="/user-panel-home"
          className="flex justify-center items-center  text-[clamp(1rem,1.25vw,1.125rem)] font-semibold text-white w-full max-w-xs h-12 rounded-xl text-center mt-10 py-2 cursor-pointer hover:bg-blue-600 transition"
          style={{
            background:
              "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
          }}>
          Viewing
        </Link>

        {/* Join Info */}
        <div className="mt-10 sm:mt-5 ">

          <span className="text-sm sm:text-lg">Join if you are not yet with us:</span>
        </div>

        {/* Check Link */}
        <div className="text-white text-sm sm:text-lg cursor-pointer hover:underline mt-1 flex items-center gap-2 text-center">
          <LuUserRound className="text-xl sm:text-2xl" />
          <div>Check in Ramestta Smart Chain</div>
        </div>
      </div>

      {/* Telegram */}
      <div className="text-center mt-5 text-[clamp(0.8rem,1.2vw,1rem)] text-white px-4 break-words">
        Telegram channel: @evergreenworld2022
      </div>
    </div>
  );
}
