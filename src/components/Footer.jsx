import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import FooterImg from '../assets/images/Footer.png';

const Footer = () => {
  return (
    <footer className="  py-10 text-white"
       style={{ backgroundImage: `url(${FooterImg})` }}
    >
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-white">Universe Crypto</h2>
          <p className="mt-4 text-white">
            Secure, fast, and transparent blockchain-based financial solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Features</a></li>
            <li><a href="#" className="hover:text-yellow-400">About</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-yellow-400 text-2xl"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-yellow-400 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-yellow-400 text-2xl"><FaInstagram /></a>
            <a href="#" className="text-white hover:text-yellow-400 text-2xl"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-white">Email: support@universecrypto.com</p>
          <p className="text-white">Phone: +123 456 7890</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center text-white mt-10 border-t border-gray-700 pt-6">
        <p>© {new Date().getFullYear()} Universe Crypto. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
