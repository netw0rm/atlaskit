import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const sizes = {
  medium: 24,
};

const Size = styled.div`
  display: inline-block;
  height: ${props => sizes[props.size]}px;
`;

const Container = styled.div`
`;

export default class Logo extends PureComponent {
  static propTypes = {
    icon: PropTypes.node.isRequired,
    logoText: PropTypes.string.isRequired,
  }

  render = () => (
    <Container>
      {this.props.icon}
      <Size
        size="medium"
        dangerouslySetInnerHTML={{ __html: this.props.logoText }}
      />
    </Container>
  )
}
