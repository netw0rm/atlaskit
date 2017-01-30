import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const sizes = {
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
};

// Ratio used by the logo svg template
const outerLogoSize = 40;
const innerLogoSize = 30;
const logoIconRatio = outerLogoSize / innerLogoSize;

const Size = styled.div`
  color: inherit;
  display: inline-block;
  height: ${props => sizes[props.size] * logoIconRatio}px;

  svg {
    height: 100%;
  }

  .logo-type {
    opacity: ${props => (props.isCollapsed ? 0 : 1)};
  }
`;

export default class Logo extends PureComponent {
  static propTypes = {
    isCollapsed: PropTypes.bool,
    logoText: PropTypes.node.isRequired,
    size: PropTypes.string,
  }

  static defaultProps = {
    isCollapsed: false,
    size: 'medium',
  }

  render = () => (
    <Size size={this.props.size} isCollapsed={this.props.isCollapsed}>
      {this.props.logoText}
    </Size>
  )
}
