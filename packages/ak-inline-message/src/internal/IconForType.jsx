import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import { akGridSize } from 'akutil-shared-styles';
import typesMapping, { types } from './types';

export default class SelectedIconForType extends PureComponent {
  static propTypes = {
    isHovered: PropTypes.bool,
    isMouseDown: PropTypes.bool,
    type: PropTypes.oneOf(types).isRequired,
  }

  static defaultProps = {
    isHovered: false,
    isMouseDown: false,
  }

  iconColor = ({ iconColor, iconHoverColor, iconActiveColor }) => {
    if (this.props.isMouseDown) {
      return iconActiveColor;
    } else if (this.props.isHovered) {
      return iconHoverColor;
    }
    return iconColor;
  }

  render = () => {
    const {
      [this.props.type]: {
        icon: SelectedIcon,
        iconColor,
        iconHoverColor,
        iconActiveColor,
      },
    } = typesMapping;

    const chosenColor = this.iconColor({ iconColor, iconHoverColor, iconActiveColor });

    const IconWrapper = styled.span`
      align-items: center;
      color: ${chosenColor};
      display: flex;
      flex: 0 0 auto;
      padding: 0 calc(${akGridSize} / 2);
    `;

    return (
      <IconWrapper>
        <SelectedIcon label="Inline message icon" />
      </IconWrapper>
    );
  }
}
