import { onUnmounted, ref } from 'vue'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { getWeb3Modal } from '@web3modal-x/base/utils/library/vue'
import { AppKit } from '@web3modal-x/base'
import { SolanaWeb3JsClient } from '@web3modal-x/base/adapters/solana/web3js'
import { SolStoreUtil, type SolStoreUtilState } from '@web3modal-x/scaffold-utils/solana'
import type { Provider, Connection } from '@web3modal-x/base/adapters/solana/web3js'
import type { CaipNetwork } from '@web3modal-x/core'
import type { SolanaAppKitOptions } from './options'

// -- Types -------------------------------------------------------------------
export type { SolanaAppKitOptions, Provider }

// -- Setup -------------------------------------------------------------------
let appkit: AppKit<SolStoreUtilState, CaipNetwork> | undefined = undefined
let solanaAdapter: SolanaWeb3JsClient | undefined = undefined

export function createWeb3Modal(options: SolanaAppKitOptions) {
  solanaAdapter = new SolanaWeb3JsClient({
    solanaConfig: options.solanaConfig,
    chains: options.chains,
    wallets: options.wallets,
    projectId: options.projectId,
    defaultChain: options.defaultChain
  })
  appkit = new AppKit<SolStoreUtilState, CaipNetwork>({
    ...options,
    defaultChain: solanaAdapter.defaultChain,
    adapters: [solanaAdapter],
    sdkType: 'w3m',
    sdkVersion: `vue-solana-${ConstantsUtil.VERSION}`
  })
  getWeb3Modal(appkit)

  return appkit
}

// -- Composites --------------------------------------------------------------
export function useWeb3ModalProvider() {
  if (!solanaAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalProvider" composition')
  }

  const walletProvider = ref(SolStoreUtil.state.provider)
  const connection = ref(SolStoreUtil.state.connection)

  const unsubscribe = solanaAdapter.subscribeProvider(state => {
    walletProvider.value = state.provider
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    walletProvider: walletProvider.value ?? undefined,
    connection: connection.value ?? undefined
  } as {
    walletProvider: Provider | undefined
    connection: Connection | undefined
  }
}

export function useDisconnect() {
  function disconnect() {
    solanaAdapter?.disconnect()
  }

  return {
    disconnect
  }
}

export function useSwitchNetwork() {
  async function switchNetwork(chainId: string) {
    await solanaAdapter?.switchNetwork({ id: chainId } as CaipNetwork)
  }

  return {
    switchNetwork
  }
}

export function useWeb3ModalAccount() {
  if (!solanaAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalAccount" composition')
  }

  const address = ref(solanaAdapter.getAddress())
  const isConnected = ref(SolStoreUtil.state.isConnected)
  const chainId = ref(SolStoreUtil.state.currentChain?.chainId)

  const unsubscribe = solanaAdapter.subscribeProvider(state => {
    address.value = state.address ?? ''
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
  if (!solanaAdapter) {
    throw new Error('Please call "createWeb3Modal" before using "useWeb3ModalError" composition')
  }

  const error = ref(SolStoreUtil.state.error)

  const unsubscribe = solanaAdapter.subscribeProvider(state => {
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
  useWeb3ModalEvents
} from '@web3modal-x/base/utils/library/vue'

// -- Universal Exports -------------------------------------------------------
export { defaultSolanaConfig } from '@web3modal-x/base/adapters/solana/web3js'
