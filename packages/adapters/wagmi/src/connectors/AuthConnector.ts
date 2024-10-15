import { createConnector, type CreateConfigParameters } from '@wagmi/core'
import { W3mFrameProvider } from '@reown/appkit-wallet'
import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common'
import { SwitchChainError, getAddress } from 'viem'
import type { Address, Hex } from 'viem'
import { ConstantsUtil } from '@reown/appkit-utils'
import { NetworkUtil } from '@reown/appkit-common'

// -- Types ----------------------------------------------------------------------------------------
interface W3mFrameProviderOptions {
  projectId: string
}

export type AuthParameters = {
  chains?: CreateConfigParameters['chains']
  options: W3mFrameProviderOptions
  provider: W3mFrameProvider
}

// -- Connector ------------------------------------------------------------------------------------
export function authConnector(parameters: AuthParameters) {
  const singleTonProvider = parameters.provider
  type Properties = {
    provider?: W3mFrameProvider
  }

  function parseChainId(chainId: string | number) {
    return NetworkUtil.parseEvmChainId(chainId) || 1
  }

  return createConnector<W3mFrameProvider, Properties>(config => ({
    id: ConstantsUtil.AUTH_CONNECTOR_ID,
    name: 'AppKit Auth',
    type: 'w3mAuth',
    chain: CommonConstantsUtil.CHAIN.EVM,

    async connect(options = {}) {
      const provider = await this.getProvider()
      let chainId = options.chainId
      if (options.isReconnecting) {
        chainId = provider.getLastUsedChainId()
        if (!chainId) {
          throw new Error('ChainId not found in provider')
        }
      }

      const { address, chainId: frameChainId } = await provider.connect({
        chainId
      })
      await provider.getSmartAccountEnabledNetworks()

      const parsedChainId = parseChainId(frameChainId)

      return {
        accounts: [address as Address],
        account: address as Address,
        chainId: parsedChainId,
        chain: {
          id: parsedChainId,
          unsuported: false
        }
      }
    },

    async disconnect() {
      const provider = await this.getProvider()
      await provider.disconnect()
    },

    async getAccounts() {
      const provider = await this.getProvider()
      const { address } = await provider.connect()
      config.emitter.emit('change', { accounts: [address as Address] })

      return [address as Address]
    },

    async getProvider() {
      return Promise.resolve(singleTonProvider)
    },

    async getChainId() {
      const provider: W3mFrameProvider = await this.getProvider()
      const { chainId } = await provider.getChainId()

      return parseChainId(chainId)
    },

    async isAuthorized() {
      const provider = await this.getProvider()
      const { isConnected } = await provider.isConnected()

      return isConnected
    },

    async switchChain({ chainId }) {
      try {
        const chain = config.chains.find(c => c.id === chainId)
        if (!chain) {
          throw new SwitchChainError(new Error('chain not found on connector.'))
        }
        const provider = await this.getProvider()
        // We connect instead, since changing the chain may cause the address to change as well
        const response = await provider.connect({ chainId })

        config.emitter.emit('change', {
          chainId: Number(chainId),
          accounts: [response.address as Hex]
        })

        return chain
      } catch (error) {
        if (error instanceof Error) {
          throw new SwitchChainError(error)
        }
        throw error
      }
    },

    onAccountsChanged(accounts) {
      if (accounts.length === 0) {
        this.onDisconnect()
      } else {
        config.emitter.emit('change', { accounts: accounts.map(getAddress) })
      }
    },

    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },

    async onDisconnect(_error) {
      const provider = await this.getProvider()
      await provider.disconnect()
    }
  }))
}
