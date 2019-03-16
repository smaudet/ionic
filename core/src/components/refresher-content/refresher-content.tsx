import { Component, ComponentInterface, Host, Prop, getMode, h } from '@stencil/core';

import { getContext } from '../../global/context';
import { SpinnerTypes } from '../../interface';

@Component({
  tag: 'ion-refresher-content'
})
export class RefresherContent implements ComponentInterface {

  private mode = getMode(this);
  private config = getContext(this, 'config');

  /**
   * A static icon to display when you begin to pull down
   */
  @Prop({ mutable: true }) pullingIcon?: string | null;

  /**
   * The text you want to display when you begin to pull down
   */
  @Prop() pullingText?: string;

  /**
   * An animated SVG spinner that shows when refreshing begins
   */
  @Prop({ mutable: true }) refreshingSpinner?: SpinnerTypes | null;

  /**
   * The text you want to display when performing a refresh
   */
  @Prop() refreshingText?: string;

  componentWillLoad() {
    if (this.pullingIcon === undefined) {
      this.pullingIcon = this.config.get('refreshingIcon', 'arrow-down');
    }
    if (this.refreshingSpinner === undefined) {
      this.refreshingSpinner = this.config.get(
        'refreshingSpinner',
        this.config.get('spinner', this.mode === 'ios' ? 'lines' : 'crescent')
      );
    }
  }

  render() {
    return (
      <Host>
        <div class="refresher-pulling">
          {this.pullingIcon &&
            <div class="refresher-pulling-icon">
              <ion-icon icon={this.pullingIcon} lazy={false}></ion-icon>
            </div>
          }
          {this.pullingText &&
            <div class="refresher-pulling-text" innerHTML={this.pullingText}></div>
          }
        </div>
        <div class="refresher-refreshing">
          {this.refreshingSpinner &&
            <div class="refresher-refreshing-icon">
              <ion-spinner name={this.refreshingSpinner}></ion-spinner>
            </div>
          }
          {this.refreshingText &&
            <div class="refresher-refreshing-text" innerHTML={this.refreshingText}></div>
          }
        </div>
      </Host>
    );
  }
}
