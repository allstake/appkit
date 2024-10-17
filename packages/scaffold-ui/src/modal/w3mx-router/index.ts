import type { RouterControllerState } from '@web3modal-x/core'
import { RouterController, TooltipController } from '@web3modal-x/core'
import { customElement } from '@web3modal-x/ui'
import { LitElement, html } from 'lit'
import { state } from 'lit/decorators.js'
import styles from './styles.js'
import { ConstantsUtil } from '../../utils/ConstantsUtil.js'

@customElement('w3mx-router')
export class W3mRouter extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private resizeObserver?: ResizeObserver = undefined

  private prevHeight = '0px'

  private prevHistoryLength = 1

  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @state() private view = RouterController.state.view

  @state() private viewDirection = ''

  public constructor() {
    super()
    this.unsubscribe.push(RouterController.subscribeKey('view', val => this.onViewChange(val)))
  }

  public override firstUpdated() {
    this.resizeObserver = new ResizeObserver(([content]) => {
      const height = `${content?.contentRect.height}px`
      if (this.prevHeight !== '0px') {
        this.style.setProperty('--prev-height', this.prevHeight)
        this.style.setProperty('--new-height', height)
        this.style.animation = 'w3mx-view-height 150ms forwards ease'
        this.style.height = 'auto'
      }
      setTimeout(() => {
        this.prevHeight = height
        this.style.animation = 'unset'
      }, ConstantsUtil.ANIMATION_DURATIONS.ModalHeight)
    })
    this.resizeObserver.observe(this.getWrapper())
  }

  public override disconnectedCallback() {
    this.resizeObserver?.unobserve(this.getWrapper())
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`<div class="w3mx-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`
  }

  // -- Private ------------------------------------------- //
  private viewTemplate() {
    switch (this.view) {
      case 'AccountSettings':
        return html`<w3mx-account-settings-view></w3mx-account-settings-view>`
      case 'Account':
        return html`<w3mx-account-view></w3mx-account-view>`
      case 'AllWallets':
        return html`<w3mx-all-wallets-view></w3mx-all-wallets-view>`
      case 'ApproveTransaction':
        return html`<w3mx-approve-transaction-view></w3mx-approve-transaction-view>`
      case 'BuyInProgress':
        return html`<w3mx-buy-in-progress-view></w3mx-buy-in-progress-view>`
      case 'ChooseAccountName':
        return html`<w3mx-choose-account-name-view></w3mx-choose-account-name-view>`
      case 'Connect':
        return html`<w3mx-connect-view></w3mx-connect-view>`
      case 'ConnectingWalletConnect':
        return html`<w3mx-connecting-wc-view></w3mx-connecting-wc-view>`
      case 'ConnectingExternal':
        return html`<w3mx-connecting-external-view></w3mx-connecting-external-view>`
      case 'ConnectingSiwe':
        return html`<w3mx-connecting-siwe-view></w3mx-connecting-siwe-view>`
      case 'ConnectWallets':
        return html`<w3mx-connect-wallets-view></w3mx-connect-wallets-view>`
      case 'ConnectSocials':
        return html`<w3mx-connect-socials-view></w3mx-connect-socials-view>`
      case 'ConnectingSocial':
        return html`<w3mx-connecting-social-view></w3mx-connecting-social-view>`
      case 'Downloads':
        return html`<w3mx-downloads-view></w3mx-downloads-view>`
      case 'EmailVerifyOtp':
        return html`<w3mx-email-verify-otp-view></w3mx-email-verify-otp-view>`
      case 'EmailVerifyDevice':
        return html`<w3mx-email-verify-device-view></w3mx-email-verify-device-view>`
      case 'GetWallet':
        return html`<w3mx-get-wallet-view></w3mx-get-wallet-view>`
      case 'Networks':
        return html`<w3mx-networks-view></w3mx-networks-view>`
      case 'SwitchNetwork':
        return html`<w3mx-network-switch-view></w3mx-network-switch-view>`
      case 'Profile':
        return html`<w3mx-profile-view></w3mx-profile-view>`
      case 'SelectAddresses':
        return html`<w3mx-select-addresses-view></w3mx-select-addresses-view>`
      case 'SwitchAddress':
        return html`<w3mx-switch-address-view></w3mx-switch-address-view>`
      case 'Transactions':
        return html`<w3mx-transactions-view></w3mx-transactions-view>`
      case 'OnRampProviders':
        return html`<w3mx-onramp-providers-view></w3mx-onramp-providers-view>`
      case 'OnRampActivity':
        return html`<w3mx-onramp-activity-view></w3mx-onramp-activity-view>`
      case 'OnRampTokenSelect':
        return html`<w3mx-onramp-token-select-view></w3mx-onramp-token-select-view>`
      case 'OnRampFiatSelect':
        return html`<w3mx-onramp-fiat-select-view></w3mx-onramp-fiat-select-view>`
      case 'UpgradeEmailWallet':
        return html`<w3mx-upgrade-wallet-view></w3mx-upgrade-wallet-view>`
      case 'UpgradeToSmartAccount':
        return html`<w3mx-upgrade-to-smart-account-view></w3mx-upgrade-to-smart-account-view>`
      case 'UpdateEmailWallet':
        return html`<w3mx-update-email-wallet-view></w3mx-update-email-wallet-view>`
      case 'UpdateEmailPrimaryOtp':
        return html`<w3mx-update-email-primary-otp-view></w3mx-update-email-primary-otp-view>`
      case 'UpdateEmailSecondaryOtp':
        return html`<w3mx-update-email-secondary-otp-view></w3mx-update-email-secondary-otp-view>`
      case 'UnsupportedChain':
        return html`<w3mx-unsupported-chain-view></w3mx-unsupported-chain-view>`
      case 'Swap':
        return html`<w3mx-swap-view></w3mx-swap-view>`
      case 'SwapSelectToken':
        return html`<w3mx-swap-select-token-view></w3mx-swap-select-token-view>`
      case 'SwapPreview':
        return html`<w3mx-swap-preview-view></w3mx-swap-preview-view>`
      case 'WalletSend':
        return html`<w3mx-wallet-send-view></w3mx-wallet-send-view>`
      case 'WalletSendSelectToken':
        return html`<w3mx-wallet-send-select-token-view></w3mx-wallet-send-select-token-view>`
      case 'WalletSendPreview':
        return html`<w3mx-wallet-send-preview-view></w3mx-wallet-send-preview-view>`
      case 'WhatIsABuy':
        return html`<w3mx-what-is-a-buy-view></w3mx-what-is-a-buy-view>`
      case 'WalletReceive':
        return html`<w3mx-wallet-receive-view></w3mx-wallet-receive-view>`
      case 'WalletCompatibleNetworks':
        return html`<w3mx-wallet-compatible-networks-view></w3mx-wallet-compatible-networks-view>`
      case 'WhatIsAWallet':
        return html`<w3mx-what-is-a-wallet-view></w3mx-what-is-a-wallet-view>`
      case 'ConnectingMultiChain':
        return html`<w3mx-connecting-multi-chain-view></w3mx-connecting-multi-chain-view>`
      case 'WhatIsANetwork':
        return html`<w3mx-what-is-a-network-view></w3mx-what-is-a-network-view>`
      case 'ConnectingFarcaster':
        return html`<w3mx-connecting-farcaster-view></w3mx-connecting-farcaster-view>`
      case 'SwitchActiveChain':
        return html`<w3mx-switch-active-chain-view></w3mx-switch-active-chain-view>`
      case 'RegisterAccountName':
        return html`<w3mx-register-account-name-view></w3mx-register-account-name-view>`
      case 'RegisterAccountNameSuccess':
        return html`<w3mx-register-account-name-success-view></w3mx-register-account-name-success-view>`
      default:
        return html`<w3mx-connect-view></w3mx-connect-view>`
    }
  }

  private onViewChange(newView: RouterControllerState['view']) {
    TooltipController.hide()

    let direction = ConstantsUtil.VIEW_DIRECTION.Next
    const { history } = RouterController.state
    if (history.length < this.prevHistoryLength) {
      direction = ConstantsUtil.VIEW_DIRECTION.Prev
    }

    this.prevHistoryLength = history.length
    this.viewDirection = direction

    setTimeout(() => {
      this.view = newView
    }, ConstantsUtil.ANIMATION_DURATIONS.ViewTransition)
  }

  private getWrapper() {
    return this.shadowRoot?.querySelector('div') as HTMLElement
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-router': W3mRouter
  }
}
