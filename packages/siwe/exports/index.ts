import type { SIWEConfig } from '../core/utils/TypeUtils.js'
import { Web3ModalSIWEClient } from '../src/client.js'
export {
  getAddressFromMessage,
  getChainIdFromMessage,
  verifySignature
} from '../core/helpers/index.js'
export { formatMessage, getDidChainId, getDidAddress } from '@walletconnect/utils'
export { SIWEController, type SIWEControllerClient } from '../core/controller/SIWEController.js'
export * from '../core/utils/TypeUtils.js'

export type { Web3ModalSIWEClient }

export function createSIWEConfig(siweConfig: SIWEConfig) {
  return new Web3ModalSIWEClient(siweConfig)
}

export * from '../scaffold/partials/w3mx-connecting-siwe/index.js'
export * from '../scaffold/views/w3mx-connecting-siwe-view/index.js'
