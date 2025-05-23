import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';
import Swal from 'sweetalert2';

// const Contract = {
//     "UserMang": "0x1F34dfCbaD8e3a502e28c8c98f4E48AD047dfb25",
//     "U3plus": "0xc07A43Ad7b68F56955D10C2AFf1dF88Fe5895A50",
//     "U5": "0x5Ec894603bbdC8Ed032B5fd6dE78132c44f8Ae92",
//     "PriceConv": "0x611F0dBf5169dfbaBbeE5830FA3Ea00DE8AeD7E5",
//     "UIncome": "0x1864249F46Fb8E59Dc51FE6cb197bcb66aCbf71C",
//     "U4": "0x83Cf1A072812d5417C5593B638dEdF8Bc5426Daa",
//     "U3prem": "0x56Fba3cFF3Cdd16607a80E6cb779784dFf0bE11a",
//     "contReg": "0xc6E55AC39b6135Af3bE66F5413C1DAe789EBF481",
// }

// const fetchContractAbi = async (contractName) => {
//     try {
//         const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${Contract[contractName]}`);
//         const data = await response.json();
//         console.log("Contract ABI:", data.abi); // Log the ABI to the console
//         console.log("Contract Address:", Contract[contractName]); // Log the contract address to the console
//         return {
//             abi: data.abi,
//             contractAddress: Contract[contractName]
//         };
//     } catch (error) {
//         console.error("Error fetching contract ABI:", error);
//         throw error;
//     }
// }




const Contract = {
    "UserMang": "0x0ad39396FF507a796D7cdDffC161cdEA9bc7F52D",
    "U3plus": "0xe3bAE2834085180c58CF3DfC0044a3fF2b27B171",
    "U5": "0xdC7d2466323E7D2D3cb7F35fF176b651ee891384",
    "PriceConv": "0x6178947474ca70A891AD9373cCb7754d9f89611c",
    "UIncome": "0x895A125730721bC8B9B1748ad57b91dc059b9593",
    "U4": "0x61a0eba8D1f899F006022101322fe2c031A65741",
    "U3prem": "0x680CdaA591AC7bc3d0C0a68c89ea40FbDE5E3696",
    "contReg": "0xc6E55AC39b6135Af3bE66F5413C1DAe789EBF481",
    "MatrixDataView": "0x5D070f0F680ED97145370D18321b6301d5e13D70",
}

const fetchContractAbi = async (contractName) => {
    try {
        const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${Contract[contractName]}`);
        const data = await response.json();
        console.log("proxy Address, contract Address", Contract[contractName], data?.implementations[0].address);

        const contractAdress = data?.implementations[0].address

        if (contractAdress) {
            const res = await fetch(`https://latest-backendapi.ramascan.com/api/v2/smart-contracts/${contractAdress}`);
            const data1 = await res.json();

            return {
                abi: data1.abi,
                contractAddress: Contract[contractName]
            };
        }

    } catch (error) {
        console.error("Error fetching contract ABI:", error);
        throw error;
    }
}




