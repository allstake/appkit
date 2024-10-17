import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { AppKit } from '../src/client.js'
import type { AppKitOptions } from '../utils/TypesUtil.js'
import { getWeb3Modal } from '../utils/library/vue/index.js'

// -- Views ------------------------------------------------------------
export * from '@web3modal-x/scaffold-ui'

// -- Hooks ------------------------------------------------------------
export * from '../utils/library/vue/index.js'

// -- Utils & Other -----------------------------------------------------
export type * from '@web3modal-x/core'
export { CoreHelperUtil } from '@web3modal-x/core'

let modal: AppKit | undefined = undefined

type CreateWeb3Modal = Omit<AppKitOptions, 'sdkType' | 'sdkVersion'>

export function createWeb3Modal(options: CreateWeb3Modal) {
  if (!modal) {
    modal = new AppKit({
      ...options,
      sdkType: 'w3m',
      sdkVersion: `vue-multichain-${ConstantsUtil.VERSION}`
    })
    getWeb3Modal(modal)
  }

  return modal
}

export { AppKit }
export type { AppKitOptions }
