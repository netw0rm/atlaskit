import React, { PureComponent, PropTypes } from 'react';
import Radio from '@atlaskit/icon/glyph/radio';
import Checkbox from '@atlaskit/icon/glyph/checkbox';
import { ariaRoles, baseTypes } from './constants';
import { ElementWrapper as Wrapper } from './styled';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Element extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isHidden: PropTypes.bool,
    isChecked: PropTypes.bool,
    isSelected: PropTypes.bool,
    isActive: PropTypes.bool,
    handleClick: PropTypes.func,
    handleKeyPress: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(baseTypes.values),
  }

  componentDidMount = () => {
    this.setFocus();
  }

  componentDidUpdate = () => {
    this.setFocus();
  }

  setFocus = () => {
    if (this.props.isFocused) {
      this.ref.focus();
    }
  }

  getAriaAttributes = () => {
    const { props } = this;
    const ariaAttributes = {};
    if (props.isDisabled) {
      ariaAttributes['aria-disabled'] = true;
    }
    if (props.isHidden) {
      ariaAttributes['aria-hidden'] = true;
    }
    if (props.isChecked) {
      ariaAttributes['aria-checked'] = true;
    }
    if (props.type === 'option') {
      ariaAttributes['aria-selected'] = props.isSelected;
    }
    return ariaAttributes;
  }

  getCommonAttributes = () => ({
    role: ariaRoles[this.props.type],
    onKeyPress: this.props.handleKeyPress,
    onClick: this.props.handleClick,
    onMouseDown: this.handleMouseDown,
    ref: ref => (this.ref = ref),
    'data-role': 'droplistItem',
  })

  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e) => {
    e.preventDefault();
  }

  renderElement = (Constructor, extraProps) => {
    const { props } = this;
    const ariaAttributes = this.getAriaAttributes();
    const commonAttributes = this.getCommonAttributes();
    return (
      <Constructor
        {...extraProps}
        {...commonAttributes}
        {...ariaAttributes}
        className="element-content"
      >
        {
          props.type === 'checkbox'
          ? <span className="checkradio"><Checkbox label="" /></span>
          : null
        }
        {
          props.type === 'radio'
          ? <span className="checkradio"><Radio label="" /></span>
          : null
        }
        {props.children}
      </Constructor>
    );
  }

  render = () => {
    const { href, isDisabled, target } = this.props;
    return (
      <Wrapper
        elementType={this.props.type}
        isDisabled={this.props.isDisabled}
        isChecked={this.props.isChecked}
        isSelected={this.props.isSelected}
        isActive={this.props.isActive}
        isHidden={this.props.isHidden}
      >
        {
          href && !isDisabled ?
            this.renderElement('a', { href, target }) :
            this.renderElement('span', { tabIndex: '0' })
        }
      </Wrapper>
    );
  }
}
