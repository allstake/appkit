import '@web3modal-x/polyfills'

export { EVMEthers5Client } from './client.js'
export * from '@web3modal-x/scaffold-utils/ethers'

// -- Types
export type { AdapterOptions } from './client.js'
export type { ProviderType } from '@web3modal-x/scaffold-utils/ethers'

// -- Utils
export { defaultConfig } from './utils/defaultConfig.js'
