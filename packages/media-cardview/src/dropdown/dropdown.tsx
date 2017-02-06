import * as React from 'react';
import {Component} from 'react';
import styles from 'style!./dropdown.less'; // MEDIA-FIX
import {Actions} from '@atlaskit/media-domain'; // MEDIA-FIX

import * as DropdownItem from '@atlaskit/droplist-item';
import * as DropdownGroup from '@atlaskit/droplist-group';

export interface DropdownProps {
  items: Array<Actions.CardAction>;
}

export class Dropdown extends Component<DropdownProps, {}> {
  render() {
    const Group: any = (DropdownGroup as any).default;

    const items = this.props.items.map(item => this._itemElement(item.label, item.handler));

    return (
      <div className={styles['dropdown']}>
        <Group>
          {items}
        </Group>
      </div>
    );
  }

  private _itemElement(name: string, handler: Actions.CardEventHandler) {
    const Item: any = (DropdownItem as any).default;

    return (
      <Item onActivate={handler} key={name}>{name}</Item>
    );
  }
}
