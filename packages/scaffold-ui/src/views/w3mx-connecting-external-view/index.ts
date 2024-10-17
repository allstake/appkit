import type { BaseError } from '@web3modal-x/core'
import {
  ConnectionController,
  EventsController,
  ModalController,
  OptionsController,
  RouterController
} from '@web3modal-x/core'
import { ConstantsUtil } from '@web3modal-x/scaffold-utils'
import { customElement } from '@web3modal-x/ui'
import { W3mConnectingWidget } from '../../utils/w3mx-connecting-widget/index.js'

@customElement('w3mx-connecting-external-view')
export class W3mConnectingExternalView extends W3mConnectingWidget {
  public constructor() {
    super()
    if (!this.connector) {
      throw new Error('w3mx-connecting-view: No connector provided')
    }

    EventsController.sendEvent({
      type: 'track',
      event: 'SELECT_WALLET',
      properties: {
        name: this.connector.name ?? 'Unknown',
        platform: 'browser'
      }
    })
    this.onConnect = this.onConnectProxy.bind(this)
    this.onAutoConnect = this.onConnectProxy.bind(this)
    this.isWalletConnect = false
  }

  // -- Private ------------------------------------------- //
  private async onConnectProxy() {
    try {
      this.error = false
      if (this.connector) {
        /**
         * Coinbase SDK works with popups and popups requires user interaction to be opened since modern browsers block popups which triggered programmatically.
         * Instead of opening a popup in first render for `W3mConnectingWidget`, we need to trigger connection for Coinbase connector specifically when users select it.
         * And if there is an error, this condition will be skipped and the connection will be triggered as usual because we have `Try again` button in this view which is a user interaction as well.
         */
        if (this.connector.id !== ConstantsUtil.COINBASE_SDK_CONNECTOR_ID || !this.error) {
          await ConnectionController.connectExternal(this.connector, this.connector.chain)

          if (OptionsController.state.isSiweEnabled) {
            RouterController.push('ConnectingSiwe')
          } else {
            ModalController.close()
          }

          EventsController.sendEvent({
            type: 'track',
            event: 'CONNECT_SUCCESS',
            properties: { method: 'browser', name: this.connector.name || 'Unknown' }
          })
        }
      }
    } catch (error) {
      EventsController.sendEvent({
        type: 'track',
        event: 'CONNECT_ERROR',
        properties: { message: (error as BaseError)?.message ?? 'Unknown' }
      })
      this.error = true
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-connecting-external-view': W3mConnectingExternalView
  }
}
