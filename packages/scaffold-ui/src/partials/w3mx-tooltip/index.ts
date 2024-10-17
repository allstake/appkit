import { html, LitElement } from 'lit'
import { TooltipController } from '@web3modal-x/core'
import { customElement } from '@web3modal-x/ui'
import { state } from 'lit/decorators.js'
import styles from './styles.js'

@customElement('w3mx-tooltip')
export class W3mTooltip extends LitElement {
  public static override styles = [styles]

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @state() private open = TooltipController.state.open

  @state() private message = TooltipController.state.message

  @state() private triggerRect = TooltipController.state.triggerRect

  @state() private variant = TooltipController.state.variant

  public constructor() {
    super()
    this.unsubscribe.push(
      ...[
        TooltipController.subscribe(newState => {
          this.open = newState.open
          this.message = newState.message
          this.triggerRect = newState.triggerRect
          this.variant = newState.variant
        })
      ]
    )
  }

  // -- Lifecycle ----------------------------------------- //
  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    this.dataset['variant'] = this.variant

    const topValue = this.triggerRect.top
    const leftValue = this.triggerRect.left

    this.style.cssText = `
    --w3mx-tooltip-top: ${topValue}px;
    --w3mx-tooltip-left: ${leftValue}px;
    --w3mx-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3mx-tooltip-display: ${this.open ? 'flex' : 'none'};
    --w3mx-tooltip-opacity: ${this.open ? 1 : 0};
    `

    return html`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3mx-tooltip': W3mTooltip
  }
}
