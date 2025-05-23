// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// // import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks'
// import type { AppKitNetwork } from '@reown/appkit/networks'

// // Get projectId from https://cloud.reown.com
// export const projectId = import.meta.env.VITE_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost


// const ramesttaNetwork: AppKitNetwork = {
//   id: 1370,
//   name: 'Ramestta',
//   // network: 'ramestta',
//   nativeCurrency: {
//     name: 'Rama',
//     symbol: 'RAMA',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: [
//         'https://blockchain.ramestta.com', // RPC option 1
//         'https://blockchain2.ramestta.com' // RPC option 2 (fallback)
//       ],
//     },
//     public: {
//       http: [
//         'https://blockchain.ramestta.com',
//         'https://blockchain2.ramestta.com',
//       ],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Ramascan',
//       url: 'https://ramascan.com/',
//     },
//   },
//   testnet: false, // Change to true if it's a testnet
// }



// if (!projectId) {
//   throw new Error('Project ID is not defined')
// }

// export const metadata = {
//   name: 'AppKit',
//   description: 'AppKit Example',
//   url: 'https://reown.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
// export const networks = [ramesttaNetwork] as [AppKitNetwork, ...AppKitNetwork[]]

// //Set up the Wagmi Adapter (Config)
// export const wagmiAdapter = new WagmiAdapter({
//   projectId,
//   networks
// })

// export const config = wagmiAdapter.wagmiConfig




import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
// export const projectId = import.meta.env.VITE_PROJECT_ID || "5a7ca96b4c20a6f220b969a9e91203d8" // this is a public projectId only to use on localhost


export const projectId = "5a7ca96b4c20a6f220b969a9e91203d8" // this is a public projectId only to use on localhost

const ramesttaNetwork = {
  id: 1370,
  name: 'Ramestta',
  nativeCurrency: {
    name: 'Rama',
    symbol: 'RAMA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://blockchain.ramestta.com',
        'https://blockchain2.ramestta.com'
      ],
    },
    public: {
      http: [
        'https://blockchain.ramestta.com',
        'https://blockchain2.ramestta.com',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ramascan',
      url: 'https://ramascan.com/',
    },
  },
  testnet: false,
}

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'Universe',
  description: 'A Decentralized Earning Platform',
  url: 'https://dapp.ramauniverse.io',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Networks array (no type assertion needed in JS)
export const networks = [ramesttaNetwork]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
