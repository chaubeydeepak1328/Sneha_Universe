import React, { useEffect, useState } from "react";
import { useStore } from "../Store/UserStore";
import { useAppKitAccount } from "@reown/appkit/react";
import { ToastContainer, toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";

import "../App.css";
import { useTransaction } from "../config/register";
import TransactionModal from "./TransactionModal";
import { Spinner } from "../util/helpers";

const RightUserPannel1 = () => {

  // for Modal
  // ========================================================
  const [showModal, setShowModal] = useState(false);
  // =========================================================

  const [trxData, setTrxData] = useState();

  const [loading, setLoading] = useState(false)

  const { handleSendTx, hash } = useTransaction(trxData !== null && trxData);


  const [Referal, SetReferal] = useState('N/a');


  const GetFirstId = useStore((state) => state.GetFirstId)


  useEffect(() => {
    const fetchFirstId = async () => {
      const res = await GetFirstId();
      // console.log("==============================")
      // console.log(res)
      // console.log("==============================")

      SetReferal(res)
    }

    fetchFirstId();
  }, [])



  useEffect(() => {
    if (hash) {
      // console.log("Transaction hash:", hash);


      // trxHashInfo
      setMessage('Registration successful!');
      setLoading(false)

      setShowModal(true)
    }
  }, [hash])


  useEffect(() => {
    if (trxData) {
      try {
        handleSendTx(trxData);
      } catch (error) {
        setLoading(false)
        alert("somthing went Wrong")
      }

    }
  }, [trxData]);




  const { address, isConnected } = useAppKitAccount()
  const registerUser = useStore((state) => state.registerUser);
  const IsUserExist = useStore((state) => state.IsUserExist);
  const getCurrentRamaPrice = useStore((state) => state.getCurrentRamaPrice)
  const getBalance = useStore((state) => state.getBalance)


  const [walletBal, setWallBal] = useState();

  const [UserData, setUserData] = useState();

  useEffect(() => {
    // console.log("Address:", address);
    // console.log("Is Connected:", isConnected);

  }, [isConnected])

  const [sponsorAddress, setSponsorAddress] = useState('');

  const [isValidser, setIsValidser] = useState(false);
  const [message, setMessage] = useState('');

  const handleValidation = async () => {
    setLoading(true)

    const udtoRama = await getCurrentRamaPrice();
    // console.log("=======!::::", udtoRama);
    if (sponsorAddress.length !== 0) {

      const sponserExist = await IsUserExist(sponsorAddress);

      // console.log(`this is sponser-->`, sponserExist.isexist)

      // console.log(sponserExist)

      if (sponserExist.isexist) {

        const balance = await getBalance(address);
        setWallBal(balance)

        if (balance) {
          setUserData(sponserExist)

          if (parseFloat(sponserExist?.requireRama) > parseFloat(balance)) {
            setMessage("Insufficient fund")
          } else {
            setMessage(`✅Valid Sponser address! You can Conitnue for registration`);
            setLoading(false)
          }


        }


      } else {
        setLoading(false)
        setMessage("Invalid sponser Address");
        return;
      }


    } else {
      setLoading(false)
      setMessage('Please enter a valid address');
      return;
    }
    // Example validation logic
    // const isValid = sponsorAddress.length > 0; // Check if the address is not empty
    setIsValidser(true);
    setLoading(false)
  }

  const handleRegister = async () => {
    // Example registration logic
    setLoading(true)
    if (isValidser) {
      try {

        if (!isConnected) {
          alert("Please Connect Wallet First");
          setLoading(false)
          return;
        }
        if (!sponsorAddress) {
          alert("Please Provide Sponser Wallet Address");
          setLoading(false)
          return;
        }

        // console.log('Registering with address:', sponsorAddress);
        const trxResponse = await registerUser(sponsorAddress, address);
        // console.log("trxResponse", trxResponse)
        setTrxData(trxResponse);

        setIsValidser(false);
      } catch (error) {
        setLoading(false)
        setMessage(`Registration failed: ${error.message}`);
      }
    } else {
      setLoading(false)
      // console.log('Invalid address. Please enter a valid referral address.');
    }
  }




  const handlePast = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSponsorAddress(text);
      toast.success("Address copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error("Failed to paste from clipboard", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(Referal)
      .then(() =>
        toast.success("Referral address copied!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }))
      .catch(() => toast.error("Copy failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }





  // To close the modal from the TransactionModal:
  const handleCloseModal = () => {
    setShowModal(false);
  };


  // className = "w-full px-6 py-8 bg-white rounded-xl shadow-lg max-w-md mx-auto h-fit"
  return (
    <div
      className="relative 
  grid grid-cols-1 
  mt-10
  border-2 border-green-400
 text-cyan-400
  p-6
  text-center
  w-full
  px-6 py-8
  rounded-xl
  shadow-xl
  max-w-md
  mx-auto
  h-fit
  backdrop-blur-[8px]
  backdrop-brightness-110
  transition-all
  duration-300"

    >
      {showModal && (
        <div className="absolute">
          <TransactionModal className="text-cyan-400"
            isOpen={showModal}
            hash={hash}
            userWallet={address}
            sponsorWallet={sponsorAddress}
            closeModal={handleCloseModal} // Pass close function
          />
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Register Now
      </h2>

      <div className="space-y-4">
        <label
          htmlFor="walletAddress"
          className="block text-sm font-medium text-white"
        >
          Referral Address
        </label>

        <div
          className="relative
   "
        >
          <input
            type="text"
            id="walletAddress"
            value={sponsorAddress}
            disabled={isValidser}
            onChange={(e) => {
              setSponsorAddress(e.target.value);
              setMessage("");
            }}
            placeholder="Enter referral address"
            className="w-full h-13 px-4 py-2    
  
    mt-5
    
   
    flex
    items-center
    justify-center
    mx-auto
    border-2
    border-cyan-400
    overflow-hidden
    backdrop-blur-md
    shadow-cyan-400
    transition-all
    duration-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white pr-16 walletAddress"
          />

          {!isValidser ? (
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 border-1 rounded-xl bg-cyan-400  text-black cursor-pointer"
              onClick={handlePast}
            >
              paste
            </button>
          ) : (
            ""
          )}
        </div>

        {message ? (
          <p
            className={`text-sm p-2 ${message.startsWith("✅Valid Sponser address!") ||
              message.startsWith("Registration successful!")
              ? "text-green-400 bg-black"
              : "text-red-600 bg-black"
              }`}
          >
            {message}
          </p>
        ) : (
          ""
        )}

        <div className="w-full flex flex-col items-center justify-center gap-4 px-4 ">
          {(message && message.startsWith("✅Valid Sponser address!")) ||
            message.startsWith("Registration successful!") ? (
            <>
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-4 items-center justify-between bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out text-center sm:text-left">
                <h2 className="w-full sm:w-auto">
                  Required Rama:{" "}
                  <span className="font-bold">{UserData?.requireRama}</span>
                </h2>
                <h2 className="w-full sm:w-auto">
                  Available Rama:{" "}
                  <span className="font-bold">
                    {Number(walletBal).toFixed(2)}
                  </span>
                </h2>
              </div>

              <input
                type="text"
                value={UserData?.userId}
                disabled
                className="w-full max-w-sm px-4 py-3 text-center bg-white/10 text-white border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg placeholder:text-white/50 cursor-not-allowed transition duration-200"
                aria-label="User ID"
              />
            </>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-center text-sm font-medium text-white">
          <div className="flex flex-row  flex-wrap justify-content-center items-center">
            <p>Don't have Referal ? </p>
            <button
              className="p-2 bg-warning  cursor-pointer"
              onClick={handleCopy}
            >
              Copy Referral
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <p>
              {Referal.slice(1, 7)} .... {Referal.slice(-6)}
            </p>{" "}
            <FaRegCopy
              className="cursor-pointer text-[#00d3f3] "
              onClick={handleCopy}
            />
          </div>
        </div>

        {isValidser &&
          parseFloat(UserData?.requireRama) < parseFloat(walletBal) ? (
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
          >
            {loading ? <Spinner loading={loading} /> : "Register Now"}
          </button>
        ) : (
          <button
            onClick={handleValidation}
            className="w-full  border  mt-5 bg-cyan-400/10 h-10 flex border-cyan-400 items-center justify-center mx-auto overflow-hidden backdrop-blur-md text-white font-semibold py-2 rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer"
          >
            {loading ? <Spinner loading={loading} /> : "Validate Address"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RightUserPannel1;
