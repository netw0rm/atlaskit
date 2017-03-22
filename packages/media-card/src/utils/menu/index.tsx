import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {Dropdown} from './dropdown';
import {
  Wrapper,
  MenuButton,
  DropdownWrapper
} from './styled';

export interface MenuProps {
  actions?: Array<CardAction>;
  onToggle?: (newState: MenuState) => void;
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
        {this.moreBtn()}
        {this.dropdown()}
      </Wrapper>
    );
  }

  private moreBtn() {
    const actions = this.props.actions || [];

    if (!actions.length) {
      return null;
    }

    const {isExpanded} = this.state;
    const moreBtnClasses = ['more-btn'];

    if (isExpanded) {
      moreBtnClasses.push('active');
    }

    return (
      <MenuButton
        className={moreBtnClasses.join(' ')}
        onClick={this.moreBtnClick.bind(this)}
      >
        <MoreIcon label="more"/>
      </MenuButton>
    );
  }

  private moreBtnClick(e: MouseEvent<HTMLDivElement>) {
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
