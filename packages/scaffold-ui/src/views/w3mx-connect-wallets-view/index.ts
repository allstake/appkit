import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'

import styles from './styles.js'

@customElement('w3mx-connect-wallets-view')
export class W3mConnectWalletsView extends LitElement {
  public static override styles = styles

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" padding="s" gap="xs">
        <w3mx-wallet-login-list></w3mx-wallet-login-list>
      </wui-flex>
      <w3mx-legal-footer></w3mx-legal-footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-connect-wallets-view': W3mConnectWalletsView
  }
}
