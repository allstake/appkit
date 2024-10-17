import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'

import styles from './styles.js'

@customElement('w3mx-account-activity-widget')
export class W3mAccountActivityWidget extends LitElement {
  public static override styles = styles

  // -- Render -------------------------------------------- //
  public override render() {
    return html`<w3mx-activity-list page="account"></w3mx-activity-list>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-account-activity-widget': W3mAccountActivityWidget
  }
}
