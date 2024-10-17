import '@web3modal-x/polyfills'

export { SolanaWeb3JsClient } from './client.js'

// -- Types -----------------------------------------------------------
export type { Web3ModalClientOptions } from './client.js'
export type * from '@web3modal-x/scaffold-utils/solana'
export type * from '@solana/wallet-adapter-base'

// -- Utils -----------------------------------------------------------
export * from './utils/defaultConfig.js'
export * from '@web3modal-x/scaffold-utils/solana'

// -- Constants -------------------------------------------------------
export { solana, solanaDevnet, solanaTestnet } from './utils/chains.js'
