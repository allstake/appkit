import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'

import styles from './styles.js'

@customElement('w3mx-transactions-view')
export class W3mTransactionsView extends LitElement {
  public static override styles = styles

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" .padding=${['0', 'm', 'm', 'm']} gap="s">
        <w3mx-activity-list page="activity"></w3mx-activity-list>
      </wui-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-transactions-view': W3mTransactionsView
  }
}
