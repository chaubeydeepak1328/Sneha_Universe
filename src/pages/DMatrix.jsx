


import React from 'react';
import { Link } from 'react-router-dom';
import universeHeroBg from '../assets/images/universeHeroBg.png'
import universeLogo from '../assets/images/universeLogo.png'

const Dashboard = () => {
  return (
    <div className="bg-black text-[#f5f5f5] min-h-screen font-sans"
    style={{
      background: "linear-gradient(180deg, #000000, #25752D)",
    }}>
      <div className="container mx-auto p-4 px-0 md:px-8 mt-0 md:mt-[0px]">
        {/* Topbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className='flex items-center'>
          <div><Link to="/"><img src={universeLogo} className='w-[250px]' alt="" /></Link></div>
          <h1 className=" text-3xl md:text-6xl font-bold text-[#EFB90A]">D-Matrix Dashboard</h1>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1a1a1a] border border-blue-500 text-sm px-4 py-2 rounded-lg text-white focus:outline-none"
            />
            <div className="flex ml-4 space-x-2">
              <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-blue-500 hover:text-black transition">
                🔔
              </button>
              <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-blue-500 hover:text-black transition">
                ☰
              </button>
              <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-blue-500 hover:text-black transition">
                ⎋
              </button>
            </div>
            <img
              src={universeHeroBg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500 ml-4"
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3 bg-[#0a0a0a] p-4 rounded-xl text-white "
              style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}>
            <nav className="space-y-4">
              <div>
                <h2 className="text-lg font-bold mb-2">Dashboards</h2>
                <ul className="space-y-1">
                  {['Our Team', 'CRM', 'Analytics', 'E-Commerce', 'Email Marketing'].map((item) => (
                    <li key={item} className="hover:bg-blue-500 hover:text-black p-2 rounded-lg transition">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold mt-4 mb-2">Applications</h2>
                <ul className="space-y-1">
                  {['User', 'File Manager', 'Contacts', 'Mail', 'Messages', 'Photos', 'Todo List', 'Calendar'].map((item) => (
                    <li key={item} className="hover:bg-blue-500 hover:text-black p-2 rounded-lg transition">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold mt-4 mb-2">Misc</h2>
                <ul className="space-y-1">
                  {['Sample Pages', 'Content'].map((item) => (
                    <li key={item} className="hover:bg-blue-500 hover:text-black p-2 rounded-lg transition">{item}</li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main */}
          <main className="md:col-span-9 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: '', value: "Partners Invited: 4", percent: 'Income 18.650 RAMA' },
                { title: '', value: 'Upline & Bonus', percent: 'Income 18.650 RAMA' },
                { title: '', value: 'Slot Activated: ', percent: '12' },
                { title: '', value: 'Affiliate Link', percent: 'click to copy' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="hover:shadow-blue-500/50 hover:scale-[1.03] transition-all shadow-lg rounded-xl p-5 space-y-2"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(65, 238, 12, 1) 0%, rgba(112, 88, 206, 1) 63%)",
                  }}>
                  <p className="text-sm text-white">{item.title}</p>
                  <h3 className="text-2xl font-bold text-white">{item.value}</h3>
                  <p className="text-white text-sm font-semibold">{item.percent}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" p-4 rounded-xl " 
               style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-blue-500">Budget and Expenses</h2>
                </div>
                <div className="h-64 bg-[#111] rounded-lg flex items-center justify-center text-gray-500 text-sm">
                
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-md " 
               style={{
                background:
                  "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
              }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-blue-500">Budget Utilization</h2>
                </div>
                <div className="h-64 bg-[#111] rounded-lg flex items-center justify-center text-gray-500 text-sm">
                  Chart Placeholder
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-md "
             style={{
              background:
                "linear-gradient(178deg, rgba(5, 53, 102, 1) 0%, rgba(96, 103, 55, 1) 100%)",
            }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-blue-500">Partners</h2>
              </div>
              <div className="space-y-4">
                {[
                  { task: 'Website Redesign', status: 'At Risk', date: '2023-09-05', progress: '65%' },
                  { task: 'Mobile App Launch', status: 'On Track', date: '2023-09-08', progress: '52%' },
                ].map((task, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#111] p-3 rounded-lg">
                    <p>{task.task}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${task.status === 'On Track' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {task.status}
                    </span>
                    <p className="text-sm text-gray-400">{task.date}</p>
                    <p className="text-sm font-medium text-yellow-300">{task.progress}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





