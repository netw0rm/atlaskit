import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as cx from 'classnames';
import {CardAction, CardActionType, CardEventHandler} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Icon from '@atlaskit/icon/lib/Icon';

import {Dropdown} from './dropdown';
import {
  Wrapper,
  MeatballsButton,
  DropdownWrapper,
  DeleteBtn
} from './styled';

export interface MenuProps {
  actions?: Array<CardAction>;
  onToggle?: (newState: MenuState) => void;

  deleteBtnColor?: string;
}

export interface MenuState {
  isExpanded: boolean;
}

export class Menu extends Component<MenuProps, MenuState> {
  private clickDetector: (e: Event) => void;

  static defaultProps = {
    actions: [],
    onToggle: () => null
  };

  constructor(props: MenuProps) {
    super(props);

    this.state = { isExpanded: false };
  }

  render() {
    return (
      <Wrapper>
        {this.actionBtn()}
        {this.dropdown()}
      </Wrapper>
    );
  }

  private actionBtn() {
    const actions = this.props.actions || [];

    if (!actions.length) {
      return null;
    }

    if (this.shouldRenderDeleteButton()) {
      const deleteAction = actions[0];

      return (
        <DeleteBtn onClick={this.deleteBtnClick(deleteAction.handler)} style={{color: this.props.deleteBtnColor}} >
          <Icon glyph={CrossIcon} label="cross" />
        </DeleteBtn>
      );
    }

    const {isExpanded} = this.state;
    const meatballBtnClasses: string = cx('more-btn', {active: isExpanded});

    return (
      <MeatballsButton
        className={meatballBtnClasses}
        onClick={this.meatballBtnClick}
      >
        <Icon glyph={MoreIcon} label="more"/>
      </MeatballsButton>
    );
  }

  private shouldRenderDeleteButton() {
    const actions = this.props.actions || [];
    return actions.length === 1 && actions[0].type === CardActionType.delete;
  }

  private deleteBtnClick(handler: CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handler();
    };
  }

  private meatballBtnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const {isExpanded} = this.state;

    if (isExpanded) {    // we should remove handlers
      document.removeEventListener('click', this.clickDetector);
    } else {    // we should add handlers on clicking outside of element
      this.clickDetector = this.newClickDetector.bind(this);
      document.addEventListener('click', this.clickDetector);
    }

    this.updateStateAndFireToggleEvent();
  }

  private newClickDetector(e: Event) {
    this.updateStateAndFireToggleEvent();
    document.removeEventListener('click', this.clickDetector);
  }

  private updateStateAndFireToggleEvent() {
    // explicit cast required as tsc does not pickup on default props
    const onToggle = this.props.onToggle as (newState: MenuState) => void;
    const {isExpanded} = this.state;

    const newState = {isExpanded: !isExpanded};
    this.setState(newState);
    onToggle(newState);
  }

  private dropdown() {
    const {isExpanded} = this.state;

    if (!isExpanded) {
      return null;
    }

    return (
      <DropdownWrapper onClick={this.dropdownClick}>
        <Dropdown items={this.props.actions}/>
      </DropdownWrapper>
    );
  }

  private dropdownClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }
}

export default Menu;
