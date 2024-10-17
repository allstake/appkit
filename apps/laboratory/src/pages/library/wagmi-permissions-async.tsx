import { createWeb3Modal } from '@web3modal-x/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { AppKitButtons } from '../../components/AppKitButtons'
import { ThemeStore } from '../../utils/StoreUtil'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { getWagmiConfig } from '../../utils/WagmiConstants'
import { ERC7715PermissionsProvider } from '../../context/ERC7715PermissionsContext'
import { walletConnect } from '@wagmi/connectors'
import { OPTIONAL_METHODS } from '@walletconnect/ethereum-provider'
import { WagmiPermissionsAsyncTest } from '../../components/Wagmi/WagmiPermissionsAsyncTest'
import { LocalEcdsaKeyProvider } from '../../context/LocalEcdsaKeyContext'

const queryClient = new QueryClient()
const connectors = [
  walletConnect({
    projectId: ConstantsUtil.ProjectId,
    metadata: ConstantsUtil.Metadata,
    showQrModal: false,
    // @ts-expect-error: Overridding optionalMethods
    optionalMethods: [...OPTIONAL_METHODS, 'wallet_grantPermissions']
  })
]
const wagmiEmailConfig = getWagmiConfig('email', { connectors })
const modal = createWeb3Modal({
  wagmiConfig: wagmiEmailConfig,
  projectId: ConstantsUtil.ProjectId,
  enableAnalytics: true,
  metadata: ConstantsUtil.Metadata,
  termsConditionsUrl: 'https://walletconnect.com/terms',
  privacyPolicyUrl: 'https://walletconnect.com/privacy'
})

ThemeStore.setModal(modal)

export default function Wagmi() {
  return (
    <WagmiProvider config={wagmiEmailConfig}>
      <QueryClientProvider client={queryClient}>
        <ERC7715PermissionsProvider>
          <LocalEcdsaKeyProvider>
            <AppKitButtons />
            <WagmiPermissionsAsyncTest />
          </LocalEcdsaKeyProvider>
        </ERC7715PermissionsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
