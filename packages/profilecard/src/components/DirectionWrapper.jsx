import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const ContainerRelative = styled.div`
  position: relative;
`;

const ContainerDirection = styled.div`
  position: absolute;
  ${props => (props.direction === 'bottom' ? 'top' : 'bottom')}: 0
`;

export default class DirectionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    direction: PropTypes.oneOf(['top', 'bottom']),
  };

  static defaultProps = {
    direction: 'bottom',
  };

  render() {
    return (
      <ContainerRelative>
        <ContainerDirection direction={this.props.direction}>
          {this.props.children}
        </ContainerDirection>
      </ContainerRelative>
    );
  }
}
