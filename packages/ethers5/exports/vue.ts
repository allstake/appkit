import { AppKit } from '@web3modal-x/base'
import type { AppKitOptions } from '@web3modal-x/base'
import { EVMEthers5Client, type AdapterOptions } from '@web3modal-x/base/adapters/evm/ethers5'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { getWeb3Modal } from '@web3modal-x/base/utils/library/vue'
import { onUnmounted, ref } from 'vue'
import { ethers } from 'ethers'
import { type Chain, type EthersStoreUtilState } from '@web3modal-x/scaffold-utils/ethers'

// -- Configs -----------------------------------------------------------
export { defaultConfig } from '@web3modal-x/base/adapters/evm/ethers5'

// -- Setup -------------------------------------------------------------------
let appkit: AppKit<EthersStoreUtilState, number> | undefined = undefined
let ethersAdapter: EVMEthers5Client | undefined = undefined

type EthersAppKitOptions = Omit<AppKitOptions<Chain>, 'adapters' | 'sdkType' | 'sdkVersion'> &
  AdapterOptions

export function createWeb3Modal(options: EthersAppKitOptions) {
  ethersAdapter = new EVMEthers5Client({
    ethersConfig: options.ethersConfig,
    siweConfig: options.siweConfig,
    chains: options.chains,
    defaultChain: options.defaultChain
  })
  appkit = new AppKit<EthersStoreUtilState, number>({
    ...options,
    defaultChain: ethersAdapter.defaultChain,
    adapters: [ethersAdapter],
    sdkType: 'w3m',
    sdkVersion: `vue-ethers5-${ConstantsUtil.VERSION}`
  })
  getWeb3Modal(appkit)

  return appkit
}

// -- Composites --------------------------------------------------------------
export function useWeb3ModalProvider() {
  if (!ethersAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalProvider" composition')
  }

  const walletProvider = ref(
    ethersAdapter.getWalletProvider() as ethers.providers.ExternalProvider | undefined
  )
  const walletProviderType = ref(ethersAdapter.getWalletProviderType())

  const unsubscribe = ethersAdapter.subscribeProvider(state => {
    walletProvider.value = state.provider as ethers.providers.ExternalProvider | undefined
    walletProviderType.value = state.providerType
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    walletProvider,
    walletProviderType
  }
}

export function useDisconnect() {
  async function disconnect() {
    await ethersAdapter?.disconnect()
  }

  return {
    disconnect
  }
}

export function useSwitchNetwork() {
  async function switchNetwork(chainId: number) {
    await ethersAdapter?.switchNetwork(chainId)
  }

  return {
    switchNetwork
  }
}

export function useWeb3ModalAccount() {
  if (!ethersAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalAccount" composition')
  }

  const address = ref(ethersAdapter.getAddress())
  const isConnected = ref(ethersAdapter.getIsConnected())
  const status = ref(ethersAdapter.getStatus())
  const chainId = ref(ethersAdapter.getChainId())

  const unsubscribe = ethersAdapter.subscribeProvider(state => {
    address.value = state.address as string | undefined
    status.value = state.status
    isConnected.value = state.isConnected
    chainId.value = state.chainId
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    address,
    isConnected,
    chainId
  }
}

export function useWeb3ModalError() {
  if (!ethersAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalError" composition')
  }

  const error = ref(ethersAdapter.getError())

  const unsubscribe = ethersAdapter.subscribeProvider(state => {
    error.value = state.error
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    error
  }
}

export {
  useWeb3ModalTheme,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents,
  useWalletInfo
} from '@web3modal-x/base/utils/library/vue'
