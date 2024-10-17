import '@web3modal-x/polyfills'

export { EVMWagmiClient } from './client.js'

// -- Types
export type { AdapterOptions } from './client.js'

// -- Utils
export { defaultConfig as defaultWagmiConfig } from './utils/defaultConfig.js'

// -- Connectors
export { authConnector } from './connectors/AuthConnector.js'
