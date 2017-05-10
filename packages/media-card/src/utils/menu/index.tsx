import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, CardActionType, CardEventHandler} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Icon from '@atlaskit/icon';
import DropdownMenu from '@atlaskit/dropdown-menu';

import {
  Wrapper,
  DeleteBtn,
  MeatBallsWrapper
} from './styled';

export interface MenuProps {
  actions?: Array<CardAction>;
  onToggle?: (attrs: {isOpen: boolean}) => void;

  deleteBtnColor?: string;
}

export class Menu extends Component<MenuProps, {}> {
  static defaultProps = {
    actions: [],
    onToggle: () => null
  };

  render() {
    const actions = this.props.actions || [];

    if (!actions.length) { return null; }

    const content = this.shouldRenderDeleteButton(actions) ? this.renderDeleteButton(actions[0]) : this.renderDropdown(actions);

    return (
      <Wrapper>
        {content}
      </Wrapper>
    );
  }

  private renderDeleteButton(action) {
    return (
      <DeleteBtn onClick={this.deleteBtnClick(action.handler)} style={{color: this.props.deleteBtnColor}} >
        <Icon glyph={CrossIcon} size="small" label="delete" />
      </DeleteBtn>
    );
  }

  private renderDropdown(actions: Array<CardAction>) {
    const items = actions.map(i => ({content: i.label, handler: i.handler}));
    const dropdownItems = [{items}];

    return (
      <DropdownMenu
        items={dropdownItems}
        onOpenChange={this.props.onToggle}
        onItemActivated={this.onItemActivated}
        triggerType="button"
        triggerButtonProps={{
          className: 'meat-balls-button',
          appearance: 'subtle',
          iconBefore: this.renderIconBefore()
        }}
      />
    );
  }

  private shouldRenderDeleteButton(actions: Array<CardAction>) {
    return actions.length === 1 && actions[0].type === CardActionType.delete;
  }

  private renderIconBefore = () => {
    return (
      <MeatBallsWrapper>
        <Icon glyph={MoreIcon} label="more"/>
      </MeatBallsWrapper>
    );
  }

  private deleteBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handler();
    };
  }

  private onItemActivated = (attrs) => {
    if (attrs.item && attrs.item.handler) { attrs.item.handler(); }
  }
}

export default Menu;
