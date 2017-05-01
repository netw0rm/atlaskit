/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {DropdownWrapper} from './styled';

import {CardAction} from '@atlaskit/media-core';

import * as DropdownItem from '@atlaskit/droplist-item';
import * as DropdownGroup from '@atlaskit/droplist-group';
import {CardEventHandler} from '@atlaskit/media-core';

export interface DropdownProps {
  items?: Array<CardAction>;
}

export class Dropdown extends Component<DropdownProps, {}> {
  render() {
    const Group: any = (DropdownGroup as any).default;

    const items = this.props.items ? this.props.items.map((item, k) => this._itemElement(k, item.label, item.handler)) : null;

    return (
      <DropdownWrapper className={'dropdown'}>
        <Group>
          {items}
        </Group>
      </DropdownWrapper>
    );
  }

  private _itemElement(key: number, name: string | undefined, handler: CardEventHandler) {
    const Item: any = (DropdownItem as any).default;

    return (
      <Item onActivate={handler} key={`${name}-${key}`}>{name}</Item>
    );
  }
}
