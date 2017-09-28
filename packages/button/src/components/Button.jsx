import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getButtonProps from './getButtonProps';
import CustomComponentProxy from './CustomComponentProxy';
import getButtonStyles from '../styled/getButtonStyles';
import ButtonContent from '../styled/ButtonContent';
import ButtonWrapper from '../styled/ButtonWrapper';
import IconWrapper from '../styled/IconWrapper';

const StyledButton = styled.button`${getButtonStyles}`;
// Target the <a> here to override a:hover specificity.
const StyledLink = styled.a`a&{ ${getButtonStyles} }`;
const StyledSpan = styled.span`${getButtonStyles}`;

const createStyledComponent = () => {
  // Override pseudo-state specificity.
  // This is necessary because we don't know what DOM element the custom component will render.
  const component = styled(CustomComponentProxy)`&,a&,&:hover,&:active,&:focus{${getButtonStyles}}`;
  component.displayName = 'StyledCustomComponent';
  return component;
};

export default class Button extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    /** The base styling to apply to the button. */
    appearance: PropTypes.oneOf([
      'default',
      'danger',
      'link',
      'primary',
      'subtle',
      'subtle-link',
      'warning',
      'help',
    ]),
    /** Pass aria-controls to underlying html button. */
    ariaControls: PropTypes.string,
    /** Pass aria-expanded to underlying html button. */
    ariaExpanded: PropTypes.bool,
    /** Pass aria-haspopup to underlying html button. */
    ariaHaspopup: PropTypes.bool,
    /** This button's child nodes. */
    children: PropTypes.node,
    /** Add a classname to the button. */
    className: PropTypes.string,
    /** A custom component to use instead of the default button. */
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    /** Name property of a linked form that the button submits when clicked. */
    form: PropTypes.string,
    /** Provides a url for buttons being used as a link. */
    href: PropTypes.string,
    /** Places an icon within the button, after the button's text. */
    iconAfter: PropTypes.element,
    /** Places an icon within the button, before the button's text. */
    iconBefore: PropTypes.element,
    /** Pass a reference on to the styled component */
    innerRef: PropTypes.func,
    /** Provide a unique id to the button. */
    id: PropTypes.string,
    /** Set if the button is disabled. */
    isDisabled: PropTypes.bool,
    /** Change the style to indicate the button is selected. */
    isSelected: PropTypes.bool,
    /** Handler to be called on click. */
    onClick: PropTypes.func,
    /** Set the amount of padding in the button. */
    spacing: PropTypes.oneOf(['compact', 'default', 'none']),
    /** Assign specific tabIndex order to the underlying html button. */
    tabIndex: PropTypes.number,
    /** Pass target down to a link within the button component, if a href is provided. */
    target: PropTypes.string,
    /** Set whether it is a button or a form submission. */
    type: PropTypes.oneOf(['button', 'submit']),
    /** Option to fit button width to its parent width */
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    isDisabled: false,
    isSelected: false,
    spacing: 'default',
    tabIndex: null,
    type: 'button',
    shouldFitContainer: false,
  }

  state = {
    isActive: false,
    isFocus: false,
    isHover: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.component !== nextProps.component) {
      delete this.customComponent;
    }
  }

  onMouseEnter = () => this.setState({ isHover: true })

  onMouseLeave = () => this.setState({ isHover: false, isActive: false })

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({ isActive: true });
  }

  onMouseUp = () => this.setState({ isActive: false })

  onFocus = () => this.setState({ isFocus: true })

  onBlur = () => this.setState({ isFocus: false })

  getStyledComponent() {
    if (this.props.component) {
      if (!this.customComponent) {
        this.customComponent = createStyledComponent();
      }
      return this.customComponent;
    }

    if (this.props.href) {
      return this.props.isDisabled ? StyledSpan : StyledLink;
    }

    return StyledButton;
  }

  render() {
    const {
      children,
      iconBefore,
      iconAfter,
      innerRef,
      shouldFitContainer,
    } = this.props;

    const buttonProps = getButtonProps(this);
    const StyledComponent = this.getStyledComponent();

    const iconIsOnlyChild = (iconBefore && !iconAfter && !children)
      || (iconAfter && !iconBefore && !children);

    return (
      <StyledComponent innerRef={innerRef} {...buttonProps}>
        <ButtonWrapper fit={shouldFitContainer}>
          {iconBefore ? (
            <IconWrapper spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconBefore}
            </IconWrapper>
          ) : null}
          {children ? (
            <ButtonContent
              followsIcon={!!iconBefore}
              spacing={buttonProps.spacing}
            >
              {children}
            </ButtonContent>
          ) : null}
          {iconAfter ? (
            <IconWrapper spacing={buttonProps.spacing} isOnlyChild={iconIsOnlyChild}>
              {iconAfter}
            </IconWrapper>
          ) : null}
        </ButtonWrapper>
      </StyledComponent>
    );
  }
}
