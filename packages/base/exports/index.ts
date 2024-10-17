import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { AppKit } from '../src/client.js'
import type { AppKitOptions } from '../utils/TypesUtil.js'

// -- Views ------------------------------------------------------------
export * from '@web3modal-x/scaffold-ui'

// -- Utils & Other -----------------------------------------------------
export type * from '@web3modal-x/core'
export { CoreHelperUtil } from '@web3modal-x/core'

type CreateWeb3Modal = Omit<AppKitOptions, 'sdkType' | 'sdkVersion'>

export function createWeb3Modal(options: CreateWeb3Modal) {
  return new AppKit({
    ...options,
    sdkType: 'w3m',
    sdkVersion: `html-multichain-${ConstantsUtil.VERSION}`
  })
}

export { AppKit }
export type { AppKitOptions }
