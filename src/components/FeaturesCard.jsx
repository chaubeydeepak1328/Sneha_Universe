

import React from "react";
import lowTransactionfee from '../assets/images/lowTransactionfee.png'
import SmartContract from '../assets/images/SmartContract.png'
import SecureFast11 from '../assets/images/SecureFast11.png'
import Peer from '../assets/images/Peer.png'
import twinty47 from '../assets/images/twinty47.png'
import defi from '../assets/images/defi.png';
import AdSecure from '../assets/images/AdSecure.png';
import CrossPlatform from '../assets/images/CrossPlatform.png'
import uni2 from '../assets/images/uni2.jpg'

const cardData = [
  {
    title: "Instant Peer-to-Peer Payments",
    description:
      "The Ramestta smart contract is nothing more than a payment gateway that facilitates peer-to-peer commission payments between its program participants.",
    img: Peer,
  },
  {
    title: "Fast & Secure Transactions",
    description:
      "Experience seamless transactions with high security and efficiency, ensuring instant transfers with Ramestta.",
    img: SecureFast11,
  },
  {
    title: "Smart Contract Integration",
    description:
      "Utilizing blockchain technology to enable automated and trustless financial transactions.",
    img: SmartContract,
  },
  {
    title: "Low Transaction Fees",
    description:
      "Ramestta ensures low-cost transactions compared to traditional payment gateways.",
    img: lowTransactionfee,
  },
  {
    title: "24/7 Global Accessibility",
    description:
      "Access payments worldwide with no geographical limitations using the Ramestta network.",
    img: twinty47,
  },
  {
    title: "Decentralized Finance (DeFi)",
    description:
      "Empowering users with full financial control through decentralized transactions.",
    img: defi,
  },
  {
    title: "Advanced Security Protocols",
    description:
      "Ramestta provides multi-layered security to safeguard your transactions and assets.",
    img: AdSecure,
  },
  {
    title: "Cross-Platform Compatibility",
    description:
      "Access and manage your crypto payments seamlessly across various devices and platforms.",
    img: CrossPlatform,
  },
];

const ResponsiveCards = () => {
  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-center bg-black bg-cover flex flex-col items-center py-10 px-5"
      style={{ backgroundImage: `url(${uni2})` }}
    >
      <div className="mt-10 mb-20 text-5xl font-bold text-center text-white">
        Features Of Universe
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 max-w-7xl">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="max-w-xs h-[500px] rounded-lg shadow-lg border border-white/30 bg-white/10 backdrop-blur-md p-5"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-40 object-cover"
                src={card.img}
                alt="Card Thumbnail"
              />
            </a>
            <div className="p-5 text-center">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
                  {card.title}
                </h5>
              </a>
              <p className="mb-3 text-lg font-normal text-white text-justify tracking-tight">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveCards;

