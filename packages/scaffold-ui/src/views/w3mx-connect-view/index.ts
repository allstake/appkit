import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { ConnectorController, RouterController } from '@web3modal-x/core'
import { state } from 'lit/decorators/state.js'

@customElement('w3mx-connect-view')
export class W3mConnectView extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @state() private connectors = ConnectorController.state.connectors

  public constructor() {
    super()
    this.unsubscribe.push(
      ConnectorController.subscribeKey('connectors', val => (this.connectors = val))
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" .padding=${['3xs', 's', 's', 's']}>
        <w3mx-email-login-widget></w3mx-email-login-widget>
        <w3mx-social-login-widget></w3mx-social-login-widget>
        ${this.walletListTemplate()}
      </wui-flex>
      <w3mx-legal-footer></w3mx-legal-footer>
    `
  }

  // -- Private ------------------------------------------- //
  private walletListTemplate() {
    const authConnector = this.connectors.find(c => c.type === 'AUTH')

    if (authConnector?.socials) {
      if (authConnector?.showWallets) {
        return html`
          <wui-flex flexDirection="column" gap="xs" .margin=${['xs', '0', '0', '0'] as const}>
            <w3mx-connector-list></w3mx-connector-list>
            <wui-flex class="all-wallets">
              <w3mx-all-wallets-widget></w3mx-all-wallets-widget>
            </wui-flex>
          </wui-flex>
        `
      }

      return html`<wui-list-button
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`
    }

    return html`<w3mx-wallet-login-list></w3mx-wallet-login-list>`
  }

  // -- Private Methods ----------------------------------- //
  private onContinueWalletClick() {
    RouterController.push('ConnectWallets')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-connect-view': W3mConnectView
  }
}
