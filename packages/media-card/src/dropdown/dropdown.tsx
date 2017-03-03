/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {DropdownWrapper} from './styled';

import {CardAction, CardEventHandler} from '@atlaskit/media-core';
import {Group, Item} from '@atlaskit/droplist';

export interface DropdownProps {
  items?: Array<CardAction>;
}

export class Dropdown extends Component<DropdownProps, {}> {
  render() {
    const items = this.props.items ? this.props.items.map(item => this._itemElement(item.label, item.handler)) : null;

    return (
      <DropdownWrapper className={'dropdown'}>
        <Group>
          {items}
        </Group>
      </DropdownWrapper>
    );
  }

  private _itemElement(name: string | undefined, handler: CardEventHandler) {
    return (
      <Item onActivate={handler} key={name}>{name}</Item>
    );
  }
}
