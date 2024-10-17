'use client'

import { AppKit } from '@web3modal-x/base'
import type { AppKitOptions } from '@web3modal-x/base'
import { EVMEthers5Client, type AdapterOptions } from '@web3modal-x/base/adapters/evm/ethers5'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { EthersStoreUtil, type EthersStoreUtilState } from '@web3modal-x/scaffold-utils/ethers'
import { getWeb3Modal } from '@web3modal-x/base/utils/library/react'
import { useSnapshot } from 'valtio'
import { ethers } from 'ethers'
import { type Chain } from '@web3modal-x/scaffold-utils/ethers'

// -- Configs -----------------------------------------------------------
export { defaultConfig } from '@web3modal-x/base/adapters/evm/ethers5'

// -- Setup -------------------------------------------------------------------
let appkit: AppKit<EthersStoreUtilState, number> | undefined = undefined
let ethersAdapter: EVMEthers5Client | undefined = undefined

export type Ethers5AppKitOptions = Omit<
  AppKitOptions<Chain>,
  'adapters' | 'sdkType' | 'sdkVersion'
> &
  AdapterOptions

export function createWeb3Modal(options: Ethers5AppKitOptions) {
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
    sdkVersion: `react-ethers5-${ConstantsUtil.VERSION}`
  })
  getWeb3Modal(appkit)

  return appkit
}

// -- Hooks -------------------------------------------------------------------
export function useWeb3ModalProvider() {
  const { provider, providerType } = useSnapshot(EthersStoreUtil.state)

  const walletProvider = provider as ethers.providers.ExternalProvider | undefined
  const walletProviderType = providerType

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
  const { address, isConnected, chainId, status } = useSnapshot(EthersStoreUtil.state)

  return {
    address,
    isConnected,
    chainId,
    status
  }
}

export function useWeb3ModalError() {
  const { error } = useSnapshot(EthersStoreUtil.state)

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
} from '@web3modal-x/base/utils/library/react'
