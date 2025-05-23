
import { useState, useEffect } from "react";
import FinalTrans from '../assets/images/FinalTrans.png';

const LaunchingPage = () => {
  const launchDate = new Date("2025-05-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = launchDate - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotify = () => {
    if (email.trim() === "") {
      setMessage("Please enter a valid email.");
      return;
    }
    setMessage("Thank you! You will be notified.");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 text-center">
      <img src={FinalTrans} alt="Logo" className="w-[300px] mb-6  shadow-amber-300" />
      <h1 className="text-5xl font-bold mb-6">We're Launching Soon!</h1>
      <p className="text-lg mb-6">Stay tuned for something amazing.</p>

      <div className="flex space-x-6 text-3xl font-bold">
        <div className="p-4 bg-white text-black rounded-lg shadow-lg">
          <p>{timeLeft.days}</p>
          <span className="text-sm">Days</span>
        </div>
        <div className="p-4 bg-white text-black rounded-lg shadow-lg">
          <p>{timeLeft.hours}</p>
          <span className="text-sm">Hours</span>
        </div>
        <div className="p-4 bg-white text-black rounded-lg shadow-lg">
          <p>{timeLeft.minutes}</p>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="p-4 bg-white text-black rounded-lg shadow-lg">
          <p>{timeLeft.seconds}</p>
          <span className="text-sm">Seconds</span>
        </div>
      </div>

      <div className="mt-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg text-black focus:outline-none"
        />
        <button 
          onClick={handleNotify} 
          className="ml-2 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
          Notify Me
        </button>
        {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default LaunchingPage;
