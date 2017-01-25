import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const sizes = {
  medium: 24,
};

const Size = styled.div`
  color: inherit;
  display: inline-block;
  height: ${props => sizes[props.size]}px;
`;

const Container = styled.div`
`;

const LogoType = styled.div`
  height: 100%;
  visibility: ${props => (props.isCollapsed ? 'hidden' : 'visible')};
`;

export default class Logo extends PureComponent {
  static propTypes = {
    icon: PropTypes.node.isRequired,
    isCollapsed: PropTypes.bool,
    logoText: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isCollapsed: false,
  }

  render = () => (
    <Container>
      {this.props.icon}
      <Size size="medium">
        <LogoType isCollapsed={this.props.isCollapsed}>
          {this.props.logoText}
        </LogoType>
      </Size>
    </Container>
  )
}
