import { ConnectorController, StorageUtil } from '@web3modal-x/core'
import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'

@customElement('w3mx-account-view')
export class W3mAccountView extends LitElement {
  // -- Render -------------------------------------------- //

  public override render() {
    const type = StorageUtil.getConnectedConnector()
    const authConnector = ConnectorController.getAuthConnector()

    return html`
      ${authConnector?.walletFeatures && type === 'AUTH'
        ? this.walletFeaturesTemplate()
        : this.defaultTemplate()}
    `
  }

  // -- Private ------------------------------------------- //
  private walletFeaturesTemplate() {
    return html`<w3mx-account-wallet-features-widget></w3mx-account-wallet-features-widget>`
  }

  private defaultTemplate() {
    return html`<w3mx-account-default-widget></w3mx-account-default-widget>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-account-view': W3mAccountView
  }
}
