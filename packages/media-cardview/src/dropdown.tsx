import * as React from 'react';
import {Component} from 'react';
import * as styles from 'style!./styles.less';
import {Actions} from '@atlaskit/media-domain';

import * as DropdownItem from '@atlaskit/droplist-item';
import * as DropdownGroup from '@atlaskit/droplist-group';

export interface DropdownProps {
  items?: Array<Actions.CardAction>;
}

export class Dropdown extends Component<DropdownProps, {}> {
  render() {
    const group: any = (DropdownGroup as any).default;

    const items = this.props.items ? this.props.items.map(item => this._itemElement(item.label, item.handler)) : null;

    return (
      <div className={styles['dropdown']}>
        <group>
          {items}
        </group>
      </div>
    );
  }

  private _itemElement(name: string | undefined, handler: Actions.CardEventHandler) {
    const item: any = (DropdownItem as any).default;

    return (
      <item onActivate={handler} key={name}>{name}</item>
    );
  }
}
