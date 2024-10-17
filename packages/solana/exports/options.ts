import type { AppKitOptions } from '@web3modal-x/base'
import type { Web3ModalClientOptions } from '@web3modal-x/base/adapters/solana/web3js'
import { type Chain } from '@web3modal-x/scaffold-utils/solana'

export type SolanaAppKitOptions = Omit<
  AppKitOptions<Chain>,
  'adapters' | 'sdkType' | 'sdkVersion'
> &
  Web3ModalClientOptions