export const trxHashInfo = async () => {

    const hashVal = "0x2456943f6eccd2c4e1e903c825cf02ceaaf6dcfdb8e7b76e9529b77b7332e8c8"
    const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/transactions/${hashVal}`);
    const data = await response.json();
    console.log(data)

    return data.status;
}



const INFURA_URL = "https://blockchain2.ramestta.com"
const web3 = new Web3(INFURA_URL);






export const useStore = create((set, get) => ({


    // User Wallet Info

    // UserwalletAddress: '',
    // setUserWalletAddress: (address) => set({ UserwalletAddress: address }),




    // Smart Contract Data

    getBalance: async (walletAdd) => {
        try {
            if (!walletAdd) {
                throw new Error("Wallet address is required.");
            }

            const balanceWei = await web3.eth.getBalance(walletAdd);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

            return parseFloat(balanceEth).toFixed(4); // Optional: return balance with 4 decimal places
        } catch (error) {
            console.error("Failed to fetch balance:", error.message);
            return null; // Or throw error depending on use case
        }
    },


    getCurrentRamaPrice: async () => {
        try {


            const [priceConv, u3plus, u5] = await Promise.all([
                fetchContractAbi("PriceConv"),
                fetchContractAbi("U3plus"),
                fetchContractAbi("U5")
            ]);

            const contract1 = new web3.eth.Contract(priceConv.abi, priceConv.contractAddress);
            const contract2 = new web3.eth.Contract(u3plus.abi, u3plus.contractAddress);
            const contract3 = new web3.eth.Contract(u5.abi, u5.contractAddress);


            // U3 Transaction 


            // u5 Transaction

            const userAddress = await contract1.methods.usdToRama(20).call();

            console.log("Users:", userAddress);
            return userAddress.toString();
        } catch (error) {

        }
    },


    generatedId: async (address) => {
        try {
            const [U5, U4, U3prem] = await Promise.allSettled([
                fetchContractAbi("U5"),
                fetchContractAbi("U4"),
                fetchContractAbi("U3prem"),
            ]);

            const results = {};

            const convertValuesToEther = (weiObject) =>
                Object.fromEntries(
                    Object.entries(weiObject).map(([key, value]) => [
                        key,
                        web3.utils.fromWei(value, 'ether'),
                    ])
                );

            if (U5.status === "fulfilled") {
                try {
                    const contract1 = new web3.eth.Contract(U5.value.abi, U5.value.contractAddress);
                    const u5generated = await contract1.methods.getGeneratedMatrices(address).call();
                    const u5DataRama = await contract1.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U5"] = {
                        generatedId: u5generated,
                        RamaPrice: convertValuesToEther(u5DataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U5 data:", err.message);
                }
            }

            if (U4.status === "fulfilled") {
                try {
                    const contract2 = new web3.eth.Contract(U4.value.abi, U4.value.contractAddress);
                    const u4generated = await contract2.methods.getGeneratedMatrices(address).call();
                    const u4DataRama = await contract2.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U4"] = {
                        generatedId: u4generated,
                        RamaPrice: convertValuesToEther(u4DataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U4 data:", err.message);
                }
            }

            if (U3prem.status === "fulfilled") {
                try {
                    const contract3 = new web3.eth.Contract(U3prem.value.abi, U3prem.value.contractAddress);
                    const u3premgenerated = await contract3.methods.getGeneratedMatrices(address).call();
                    const u3PremDataRama = await contract3.methods.getTotalIncomeAcrossMatrices(address).call();

                    results["U3 Premium"] = {
                        generatedId: u3premgenerated,
                        RamaPrice: convertValuesToEther(u3PremDataRama),
                    };
                } catch (err) {
                    console.error("Error fetching U3 Premium data:", err.message);
                }
            }

            return results;

        } catch (error) {
            console.error("Unhandled error in generatedId:", error.message);
            return {}; // or throw error if you prefer
        }
    },


    homePannelInfo: async (address) => {
        try {

            const [U3Plus, UserMang] = await Promise.all([
                fetchContractAbi("U3plus"),
                fetchContractAbi("UserMang"),
            ]);

            const contract = new web3.eth.Contract(U3Plus.abi, U3Plus.contractAddress);

            const contract1 = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);


            const endSlot = await contract.methods.getLastUpgradedSlot(address).call();
            const slotLevel = Number(endSlot);
            console.log("slotlevel================", slotLevel)


            if (slotLevel) {
                const user = await contract1.methods.getUser(address).call();

                return {
                    InvitedPartner: user.directReferrals.length,
                    slotActivated: slotLevel
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Some Error Occured ${error.message}`);
            throw error;
        }

    },


    getAllusers: async (userId) => {
        try {
            const [UserMang, UIncome] = await Promise.all([
                fetchContractAbi("UserMang"),
                fetchContractAbi("UIncome"),
            ]);

            const contract = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);
            const contract1 = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);

            const userAddress = await contract.methods.allUsers(userId).call();
            const ramaAmount = await contract1.methods.requiredRAMAForRegistration().call();

            if (userAddress && ramaAmount) {
                const userInfo = await contract.methods.getUser(userAddress).call();

                if (userInfo) {
                    const sponserId = await contract.methods.getUserIDByAddress(userInfo.sponsor).call();

                    const data = {
                        userAddress: userAddress.toString(),
                        userId: userInfo.id.toString(),
                        sponserAdd: userInfo.sponsor.toString(),
                        sponserId: sponserId.toString(),
                        regTime: userInfo.registrationTime,
                        requireRama: web3.utils.fromWei(ramaAmount.toString(), "ether"),
                        directReferral: userInfo.directReferrals,
                    };

                    return data;
                } else {
                    throw new Error("User info not found.");
                }
            } else {
                throw new Error("User address or RAMA amount missing.");
            }
        } catch (error) {
            console.error("Error in getAllusers:", error);
            throw error; // remove alert; let the UI layer handle the error
        }
    },


    IsUserExist: async (walletAdd) => {
        try {
            // const walletAdd = "0x25fB86046a1ccfa490a21Dbb9BA08E2803a45B8b";
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }
            // const { abi, contractAddress } = await fetchContractAbi("UserMang");

            const [UserMang, UIncome] = await Promise.all([
                fetchContractAbi("UserMang"),
                fetchContractAbi("UIncome"),
            ]);

            const contract = new web3.eth.Contract(UserMang.abi, UserMang.contractAddress);

            const contract1 = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);

            const isExist = await contract.methods.isRegistered(walletAdd).call();

            console.log("is Users exist:", isExist, walletAdd);
            if (isExist) {

                const user = await contract.methods.getUser(walletAdd).call();
                console.log(user)
                if (user) {

                    const sponserId = await contract.methods.getUserIDByAddress(user.sponsor).call();




                    const ramaAmount = await contract1.methods.requiredRAMAForRegistration().call();

                    // const requireRama = Number(ramaAmount) / 1e18;
                    // const formattedRama = requireRama.toFixed(4);

                    return {
                        isexist: true,
                        walletAdd: walletAdd,
                        userId: user.id.toString(),
                        sponserId: sponserId.toString(),
                        requireRama: web3.utils.fromWei(ramaAmount.toString(), "ether"),
                        sponserAdd: user.sponsor,
                        regTime: user.registrationTime,
                        directReferral: user.directReferrals,
                    }
                }
            }
            return {
                isexist: false,
                walletAdd: walletAdd
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
            throw error;
        }
    },


    // registerUser: async (sponsorAddress, userAddress) => {
    //     try {



    //         console.log("sponsorAddress, userAddress", sponsorAddress, userAddress)
    //         const [UIncome, PriceConvs] = await Promise.all([
    //             fetchContractAbi("UIncome"),
    //             fetchContractAbi("PriceConv"),
    //         ]);

    //         const contract = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);
    //         const priceContract = new web3.eth.Contract(PriceConvs.abi, PriceConvs.contractAddress);

    //         console.log("====================", sponsorAddress, UIncome.contractAddress);

    //         // Check wallet balance (for debug/logging)
    //         const balanceWei = await web3.eth.getBalance(userAddress);
    //         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
    //         console.log("Wallet Balance in ETH:", balanceEth);

    //         // Get USD → RAMA value
    //         // const valueInUSD = 20 * 1e6; // 20 USD in micro USD
    //         // const ramaAmount = await priceContract.methods.usdToRama(valueInUSD).call();

    //         // console.log("value in RAMA is", parseFloat(ramaAmount) / parseFloat(1e18));




    //         const ramaAmount = await contract.methods.requiredRAMAForRegistration().call();

    //         console.log("value in RAMA is", ramaAmount);


    //         // Prepare transaction
    //         const trxData = contract.methods.register(sponsorAddress).encodeABI();




    //         const gasPrice = await web3.eth.getGasPrice();

    //         let gasLimit;
    //         try {
    //             gasLimit = await web3.eth.estimateGas({
    //                 from: userAddress,
    //                 to: UIncome.contractAddress,
    //                 value: BigInt(ramaAmount).toString(),
    //                 data: trxData,
    //             });
    //         } catch (error) {
    //             console.error("❌ Gas estimation failed:", error);
    //             alert("Gas estimation failed. Please check contract and inputs.");
    //             return;
    //         }

    //         // const gasCost = web3.utils.fromWei((gasLimit * gasPrice).toString(), "ether");

    //         const gasCost = web3.utils.fromWei(
    //             (BigInt(gasLimit) * BigInt(gasPrice)).toString(),
    //             "ether"
    //         );
    //         console.log("Estimated Gas:", gasLimit, UIncome.contractAddress);
    //         console.log("Estimated Gas Cost in ETH:", gasCost);



    //         const tx = {
    //             from: userAddress,
    //             to: UIncome.contractAddress,
    //             data: trxData,
    //             gas: gasLimit,
    //             gasPrice: gasPrice,
    //             value: BigInt(ramaAmount).toString(),
    //         };

    //         // web3.eth
    //         //     .sendTransaction(tx)
    //         //     .on("transactionHash", (hash) => {
    //         //         console.log("✅ Transaction Hash:", hash);
    //         //     })
    //         //     .on("receipt", (receipt) => {
    //         //         console.log("🎉 Transaction Receipt:", receipt);
    //         //         alert(`Transaction successful! Hash: ${receipt.transactionHash}`);
    //         //     })
    //         //     .on("error", (err) => {
    //         //         console.error("❌ Transaction failed:", err);
    //         //         alert(`Transaction failed: ${err.message}`);
    //         //     });


    //         return tx;

    //     } catch (error) {
    //         console.error("❌ Error in registerUser:", error);
    //         alert(`Transaction failed: ${error.message}`);
    //         throw error;
    //     }
    // },

    registerUser: async (sponsorAddress, userAddress) => {
        try {



            console.log("sponsorAddress, userAddress", sponsorAddress, userAddress)
            const [UIncome, PriceConvs] = await Promise.all([
                fetchContractAbi("UIncome"),
                fetchContractAbi("PriceConv"),
            ]);

            const contract = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);
            const priceContract = new web3.eth.Contract(PriceConvs.abi, PriceConvs.contractAddress);

            console.log("====================", sponsorAddress, UIncome.contractAddress);

            // Check wallet balance (for debug/logging)
            const balanceWei = await web3.eth.getBalance(userAddress);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            console.log("Wallet Balance in ETH:", balanceEth);

            // Get USD → RAMA value
            const valueInUSD = 20 * 1e6; // 20 USD in micro USD
            const ramaAmount = await priceContract.methods.usdToRama(valueInUSD).call();

            console.log("value in RAMA is", parseFloat(ramaAmount) / parseFloat(1e18));

            // const maybeWei = "20000000000000000";
            const inEth = web3.utils.fromWei(ramaAmount, 'ether');
            console.log("Converted to ETH:", inEth);


            // Prepare transaction
            const trxData = contract.methods.register(sponsorAddress).encodeABI();
            const gasPrice = await web3.eth.getGasPrice();

            let gasLimit;
            try {
                gasLimit = await web3.eth.estimateGas({
                    from: userAddress,
                    to: UIncome.contractAddress,
                    value: BigInt(ramaAmount),
                    data: trxData,
                });
            } catch (error) {
                console.error("❌ Gas estimation failed:", error);
                alert("Gas estimation failed. Please check contract and inputs.");
                return;
            }

            console.log("Estimated Gas:", gasLimit);
            const gasCost = web3.utils.fromWei((BigInt(gasLimit) * BigInt(gasPrice)).toString(), "ether");
            console.log("Estimated Gas Cost in ETH:", gasCost);


            const tx = {
                from: userAddress,
                to: UIncome.contractAddress,
                data: trxData,
                gas: gasLimit,
                gasPrice: gasPrice,
                value: ramaAmount,
            };

            // Send transaction
            // web3.eth
            //     .sendTransaction(tx)
            //     .on("transactionHash", (hash) => {
            //         console.log("✅ Transaction Hash:", hash);
            //     })
            //     .on("receipt", (receipt) => {
            //         console.log("🎉 Transaction Receipt:", receipt);
            //         alert(`Transaction successful! Hash: ${receipt.transactionHash}`);
            //     })
            //     .on("error", (err) => {
            //         console.error("❌ Transaction failed:", err);
            //         alert(`Transaction failed: ${err.message}`);
            //     });

            return tx;

        } catch (error) {
            console.error("❌ Error in registerUser:", error);
            alert(`Transaction failed: ${error.message}`);
            throw error;
        }
    },

    // getU3Plus: async (walletAdd) => {

    //     // const dummyData = [
    //     //     { slotNo: 1,  lastUser:2  ,cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
    //     //     { slotNo: 2,  lastUser3  ,cycles: [[1, 1, 1, 1]] },
    //     //     { slotNo: 3,  lastUser:2  ,cycles: [[1, 1, 1, 0]] },
    //     //     { slotNo: 4,  lastUser:1  ,cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
    //     //     { slotNo: 5,  lastUser:2 ,cycles: [[1, 0, 0, 0]] },
    //     //     { slotNo: 6,  lastUser:2 ,cycles: [[1, 1, 0, 0]] },
    //     //     { slotNo: 7,  lastUser:2, cycles: [[1, 1, 1, 0]] },
    //     //     { slotNo: 8,  lastUser:2, cycles: [[0, 0, 0, 0]] },
    //     //     { slotNo: 9,  lastUser:1, cycles: [[0, 0, 0, 0]] },
    //     //     { slotNo: 10, lastUser:3  ,cycles: [[0, 0, 0, 0]] },
    //     // ];
    //     try {
    //         if (!walletAdd) {
    //             throw new Error("Invalid wallet address");
    //         }

    //         const [u3plus, MatrixDataView] = await Promise.all([
    //             fetchContractAbi("U3plus"),
    //             fetchContractAbi("MatrixDataView"),
    //         ]);

    //         const contract = new web3.eth.Contract(u3plus.abi, u3plus.contractAddress);
    //         const contract1 = new web3.eth.Contract(MatrixDataView.abi, MatrixDataView.contractAddress);

    //         // Activated slot
    //         // const endSlot = await contract.methods.getLastUpgradedSlot(walletAdd).call();


    //         // const lastSloat = endSlot.toString()
    //         // console.log("lastSloat", lastSloat)


    //         // const slotInfoArray = [];

    //         // if (lastSloat) {


    //         //     for (let i = 1; i <= Number(lastSloat); i++) {
    //         //         const activeCycle = await contract.methods.getSlotInfo(walletAdd, i).call();

    //         //         console.log("current cycle info-->", activeCycle)

    //         //         const cycles = activeCycle.currentCycle.toString();
    //         //         // console.log("curCycle", cycles);


    //         //         if (!cycles || !activeCycle.currentCycle) {
    //         //             console.warn(`Invalid cycle data at level ${i}`, slot);
    //         //             slotInfoArray.push({ users: 0, cycles: 0 });
    //         //             continue;
    //         //         }

    //         //         console.log(walletAdd, i, cycles)

    //         //         // Old Code========================================================================

    //         //         // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
    //         //         // const positionInfo = await contract.methods.getAllPositionMembers(walletAdd, i, cycles).call();

    //         //         // // console.log("positionInfo", positionInfo)
    //         //         // const zeroAddress = "0x0000000000000000000000000000000000000000";
    //         //         // const usersArray = [0, 1, 2, 3].map(index => positionInfo[index] !== zeroAddress ? 1 : 0);
    //         //         // const users = usersArray.reduce((sum, val) => sum + val, 0);

    //         //         // New Code========================================================================

    //         //         const positionInfo = await contract.methods.getCycleCurrentPosition(walletAdd, i, cycles).call();

    //         //         const users = Number(positionInfo) - 1;

    //         //         slotInfoArray.push({ users, cycles: cycles });
    //         //     }


    //         //     console.log("u3Plus Dashbpard+++++++++++++++++++++++++", lastSloat, slotInfoArray)



    //         //     return {
    //         //         lastSlot: lastSloat,
    //         //         slotinfo: slotInfoArray,
    //         //     };
    //         // }



    //         const slotInfoArray = [];

    //         const u3plusSlot = await contract1.methods.getActiveSlots(walletAdd).call();

    //         for (let i = 0; i < u3plusSlot.length; i++) {
    //             const slotNo = i + 1;
    //             cycles =                 
    //         }


    //         const structureData = u3plusSlot.map((curElm, index) => {
    //             return (
    //                 { slotNo: index + 1, lastUser: 2, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
    //             )
    //         })



    //         console.log("Slots data --------------->", u3plusSlot)



    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(`Error checking user: ${error.message}`);
    //     }
    // },

    getU3Plus: async (walletAdd) => {
        try {
            if (!walletAdd || walletAdd.length !== 42) {
                throw new Error("Invalid wallet address");
            }

            // Load both ABIs and contract addresses
            const matrixDataView = await fetchContractAbi("MatrixDataView");

            const matrixContract = new web3.eth.Contract(
                matrixDataView.abi,
                matrixDataView.contractAddress
            );

            // Call smart contract method to get all slot data
            const slotDataList = await matrixContract.methods.getActiveSlots(walletAdd).call();

            // Transform raw blockchain data into structured format
            const transformed = slotDataList.map((slot) => {
                const slotNo = Number(slot.slotNo);
                const currentCycle = Number(slot.currentCycle);

                const cycles = slot.cycles
                    .filter((cycle) => Number(cycle.cycleID) <= currentCycle)
                    .map((cycle) => {
                        const filledArray = (cycle.positions || []).map((pos) =>
                            pos.positionFilledBy !== "0x0000000000000000000000000000000000000000" ? 1 : 0
                        );
                        while (filledArray.length < 4) filledArray.push(0); // Normalize to 4 positions
                        return filledArray;
                    });

                const lastCycle = cycles[cycles.length - 1] || [];
                const lastUser = lastCycle.filter((x) => x === 1).length;

                return {
                    slotNo,
                    lastUser,
                    cycles,
                };
            });

            console.log("🔍 Transformed U3Plus Data:", transformed);
            return transformed;
        } catch (err) {
            console.error("❌ Error in getU3Plus:", err.message);
            return [];
        }
    },




    // getU3PlusInfo: async (address) => {
    //     try {

    //         // const dummyData = [
    //         //     { slotNo: 1, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 0]] },
    //         //     { slotNo: 2, cycles: [[1, 1, 1, 1]] },
    //         //     { slotNo: 3, cycles: [[1, 1, 1, 0]] },
    //         //     { slotNo: 4, cycles: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 0, 0]] },
    //         //     { slotNo: 5, cycles: [[1, 0, 0, 0]] },
    //         //     { slotNo: 6, cycles: [[1, 1, 0, 0]] },
    //         //     { slotNo: 7, cycles: [[1, 1, 1, 0]] },
    //         //     { slotNo: 8, cycles: [[0, 0, 0, 0]] },
    //         //     { slotNo: 9, cycles: [[0, 0, 0, 0]] },
    //         //     { slotNo: 10, cycles: [[0, 0, 0, 0]] },
    //         // ];


    //         // const { abi, contractAddress } = await fetchContractAbi("UserMang");
    //         // const contract = new web3.eth.Contract(abi, contractAddress);

    //         // // Activated slot
    //         // const lastSloat = await contract.methods.getUsersSlotLevel(walletAdd).call();

    //         // const slotInfoArray = [];

    //         // if (lastSloat) {

    //         //     for (let i = 1; i <= Number(lastSloat); i++) {
    //         //         const slot = await contract.methods.getUserSlot(walletAdd, 0, i).call();

    //         //         if (!slot || !slot.positions) {
    //         //             console.warn(`Invalid slot data at level ${i}`, slot);
    //         //             slotInfoArray.push({ users: 0, cycles: 0 });
    //         //             continue;
    //         //         }

    //         //         // wallet address ,same matrix,slotLeve/current slot  current cycle for each slot
    //         //         const currentCycle = await contract.methods.getCurrentCycle(walletAdd, 0, i).call();

    //         //         const zeroAddress = "0x0000000000000000000000000000000000000000";
    //         //         const totalPositions = slot.positions.filter(addr => addr !== zeroAddress).length;
    //         //         const cycles = (parseInt(currentCycle) - 1)
    //         //         const users = totalPositions % 4;

    //         //         slotInfoArray.push({ users, cycles });
    //         //     }


    //         //     return {
    //         //         lastSlot: lastSloat,
    //         //         slotinfo: slotInfoArray,
    //         //     };
    //         // }



    //         // const tx = await web3.eth.getTransaction()


    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(`Error checking user: ${error.message}`);
    //     }
    // },

    // getU5info: async (address) => {
    //     try {
    //         const { abi, contractAddress } = await fetchContractAbi("U5");
    //         const contract = new web3.eth.Contract(abi, contractAddress);

    //         const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

    //         const slotIndex = 5; // slots 0 to 4
    //         const values = ["$10", "$30", "$90", "$270", "$810"];

    //         const result = [];

    //         for (let i = 0; i < genMatrices.length; i++) {
    //             const matrixId = parseInt(genMatrices[i]);
    //             const slotsPosition = [];

    //             for (let j = 0; j < slotIndex; j++) {
    //                 const slotPositions = await contract.methods.getU5MatrixPositions(matrixId, j).call();
    //                 const filledSlots = slotPositions.isFilledPositions.map(pos => (pos === true ? "1" : pos === false ? "0" : ""));
    //                 slotsPosition.push(filledSlots);
    //             }

    //             result.push({
    //                 id: matrixId,
    //                 values: values,
    //                 slotsPosition: slotsPosition
    //             });
    //         }

    //         console.log("Slot Data Matrix (U5):", result);
    //         return result;

    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(`Error checking: ${error.message}`);
    //     }
    // },

    getU5info: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U5");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            const slotIndex = 5;
            const values = ["$10", "$30", "$90", "$270", "$810"];

            const result = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);

                    // Prepare parallel calls for all 5 slots for current matrixId
                    const slotPromises = Array.from({ length: slotIndex }, (_, j) =>
                        contract.methods.getU5MatrixPositions(matrixId, j).call()
                    );

                    const slotResults = await Promise.all(slotPromises);

                    const slotsPosition = slotResults.map(slotPositions =>
                        slotPositions.isFilledPositions.map(pos => (pos === true ? "1" : pos === false ? "0" : ""))
                    );

                    return {
                        id: matrixId,
                        values: values,
                        slotsPosition: slotsPosition
                    };
                })
            );

            console.log("Slot Data Matrix (U5):", result);
            return result;

        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking: ${error.message}`);
        }
    },

    getU5Boxinfo: async (address, matrixID) => {

        const { abi, contractAddress } = await fetchContractAbi("U5");
        const contract = new web3.eth.Contract(abi, contractAddress);

        const info = await contract.methods.userMatrices(address, matrixID).call();


        if (info) {

            const slotCount = 5;
            const posCount = 6;

            let totalChunks = 0;


            for (let i = 0; i <= slotCount; i++) {

                for (let j = i; j <= posCount; i++) {


                    const chunkcount = await contract.methods.getchunksCount(matrixID, i, j).call();

                    totalChunks += chunkcount;

                }
            }

            return totalChunks;


        }

    },


    getFilteredLogs: async () => {
        try {
            const response = await fetch(`https://latest-backendapi.ramascan.com/api/v2/addresses/${Contract["U5"]}/logs`);
            const data = await response.json();

            const res = data.items
                .filter(val =>
                    val.decoded &&
                    val.decoded.method_call &&
                    val.decoded.method_call.startsWith("SlotPaymentReceived")
                )
                .map(val => {
                    const paramObj = {};
                    val.decoded.parameters.forEach(param => {
                        paramObj[param.name] = param.value;
                    });
                    return paramObj;
                });

            console.log("getFilteredLogs", res);
            return res;
        } catch (error) {
            console.error("Error fetching or processing data:", error);
            return [];
        }
    },



    getU3Details: async (walletAdd) => {
        try {
            if (!walletAdd) {
                throw new Error("Invalid wallet address");
            }

            const { abi, contractAddress } = await fetchContractAbi("U3plus");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const endSlot = await contract.methods.getLastUpgradedSlot(walletAdd).call();
            const lastSlot = Number(endSlot);

            const zeroAddress = "0x0000000000000000000000000000000000000000";
            const slotInfoArray = [];

            for (let slotNo = 1; slotNo <= lastSlot; slotNo++) {
                const activeSlot = await contract.methods.getSlotInfo(walletAdd, slotNo).call();
                const currentCycle = Number(activeSlot.currentCycle);

                const allCycles = [];

                for (let cycle = 1; cycle <= currentCycle; cycle++) {
                    const positionInfo = await contract.methods.getAllPositionMembers(walletAdd, slotNo, cycle).call();

                    const cycleArray = [0, 1, 2, 3].map(index =>
                        positionInfo[index] && positionInfo[index] !== zeroAddress ? 1 : 0
                    );

                    allCycles.push(cycleArray);
                }

                slotInfoArray.push({
                    slotNo,
                    cycles: allCycles.length > 0 ? allCycles : [[0, 0, 0, 0]],
                });
            }

            // Ensure 10 slots minimum
            for (let i = lastSlot + 1; i <= 10; i++) {
                slotInfoArray.push({
                    slotNo: i,
                    cycles: [[0, 0, 0, 0]],
                });
            }

            return slotInfoArray;
        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking user: ${error.message}`);
        }
    },





    getU5table: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U5");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: web3.utils.fromWei(tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(), "ether"),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },


    getU4info: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U4");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            if (!Array.isArray(genMatrices) || genMatrices.length === 0) {
                console.log("No matrix found for this address");
                return [];
            }

            const values = [
                "$40", "$80", "$160", "$320", "$640",
                "$1280", "$2560", "$5120", "$10240", "$20480"
            ];

            // Process all matrix IDs concurrently with Promise.all
            const matrices = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);
                    if (isNaN(matrixId)) return null;

                    try {
                        const slotCalls = [...Array(values.length)].map((_, index) =>
                            contract.methods.getU5MatrixPositions(matrixId, index + 1).call()
                        );

                        const slotResults = await Promise.all(slotCalls);

                        const slotsPosition = slotResults.map(result => {
                            const filled = result?.isFilledPositions || [];
                            return filled.map(pos => (pos ? "1" : "0"));
                        });

                        return {
                            id: matrixId,
                            values,
                            slotsPosition,
                        };
                    } catch (err) {
                        console.warn(`Error processing matrix ID ${matrixId}:`, err.message);
                        return null;
                    }
                })
            );

            const filtered = matrices.filter(Boolean);
            console.log("Optimized U4 matrix data:", filtered);
            return filtered;
        } catch (err) {
            console.error("getU4info error:", err.message);
            alert(`Error checking: ${err.message}`);
            return [];
        }
    },



    getU3premInfo: async (address) => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("U3prem");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            console.log("matrix U4 data--->", genMatrices)


            const slotIndex = 5;
            const values = ["$640", "$1280", "$2560", "$5120", "$10240"];

            const result = await Promise.all(
                genMatrices.map(async (matrixIdStr) => {
                    const matrixId = parseInt(matrixIdStr);

                    // Prepare parallel calls for all 10 slots for current matrixId
                    const slotPromises = Array.from({ length: slotIndex }, (_, j) =>
                        contract.methods.getU5MatrixPositions(matrixId, j + 1).call()
                    );

                    const slotResults = await Promise.all(slotPromises);

                    const slotsPosition = slotResults.map(slotPositions =>
                        slotPositions.isFilledPositions.slice(0, -1).map(pos => (pos === true ? "1" : pos === false ? "0" : ""))
                    );

                    return {
                        id: matrixId,
                        values: values,
                        slotsPosition: slotsPosition
                    };
                })
            );

            console.log("Slot Data Matrix ******************(U3Prem)***************:", result);
            return result;

        } catch (error) {
            console.error("Error:", error);
            alert(`Error checking: ${error.message}`);
        }
    },


    getU4table: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U4");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: web3.utils.fromWei(tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(), "ether"),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },



    getU3Premtable: async (matrixId, slotIndex, selectedPos) => {

        console.log("matrixId, slotIndex, selectedPos", matrixId, slotIndex, selectedPos)
        try {
            if (matrixId == null || slotIndex == null || selectedPos == null) {
                let missingParam = !matrixId
                    ? "matrix id"
                    : !slotIndex
                        ? "slot index"
                        : "position index";
                throw new Error(`Please provide ${missingParam}`);
            }

            const { abi, contractAddress } = await fetchContractAbi("U3prem");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const tableData = await contract.methods
                .getAllChunksForPosition(matrixId, slotIndex, selectedPos).call();

            const trx = (tableData?.initiatedFrom || []).map((_, i) => ({
                initiatedFrom: tableData.initiatedFrom[i].toString(),
                forwardedFrom: tableData.forwardedFrom[i].toString(),
                forwardedTo: tableData.forwardedTo[i].toString(),
                receivedAmountInRAMA: web3.utils.fromWei(tableData.receivedAmountInRAMA[i].toString(), 'ether'),
                totalAmountAccountedForRegenerationInRAMA: web3.utils.fromWei(tableData.totalAmountAccountedForRegenerationInRAMA[i].toString(), "ether"),
                totalAmountForwardedForSlotUpgradeInRAMA: web3.utils.fromWei(tableData.totalAmountForwardedForSlotUpgradeInRAMA[i].toString(), 'ether'),
                totalProfitInRAMA: web3.utils.fromWei(tableData.totalProfitInRAMA[i].toString(), 'ether'),
                receivedDate: tableData.receivedDate[i].toString(),
            }));

            console.log("Fetched Transactions:", trx);
            return trx;
        } catch (error) {
            console.error("Error in getU5table:", error.message || error);
            return [];
        }
    },

    // ===========================================================================================================================
    // Filtering the Data on the basis of log 
    // ===========================================================================================================================


    fetchU3MatrixLogs: async (Waladdress) => {

        try {
            const { abi, contractAddress } = await fetchContractAbi("U3plus");


            const TOPIC0 = "0xb33790cd3098de54cda8ce6c69264da35751cc71987bfe44c41eaf84bcb239c2";
            // const TOPIC3 = "0x" + Waladdress.toLowerCase().replace("0x", "").padStart(64, "0");


            const topicEncodedAddress = "0x" + Waladdress.toLowerCase().replace("0x", "").padStart(64, "0");



            // if user is receiver 
            const [logsByInitiator, logsByReceiver] = await Promise.all([
                web3.eth.getPastLogs({
                    fromBlock: 0,
                    toBlock: "latest",
                    address: contractAddress,
                    topics: [TOPIC0, topicEncodedAddress] // Topic1 = initiatedFrom
                }),
                web3.eth.getPastLogs({
                    fromBlock: 0,
                    toBlock: "latest",
                    address: contractAddress,
                    topics: [TOPIC0, undefined, undefined, topicEncodedAddress] // Topic3 = finalReceiver
                })
            ]);



            console.log("🔍 Unfiltered logs:", logsByReceiver);



            const allLogs = logsByReceiver;

            // Deduplicate logs by transactionHash
            const uniqueLogsMap = new Map();
            allLogs.forEach(log => uniqueLogsMap.set(log.transactionHash, log));
            const uniqueLogs = Array.from(uniqueLogsMap.values());

            // Decode
            const eventAbi = abi.find(e => e.name === "PositionCompleted" && e.type === "event");


            // identify the payment type:
            const Purpose = ["MatrixGeneration", "Split", "Reinvest", "Credit"]

            const PaymentType = ["Direct", "Reinvest", "Bounce"]


            const decoded = await Promise.all(
                uniqueLogs.map(async (log) => {
                    const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1));
                    const block = await web3.eth.getBlock(log.blockNumber);



                    return {
                        initiatedFrom: decodedLog.slotOwner,
                        forwardedFrom: decodedLog.slotFilledBy,
                        finalReceiver: decodedLog.finalReceiver,
                        slotLevel: decodedLog.slotLevel,
                        positionIndex: decodedLog.positionFilled,
                        cycleNo: decodedLog.cycleNumber,
                        // timestamp: decodedLog.timestamp,

                        purpose: Purpose[decodedLog.purpose],
                        paymentType: PaymentType[decodedLog.paymentType],
                        totalReceivedAmount: web3.utils.fromWei(decodedLog.totalReceivedAmount.toString(), "ether"),
                        amountDebitedForPurpose: decodedLog.purpose == 3 ? 0 : web3.utils.fromWei(decodedLog.amountDebitedForPurpose.toString(), "ether"),
                        netProfit: web3.utils.fromWei(decodedLog.netProfit.toString(), "ether"),



                        // amountInUSD: decodedLog.amountInUSD,
                        // amountInRAMA: web3.utils.fromWei(decodedLog.amountInRAMA.toString(), "ether"),
                        txHash: log.transactionHash,
                        blockNumber: log.blockNumber,
                        // timestamp: Number(block.timestamp),
                        formattedDate: new Date(Number(block.timestamp) * 1000).toLocaleString(),
                    };
                })
            );




            console.log("✅ Logs fetched:",);

            return decoded
        } catch (err) {
            console.error("❌ Error fetching U3 logs:", err.message);
        }
    },

    // ===========================================================================================================================
    // Filtering the Data on the basis of log 
    // ===========================================================================================================================

    activateSlotU3: async (Waladdress, SlotNo) => {
        try {
            console.log("🟢 Activating U3 Slot:", { Waladdress, SlotNo });

            // Basic input validation
            if (!web3.utils.isAddress(Waladdress)) {
                throw new Error("Invalid wallet address provided.");
            }

            if (typeof SlotNo !== 'number' || SlotNo <= 0) {
                throw new Error("Slot number must be a positive integer.");
            }

            // Load contract ABI and address
            const UIncome = await fetchContractAbi("UIncome");
            if (!UIncome?.abi || !UIncome?.contractAddress) {
                throw new Error("Contract ABI or address not found for UIncome.");
            }

            const contract = new web3.eth.Contract(UIncome.abi, UIncome.contractAddress);

            // requiredAmount to Activate slot 

            const ramaAmount = await contract.methods.requiredRAMAForSlotUpgrade(SlotNo).call();
            console.log(ramaAmount);
            if (ramaAmount) {
                // const formatedAmt = web3.utils.fromWei(ramarequired,"ether")

                // Prepare value and transaction data
                // const ramaAmount = web3.utils.toWei('0.04', 'ether'); // Convert to wei (string)
                const trxData = contract.methods.buyU3plusSlot(SlotNo).encodeABI();

                // Get gas price
                const gasPrice = await web3.eth.getGasPrice();

                // Estimate gas limit
                let gasLimit;
                try {
                    gasLimit = await web3.eth.estimateGas({
                        from: Waladdress,
                        to: UIncome.contractAddress,
                        value: BigInt(ramaAmount).toString(),
                        data: trxData,
                    });
                } catch (estimateErr) {
                    console.error("❌ Gas estimation failed:", estimateErr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gas Estimation Failed',
                        text: 'Please check wallet balance and slot eligibility.',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                    return null;
                }

                console.log("📦 Transaction Details:");
                console.log("Gas Limit:", gasLimit);
                console.log("Gas Price (wei):", gasPrice);
                const gasCostEth = web3.utils.fromWei(
                    (BigInt(gasLimit) * BigInt(gasPrice)).toString(),
                    'ether'
                );
                console.log("Estimated Gas Cost in ETH:", gasCostEth);

                // Build transaction object
                const tx = {
                    from: Waladdress,
                    to: UIncome.contractAddress,
                    data: trxData,
                    gas: gasLimit,
                    gasPrice: gasPrice,
                    value: BigInt(ramaAmount).toString(),
                };

                return tx;

            }
        } catch (err) {
            console.error("🚨 Failed to prepare slot activation transaction:", err);
            alert(`Error: ${err.message}`);
            return null;
        }
    },


    getU5MartixInfo: async (address) => {
        try {
            console.log("---------------->", address);
            const { abi, contractAddress } = await fetchContractAbi("U5");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            // Parallel fetch all matrix details
            const data = await Promise.all(
                genMatrices.map(async (matrixID) => {
                    const res = await contract.methods.getMatrixDetails(matrixID).call();


                    const u5MatrixDetail = {
                        "Received": 0,
                        "Upgraded": 0,
                        "Generated": web3.utils.fromWei(res?.totalRegenerationAmount.toString(), "ether"),
                        "NetProfit": web3.utils.fromWei(res?.totalProfit.toString(), "ether"),
                        "GeneratedID": res?.totalRegeneratedMatrices.toString()
                    }


                    console.log("getU5MartixInfo", u5MatrixDetail)


                    return {
                        matrixID,
                        u5MatrixDetail,
                    };
                })
            );

            console.log("data", data);
            return data;

        } catch (error) {
            console.error("Error in getU5MartixInfo:", error);
            return [];
        }
    },



    getPartnerTable: async (address) => {
        try {
            console.log("---------------->", address);
            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const User = await contract.methods.getUser(address).call();

            const directReferralArray = User.directReferrals;



        } catch (error) {
            console.error("Error Message:", error);
            return [];
        }
    },


    ramaPriceInUsD: async () => {
        try {

            const { abi, contractAddress } = await fetchContractAbi("PriceConv");
            const contract = new web3.eth.Contract(abi, contractAddress);


            // Rama Price In Usd ((getting the static value form the method))
            const priceInUSD = await contract.methods.getReadableRamaPrice().call();

            console.log("----------------> priceInUSD", priceInUSD);

            return priceInUSD.dollars;

        } catch (error) {
            console.error("Error Message:", error);
        }
    },



    getU4MartixInfo: async (address) => {
        try {
            console.log("---------------->", address);
            const { abi, contractAddress } = await fetchContractAbi("U4");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            // Parallel fetch all matrix details
            const data = await Promise.all(
                genMatrices.map(async (matrixID) => {
                    const res = await contract.methods.getMatrixDetails(matrixID).call();


                    const u5MatrixDetail = {
                        "Received": 0,
                        "Upgraded": 0,
                        "Generated": web3.utils.fromWei(res?.totalRegenerationAmount.toString(), "ether"),
                        "NetProfit": web3.utils.fromWei(res?.totalProfit.toString(), "ether"),
                        "GeneratedID": res?.totalRegeneratedMatrices.toString()
                    }


                    console.log("getU5MartixInfo", u5MatrixDetail)


                    return {
                        matrixID,
                        u5MatrixDetail,
                    };
                })
            );

            console.log("data", data);
            return data;

        } catch (error) {
            console.error("Error in getU5MartixInfo:", error);
            return [];
        }
    },

    getU3PremMartixInfo: async (address) => {
        try {
            console.log("---------------->", address);
            const { abi, contractAddress } = await fetchContractAbi("U3prem");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const genMatrices = await contract.methods.getGeneratedMatrices(address).call();

            // Parallel fetch all matrix details
            const data = await Promise.all(
                genMatrices.map(async (matrixID) => {
                    const res = await contract.methods.getMatrixDetails(matrixID).call();


                    const u5MatrixDetail = {
                        "Received": 0,
                        "Upgraded": 0,
                        "Generated": web3.utils.fromWei(res?.totalRegenerationAmount.toString(), "ether"),
                        "NetProfit": web3.utils.fromWei(res?.totalProfit.toString(), "ether"),
                        "GeneratedID": res?.totalRegeneratedMatrices.toString()
                    }


                    console.log("getU5MartixInfo", u5MatrixDetail)


                    return {
                        matrixID,
                        u5MatrixDetail,
                    };
                })
            );

            console.log("data", data);
            return data;

        } catch (error) {
            console.error("Error in getU5MartixInfo:", error);
            return [];
        }
    },



    LeftUserPanInfo: async (address) => {
        try {
            console.log("Fetching earnings for address:", address);

            const [PriceConv, MatrixDataView] = await Promise.all([
                fetchContractAbi("PriceConv"),
                fetchContractAbi("MatrixDataView")
            ]);

            const priceConvContract = new web3.eth.Contract(PriceConv.abi, PriceConv.contractAddress);
            const matrixDataViewContract = new web3.eth.Contract(MatrixDataView.abi, MatrixDataView.contractAddress);

            // Get price in USD object
            const priceInUSDObject = await priceConvContract.methods.getReadableRamaPrice().call();
            const priceInUSDFloat = parseFloat(priceInUSDObject.dollars); // Already readable

            // Get earnings
            const res = await matrixDataViewContract.methods.getTotalMatrixEarnings(address).call();

            // Convert all earnings from wei to ether
            const grandEarningEther = web3.utils.fromWei(res.grandTotal, 'ether');
            const totalU3PlusEther = web3.utils.fromWei(res.totalU3Plus, 'ether');
            const totalU4Ether = web3.utils.fromWei(res.totalU4, 'ether');
            const totalU5Ether = web3.utils.fromWei(res.totalU5, 'ether');
            const totalU3PremiumEther = web3.utils.fromWei(res.totalU3Premium, 'ether');

            const earnedDollar = parseFloat(grandEarningEther) * priceInUSDFloat;

            console.log("Grand Total Earnings (ETH):", grandEarningEther, "≈ $", earnedDollar.toFixed(2));

            return {
                ...res,
                grandTotal: grandEarningEther,
                totalU3Plus: totalU3PlusEther,
                totalU4: totalU4Ether,
                totalU5: totalU5Ether,
                totalU3Premium: totalU3PremiumEther,
                earnedDollar: earnedDollar.toFixed(4),
                ramaPriceUSD: priceInUSDFloat.toFixed(4)
            };
        } catch (error) {
            console.error("Error in LeftUserPanInfo:", error);
            return null;
        }
    },



    partnerTable: async (address) => {
        try {
            console.log("🔍 Fetching earnings for:", address);

            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);

            const userDetails = await contract.methods.getUser(address).call();

            console.log(userDetails?.directReferrals)

            if (!userDetails?.directReferrals) {
                console.warn("No direct referrals found.");
                return [];
            }

            const directReferrals = userDetails.directReferrals;
            const partnerArr = [];

            for (let i = 0; i < directReferrals.length; i++) {
                const refUserDetails = await contract.methods.users(directReferrals[i]).call();


                partnerArr.push({
                    wallet: refUserDetails.wallet.toString(),
                    registrationTime: refUserDetails.registrationTime,
                    formattedDate: new Date(Number(refUserDetails.registrationTime) * 1000).toLocaleString(), // <-- formatted
                    totalProfit: refUserDetails.totalProfit,
                });

            }

            console.log("|||||||||||||||||||||||||||||||||partnerArr", partnerArr)

            return partnerArr;

        } catch (error) {
            console.error("❌ Error in partnerTable:", error);
            return null;
        }
    },


    // partnerTable: async (Waladdress) => {
    //     try {
    //         const { abi, contractAddress } = await fetchContractAbi("UserMang");

    //         const contract = new web3.eth.Contract(abi, contractAddress);

    //         const userDetails = await contract.methods.getUser(address).call();

    //        const referralArr = userDetails?.directReferrals


    //         const TOPIC0 = "0xb33790cd3098de54cda8ce6c69264da35751cc71987bfe44c41eaf84bcb239c2";
    //         const topicEncodedAddress = "0x" + Waladdress.toLowerCase().replace("0x", "").padStart(64, "0");

    //         // Get logs where the wallet is the initiator
    //         const logs = await web3.eth.getPastLogs({
    //             fromBlock: 0,
    //             toBlock: "latest",
    //             address: contractAddress,
    //             topics: [TOPIC0, topicEncodedAddress]
    //         });

    //         // Deduplicate logs by transactionHash
    //         const uniqueLogs = Array.from(
    //             new Map(logs.map(log => [log.transactionHash, log])).values()
    //         );

    //         // Decode logs
    //         const eventAbi = abi.find(e => e.name === "PositionCompleted" && e.type === "event");

    //         const decoded = await Promise.all(
    //             uniqueLogs.map(async (log) => {
    //                 const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics.slice(1));
    //                 return {
    //                     wallet: decodedLog.slotFilledBy,
    //                     registrationTime: decodedLog.registrationTime,
    //                     formattedDate: new Date(Number(decodedLog.timestamp) * 1000).toLocaleString(),
    //                     totalProfit: web3.utils.fromWei(decodedLog.totalReceivedAmount, "ether")
    //                 };
    //             })
    //         );

    //         return decoded;
    //     } catch (err) {
    //         console.error("❌ Error fetching U3 logs:", err.message);
    //     }
    // },



    GetFirstId: async () => {
        try {
            const { abi, contractAddress } = await fetchContractAbi("UserMang");
            const contract = new web3.eth.Contract(abi, contractAddress);
            const userAddress = await contract.methods.allUsers(0).call();
            return userAddress;
        } catch (error) {
            console.error("❌ GetFirstId error:", error);
            return null;
        }
    },



    // getSplitBonus: async (walletAdd) => {
    //     try {
    //         if (!walletAdd || walletAdd.length !== 42 || !walletAdd.startsWith("0x")) {
    //             throw new Error("Invalid wallet address");
    //         }

    //         // Load MatrixDataView contract
    //         const matrixDataView = await fetchContractAbi("MatrixDataView");
    //         const contract = new web3.eth.Contract(matrixDataView.abi, matrixDataView.contractAddress);

    //         // Fetch all active slots for this wallet
    //         const slotDataList = await contract.methods.getActiveSlots(walletAdd).call();

    //         const result = [];

    //         // Loop over each slot
    //         for (const slot of slotDataList) {
    //             const slotNo = Number(slot.slotNo);
    //             const currentCycle = Number(slot.currentCycle);

    //             // Loop over each cycle from 1 to currentCycle
    //             const cycleResults = [];

    //             for (let cycle = 1; cycle <= currentCycle; cycle++) {
    //                 try {
    //                     const splits = await contract.methods.getSplitPayments(walletAdd, slotNo, cycle).call();

    //                     // Normalize to array if single object is returned
    //                     const splitArray = Array.isArray(splits) ? splits : [splits];

    //                     // Format the splits
    //                     const formattedSplits = splitArray.map(split => ({
    //                         initiatedFrom: split.initiatedFrom,
    //                         splitedWith: split.splitedWith,
    //                         isReceiverSecondUpline: split.isReceiverSecondUpline,
    //                         amountInRAMA: split.amountInRAMA,
    //                         amountInUSD: split.amountInUSD,
    //                         receiver: split.receiver,
    //                         timeStamp: Number(split.timeStamp)
    //                     }));

    //                     // Only add if there are actual payments
    //                     if (formattedSplits.length > 0) {
    //                         cycleResults.push({
    //                             cycle: cycle,
    //                             splitPayment: formattedSplits
    //                         });
    //                     }

    //                 } catch (innerErr) {
    //                     console.warn(`Cycle ${cycle} for slot ${slotNo} failed:`, innerErr.message);
    //                     continue; // skip this cycle if error
    //                 }
    //             }

    //             if (cycleResults.length > 0) {
    //                 result.push({
    //                     slot: slotNo,
    //                     cycles: cycleResults
    //                 });
    //             }
    //         }

    //         return result;
    //     } catch (error) {
    //         console.error("❌ Error in getSplitBonus:", error.message);
    //         return [];
    //     }
    // }


    getSplitBonus: async (walletAdd) => {
        try {
            if (!walletAdd || walletAdd.length !== 42 || !walletAdd.startsWith("0x")) {
                throw new Error("Invalid wallet address");
            }

            const matrixDataView = await fetchContractAbi("MatrixDataView");
            const matrixContract = new web3.eth.Contract(matrixDataView.abi, matrixDataView.contractAddress);

            const activeSlots = await matrixContract.methods.getActiveSlots(walletAdd).call();

            const result = [];

            for (const slot of activeSlots) {
                const slotNo = Number(slot.slotNo);
                const currentCycle = Number(slot.currentCycle);
                const payments = [];

                for (let i = 1; i <= currentCycle; i++) {
                    const paymentsForCycle = await matrixContract.methods.getSplitPayments(walletAdd, slotNo, i).call();
                    paymentsForCycle.forEach(p => {
                        payments.push({ ...p, cycle: i });
                    });
                }

                // Add `cycleList` to support UI filtering
                const cycleList = [...new Set(payments.map(p => Number(p.cycle)))];

                result.push({
                    slot: slotNo,
                    splitPayments: payments,
                    cycleList,
                });
            }

            return result;
        } catch (err) {
            console.error("Error fetching split bonus:", err.message);
            return [];
        }
    },





}));
