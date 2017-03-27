import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const ContainerRelative = styled.div`
  position: relative;
`;

const mapPosition = (position) => {
  switch (position) {
    case 'top left':
      return 'left: 0; bottom: 0;';
    case 'top right':
      return 'right: 0; bottom: 0;';
    case 'right top':
      return 'left: 0; top: 0;';
    case 'right bottom':
      return 'left: 0; bottom: 0;';
    case 'bottom right':
      return 'right: 0; top: 0;';
    case 'bottom left':
      return 'left: 0; top: 0;';
    case 'left bottom':
      return 'right: 0; bottom: 0;';
    case 'left top':
      return 'right: 0; top: 0;';
    default:
      return '';
  }
};

const ContainerDirection = styled.div`
  position: absolute;
  ${props => (mapPosition(props.position))}
`;

export default class DirectionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    position: PropTypes.string,
  };

  render() {
    return (
      <ContainerRelative>
        <ContainerDirection position={this.props.position}>
          {this.props.children}
        </ContainerDirection>
      </ContainerRelative>
    );
  }
}
