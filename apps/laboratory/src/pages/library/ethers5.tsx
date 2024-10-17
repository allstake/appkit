import { createWeb3Modal, defaultConfig } from '@web3modal-x/ethers5/react'
import { AppKitButtons } from '../../components/AppKitButtons'
import { ThemeStore } from '../../utils/StoreUtil'
import { EthersConstants } from '../../utils/EthersConstants'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { Ethers5ModalInfo } from '../../components/Ethers/Ethers5ModalInfo'
import { Ethers5Tests } from '../../components/Ethers/Ethers5Tests'

const modal = createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata: ConstantsUtil.Metadata,
    defaultChainId: 1,
    chains: EthersConstants.chains,
    coinbasePreference: 'smartWalletOnly'
  }),
  defaultChain: EthersConstants.chains[0],
  chains: EthersConstants.chains,
  projectId: ConstantsUtil.ProjectId,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  termsConditionsUrl: 'https://walletconnect.com/terms',
  privacyPolicyUrl: 'https://walletconnect.com/privacy',
  customWallets: ConstantsUtil.CustomWallets
})

ThemeStore.setModal(modal)

export default function Ethers() {
  return (
    <>
      <AppKitButtons />
      <Ethers5ModalInfo />
      <Ethers5Tests />
    </>
  )
}
