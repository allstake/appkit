import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { ConstantsUtil } from '../../../src/utils/ConstantsUtil'
import { getMaximumWaitConnections } from '../utils/timeouts'
import { verifySignature } from '../../../src/utils/SignatureUtil'

const MAX_WAIT = getMaximumWaitConnections()

export class ModalValidator {
  constructor(public readonly page: Page) {}

  async expectConnected() {
    const accountButton = this.page.locator('w3mx-account-button')
    await expect(accountButton, 'Account button should be present').toBeAttached({
      timeout: MAX_WAIT
    })
    await expect(
      this.page.getByTestId('connect-button'),
      'Connect button should not be present'
    ).toBeHidden({
      timeout: MAX_WAIT
    })
    await this.page.waitForTimeout(500)
  }

  async expectAuthenticated() {
    await expect(
      this.page.getByTestId('w3mx-authentication-status'),
      'Authentication status should be: authenticated'
    ).toContainText('authenticated')
  }

  async expectUnauthenticated() {
    await expect(
      this.page.getByTestId('w3mx-authentication-status'),
      'Authentication status should be: unauthenticated'
    ).toContainText('unauthenticated')
  }

  async expectSignatureDeclined() {
    await expect(
      this.page.getByText('Signature declined'),
      'Signature declined should be visible'
    ).toBeVisible()
  }

  async expectDisconnected() {
    await expect(
      this.page.getByTestId('connect-button'),
      'Connect button should be present'
    ).toBeVisible({
      timeout: MAX_WAIT
    })
  }

  async expectConnectScreen() {
    await expect(this.page.getByText('Connect Wallet')).toBeVisible({
      timeout: MAX_WAIT
    })
  }

  async expectAddress(expectedAddress: string) {
    const address = this.page.getByTestId('w3mx-address')

    await expect(address, 'Correct address should be present').toHaveText(expectedAddress)
  }

  async expectNetwork(network: string) {
    const networkButton = this.page.getByTestId('w3mx-account-select-network')
    await expect(networkButton, `Network button should contain text ${network}`).toHaveText(
      network,
      {
        timeout: 5000
      }
    )
  }

  async expectAcceptedSign() {
    // We use Chakra Toast and it's not quite straightforward to set the `data-testid` attribute on the toast element.
    await expect(this.page.getByText(ConstantsUtil.SigningSucceededToastTitle)).toBeVisible({
      timeout: 30 * 1000
    })
    const closeButton = this.page.locator('#toast-close-button')

    await expect(closeButton).toBeVisible()
    await closeButton.click()
  }

  async expectRejectedSign() {
    // We use Chakra Toast and it's not quite straightforward to set the `data-testid` attribute on the toast element.
    await expect(this.page.getByText(ConstantsUtil.SigningFailedToastTitle)).toBeVisible()
  }

  async expectSwitchedNetwork(network: string) {
    const switchNetworkButton = this.page.getByTestId('w3mx-account-select-network')
    await expect(switchNetworkButton).toBeVisible()
    await expect(switchNetworkButton).toHaveAttribute('active-network', network)
  }

  expectSecureSiteFrameNotInjected() {
    const secureSiteIframe = this.page.frame({ name: 'w3mx-secure-iframe' })
    expect(secureSiteIframe).toBeNull()
  }

  async expectNoSocials() {
    const socialList = this.page.getByTestId('wui-list-social')
    await expect(socialList).toBeHidden()
  }

  async expectEmailLogin() {
    const emailInput = this.page.getByTestId('wui-email-input')
    await expect(emailInput).toBeVisible()
  }

  async expectValidSignature(signature: `0x${string}`, address: `0x${string}`, chainId: number) {
    const isVerified = await verifySignature({
      address,
      message: 'Hello AppKit!',
      signature,
      chainId
    })

    expect(isVerified).toBe(true)
  }

  async expectExternalVisible() {
    const externalConnector = this.page.getByTestId(/^wallet-selector-external/u)
    await expect(externalConnector).toBeVisible()
  }

  async expectMultipleAccounts() {
    await this.page.waitForTimeout(500)
    await expect(this.page.getByText('Switch Address')).toBeVisible({
      timeout: MAX_WAIT
    })

    expect(this.page.getByTestId('switch-address-item').first()).toBeVisible()
    const accounts = await this.page.getByTestId('switch-address-item').all()

    expect(accounts.length).toBeGreaterThan(1)
  }

  async expectNetworkNotSupportedVisible() {
    const networkNotSupportedMessage = this.page.getByText(
      'This app doesn’t support your current network. Switch to an available option to continue.'
    )
    await expect(
      networkNotSupportedMessage,
      'Network not supported message should be visible'
    ).toBeVisible()
  }

  async expectAccountPageVisible() {
    const switchNetworkButton = this.page.getByTestId('w3mx-account-select-network')
    await expect(switchNetworkButton).toBeVisible()
  }

  async expectOnrampButton(_library: string) {
    const onrampButton = this.page.getByTestId('w3mx-account-default-onramp-button')
    await expect(onrampButton).toBeVisible()
  }

  async expectAccountNameFound(name: string) {
    const suggestion = this.page.getByTestId('account-name-suggestion').getByText(name)
    await expect(suggestion).toBeVisible()
  }

  async expectCallStatusSuccessOrRetry(sendCallsId: string, allowedRetry: boolean) {
    const callStatusReceipt = this.page.getByText('"status": "CONFIRMED"')
    const isConfirmed = await callStatusReceipt.isVisible({
      timeout: 10 * 1000
    })
    if (isConfirmed) {
      const closeButton = this.page.locator('#toast-close-button')

      await expect(closeButton).toBeVisible()
      await closeButton.click()
    } else if (allowedRetry) {
      const callStatusButton = this.page.getByTestId('get-calls-status-button')
      await expect(callStatusButton).toBeVisible()
      await callStatusButton.click()
      this.expectCallStatusSuccessOrRetry(sendCallsId, false)
    }

    throw new Error('Call status not confirmed')
  }

  async expectNetworksDisabled(name: string) {
    const networkOptions = this.page.getByTestId(`w3mx-network-switch-${name}`)
    await expect(networkOptions).toBeDisabled()
  }

  async expectConnectButtonLoading() {
    const connectButton = this.page.getByTestId('connect-button')
    await expect(connectButton).toContainText('Connecting...')
  }

  async expectAccountSwitched(oldAddress: string) {
    const address = this.page.getByTestId('w3mx-address')
    await expect(address).not.toHaveText(oldAddress)
  }

  async expectSocialsVisible() {
    const socials = this.page.getByTestId('w3mx-social-login-widget')
    await expect(socials).toBeVisible()
  }
}
