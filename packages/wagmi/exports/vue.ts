import { AppKit } from '@web3modal-x/base'
import type { AppKitOptions } from '@web3modal-x/base'
import { EVMWagmiClient, type AdapterOptions } from '@web3modal-x/base/adapters/evm/wagmi'
import { getWeb3Modal } from '@web3modal-x/base/utils/library/vue'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import type { Config } from '@wagmi/core'
import type { Chain } from 'viem'

// -- Configs -----------------------------------------------------------
export { defaultWagmiConfig } from '@web3modal-x/base/adapters/evm/wagmi'

// -- Setup -------------------------------------------------------------------
let appkit: AppKit | undefined = undefined
let wagmiAdapter: EVMWagmiClient | undefined = undefined

export type WagmiAppKitOptions = Omit<AppKitOptions<Chain>, 'adapters' | 'sdkType' | 'sdkVersion'> &
  AdapterOptions<Config>

export function createWeb3Modal(options: WagmiAppKitOptions) {
  wagmiAdapter = new EVMWagmiClient({
    wagmiConfig: options.wagmiConfig,
    siweConfig: options.siweConfig,
    defaultChain: options.defaultChain
  })
  appkit = new AppKit({
    ...options,
    defaultChain: wagmiAdapter.defaultChain,
    adapters: [wagmiAdapter],
    sdkType: 'w3m',
    sdkVersion: `vue-wagmi-${ConstantsUtil.VERSION}`
  })
  getWeb3Modal(appkit)

  return appkit
}

// -- Composites --------------------------------------------------------------
export {
  useWeb3ModalTheme,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents,
  useWalletInfo
} from '@web3modal-x/base/utils/library/vue'
