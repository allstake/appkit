import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'

@customElement('w3mx-wallet-login-list')
export class W3mWalletLoginList extends LitElement {
  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" gap="xs">
        <w3mx-connector-list></w3mx-connector-list>
        <w3mx-all-wallets-widget></w3mx-all-wallets-widget>
      </wui-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-wallet-login-list': W3mWalletLoginList
  }
}
