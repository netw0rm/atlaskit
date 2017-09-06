import * as React from 'react';
import {ReactNode} from 'react';
import {Component, MouseEvent} from 'react';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';

import {Wrapper} from '../styled/Menu';

export interface MenuItem {
  content: ReactNode;
  handler: () => void;
}

export interface ActionMenuProps {
  theme?: 'dark' | 'default';
  compact?: boolean;
  items?: Array<MenuItem>;
  onOpenChange?: (attrs: {isOpen: boolean}) => void;
}

export class Menu extends Component<ActionMenuProps, {}> {

  static defaultProps: Partial<ActionMenuProps> = {
    theme: 'default',
    compact: false,
    items: []
  };

  handleMenuToggle(event: MouseEvent<HTMLDivElement>) {

    // we don't want the `click` event to bubble up to the card `click` handler
    event.preventDefault();
    event.stopPropagation();

  }

  handleMenuAction({item}) {
    item.handler();
  }

  render() {
    const {theme, compact, items = [], onOpenChange} = this.props;
    return (
      <Wrapper compact={compact} onClick={this.handleMenuToggle}>
        <DropdownMenu
          items={[{items}]}
          onOpenChange={onOpenChange}
          onItemActivated={this.handleMenuAction}
        >
          <Button
            theme={theme}
            appearance="subtle"
            spacing={compact ? 'compact' : 'default'}
            iconBefore={<MoreIcon label="more" size="medium"/>}
          />
        </DropdownMenu>
      </Wrapper>
    );
  }

}
