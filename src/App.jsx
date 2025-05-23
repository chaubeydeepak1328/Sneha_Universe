
// import Home from './pages/Home';
import Login from './pages/Login';
import UserPanel from './pages/UserPanel';
import EVRToken from './pages/EVRToken';
import { Route, Routes } from 'react-router-dom';
import BuyToken from './pages/BuyToken';
import SellToken from './pages/SellToken'
import ExpressLogin from './pages/ExpressLogin'
import DMatrix from './pages/DMatrix';
import Team from './pages/Team';
import Partners from './components/Partners';
import UplineBonus from './components/UplineBonus';
import Activate from './components/Activate';
import Home from './pages/Home';
// import LaunchingPage from './components/LanchingPage';
import Dmatrix1 from './pages/userpaneldmatrix/Dmatrix1';
import Umatrix1 from './pages/userpaneldmatrix/Umatrix1';
import SplitBonus from './components/SplitBonus';
import UmatrixUThreeplus from './pages/userpaneldmatrix/UmatrixUThreeplus';
import UniverseU10 from "./pages/UniverseU5/UniverseU10";
// =================================================
// Wallet Connect Functionality
// =================================================


import { WagmiProvider } from 'wagmi'
import { useState } from 'react'

import { createAppKit } from '@reown/appkit/react'
// import { ActionButtonList } from './Provider/ActionButtonList'
// import { SmartContractActionButtonList } from './Provider/SmartContractActionButtonList'
// import { InfoList } from './Provider/InfoList'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'
import Umatrix4 from './pages/userpaneldmatrix/UmatrixU4';
import UniverseU40 from './pages/UniverseU4/UniverseU40';
import UniverseU340 from './pages/UniverseU340/UniverseU340';
import Referral from './pages/Referral';


const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


function App() {

  const [transactionHash, setTransactionHash] = useState(undefined);
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  const receiveHash = (hash) => {
    setTransactionHash(hash);
  };

  const receiveSignedMsg = (msg) => {
    setSignedMsg(msg);
  };

  const receiveBalance = (bal) => {
    setBalance(bal);
  };



  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/' element={<LaunchingPage/>}/> */}
          <Route path='/erv-token-home' element={<EVRToken />} />
          <Route path='/user-login' element={<Login />} />
          <Route path='/express-login' element={<ExpressLogin />} />
          <Route path='/buy-token' element={<BuyToken />} />
          <Route path='/sell-token' element={<SellToken />} />
          <Route path='/d-matrix' element={<DMatrix />} />
          <Route path='/user-panel-home/team' element={<Team />} />
          <Route path='/user-panel-home/partners' element={<Partners />} />
          <Route path='/user-panel-home/upline-bonus' element={<UplineBonus />} />
          <Route path='/user-panel-home/split-bonus' element={<SplitBonus />} />
          <Route path='/user-panel-home/slot-activate' element={<Activate />} />


          {/* U3 Plus */}
          <Route path="/user-panel-home" element={<UserPanel />} />
          <Route path='/user-panel-dmatrix1' element={<Dmatrix1 />} />

          {/* Universe U5 sub part */}
          <Route path='/user-panel-home/user-panel-umatrix5' element={<Umatrix1 />} />
          <Route path='/user-panel-home/universe' element={<UniverseU10 />} />

          {/* Universe U4 sub part */}
          <Route path='/user-panel-home/user-panel-umatrix4' element={<Umatrix4 />} />
          <Route path='/user-panel-home/UniverseU4' element={<UniverseU40 />} />





          {/* Universe U3 premium */}
          <Route path='/user-panel-home/user-panel-umatrix-3plus' element={<UmatrixUThreeplus />} />
          <Route path='/user-panel-home/user-panel-umatrix-3pre-details' element={<UniverseU340 />} />


          {/* For Refferd User */}
          <Route path='/referral/:customId' element={<Referral />} />

        </Routes>
      </QueryClientProvider>
    </WagmiProvider>


  )
}

export default App
