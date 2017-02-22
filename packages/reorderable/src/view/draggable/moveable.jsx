// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import type { Position } from '../../state/types';

type Props = {|
  children?: React$Element<*>,
  destination: Position,
  shouldAnimate: boolean,
  onMoveEnd?: Function,
  innerRef?: Function,
|}

// stiff physics from jira-frontend
const physics = {
  // stiffness: 500,
  stiffness: 25,
  damping: 50,
  precision: 0.5,
};

// TODO: memoizeOne
const getMovement = (point: Position): Object => ({
  transform: `translate(${point.x}px, ${point.y}px)`,
});

const Canvas = styled.div`
  display: inline-block;
  z-index: ${props => (props.isMoving ? '100' : 'auto')};
`;

const start: Position = {
  x: 0,
  y: 0,
};

export default class Movable extends PureComponent {

  static defaultProps = {
    innerRef: () => {},
  }

  onRest = () => {
    const { onMoveEnd } = this.props;

    if (!onMoveEnd) {
      return;
    }

    // needs to be async otherwise Motion will not re-execute if
    // offset or origin change

    // could check to see if another move has started and abort the previous onMoveEnd
    setTimeout(onMoveEnd);
  }

  props: Props

  render() {
    const { destination, shouldAnimate } = this.props;

    const final = {
      x: shouldAnimate ? spring(destination.x, physics) : destination.x,
      y: shouldAnimate ? spring(destination.y, physics) : destination.y,
    };

    return (
      // https://github.com/chenglou/react-motion/issues/375
      // $FlowFixMe
      <Motion defaultStyle={start} style={final} onRest={this.onRest}>
        {(current: Position) => {
          const isMoving = current.x !== 0 || current.y !== 0;
          return (
            <Canvas
              style={getMovement(current)}
              isMoving={isMoving}
              innerRef={this.props.innerRef}
            >
              {this.props.children}
            </Canvas>
          );
        }}
      </Motion>
    );
  }
}

