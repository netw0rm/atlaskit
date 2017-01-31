import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';

import Element from './Element';
import SecondaryText from './SecondaryText';
import { Content, BeforeContent, AfterContent } from './styled';

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class Item
 */
export default class Item extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    elemBefore: PropTypes.node,
    elemAfter: PropTypes.node,
    href: PropTypes.string,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    isActive: PropTypes.bool,
    isSelected: PropTypes.bool,
    isChecked: PropTypes.bool,
    isFocused: PropTypes.bool,
    onActivate: PropTypes.func,
    target: PropTypes.string,
    type: PropTypes.oneOf(['link', 'radio', 'checkbox', 'option']),
  }

  static defaultProps = {
    children: null,
    elemBefore: null,
    elemAfter: null,
    href: null,
    itemContext: 'menu',
    isDisabled: false,
    isHidden: false,
    isActive: false,
    isSelected: false,
    isChecked: false,
    isFocused: false,
    onActivate: () => {},
    target: null,
    type: 'link',
  }

  handleKeyPress = (event) => {
    const { props } = this;
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!props.isDisabled) {
          props.onActivate({ item: this, event });
        }
        break;
      default:
        break;
    }
  }

  handleClick = (event) => {
    // disabled item can't be activated
    if (!this.props.isDisabled) {
      this.props.onActivate({ item: this, event });
    }
  }

  renderContentBefore = () =>
    (this.props.elemBefore ? <BeforeContent>{ this.props.elemBefore }</BeforeContent> : null)

  renderContentAfter = () =>
    (this.props.elemAfter ? <AfterContent>{ this.props.elemAfter }</AfterContent> : null)

  render = () => {
    const { props } = this;
    return (
      <ThemeProvider theme={this.props}>
        <span role="presentation">
          <Element
            handleClick={this.handleClick}
            handleKeyPress={this.handleKeyPress}
            href={props.href}
            isDisabled={props.isDisabled}
            isChecked={props.isChecked}
            isSelected={props.isSelected}
            isFocused={props.isFocused}
            isHidden={props.isHidden}
            target={props.target}
            type={props.type}
          >
            {this.renderContentBefore()}
            <Content>{ props.children }</Content>
            {this.renderContentAfter()}
          </Element>
        </span>
      </ThemeProvider>
    );
  }
}

export { SecondaryText };
