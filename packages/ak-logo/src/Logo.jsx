import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const sizes = {
  medium: 24,
};

const Size = styled.div`
  color: inherit;
  display: inline-block;
  height: ${props => sizes[props.size]}px;
  .logo-type {
    opacity: ${props => (props.isCollapsed ? 0 : 1)};
  }
`;

export default class Logo extends PureComponent {
  static propTypes = {
    isCollapsed: PropTypes.bool,
    logoText: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isCollapsed: false,
  }

  render = () => (
    <Size size="medium" isCollapsed={this.props.isCollapsed}>
      {this.props.logoText}
    </Size>
  )
}
