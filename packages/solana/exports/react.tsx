'use client'

import { useSnapshot } from 'valtio'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { getWeb3Modal } from '@web3modal-x/base/utils/library/react'
import { AppKit, type CaipNetwork } from '@web3modal-x/base'
import { SolanaWeb3JsClient } from '@web3modal-x/base/adapters/solana/web3js'
import { SolStoreUtil } from '@web3modal-x/scaffold-utils/solana'
import type {
  Connection,
  Provider,
  SolStoreUtilState
} from '@web3modal-x/base/adapters/solana/web3js'
import type { SolanaAppKitOptions } from './options'

// -- Configs -----------------------------------------------------------
export { defaultSolanaConfig } from '@web3modal-x/base/adapters/solana/web3js'

// -- Types -------------------------------------------------------------------
export type { SolanaAppKitOptions, Provider }

// -- Setup -------------------------------------------------------------
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
    sdkVersion: `react-solana-${ConstantsUtil.VERSION}`
  })
  getWeb3Modal(appkit)

  return appkit
}

// -- Hooks -------------------------------------------------------------------
export function useWeb3ModalProvider(): {
  walletProvider: Provider | undefined
  connection: Connection | undefined
} {
  const state = useSnapshot(SolStoreUtil.state)

  return {
    walletProvider: state.provider,
    connection: state.connection
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

export function useWeb3ModalAccount() {
  const { address, isConnected, chainId, currentChain } = useSnapshot(SolStoreUtil.state)

  return {
    address,
    isConnected,
    currentChain,
    chainId
  }
}

export {
  useWeb3ModalTheme,
  useWeb3Modal,
  useWeb3ModalState,
  useWeb3ModalEvents
} from '@web3modal-x/base/utils/library/react'
