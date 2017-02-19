// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import type { Position } from '../../state/types';

type Props = {
  children?: React$Element<*>,
  offset: Position,
  origin: Position,
  onMoveEnd?: Function,
}

// stiff physics from jira-frontend
const physics = {
  stiffness: 500,
  damping: 50,
  precision: 0.5,
};

// TODO: memoizeOne
const getMovement = (point: Position): Object => ({
  transform: `translate(${point.x}px, ${point.y}px)`,
});

const Canvas = styled.div``;

export default class Movable extends PureComponent {
  static defaultProps = {
    origin: { x: 0, y: 0 },
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
    const { offset, origin } = this.props;
    const destination = {
      x: spring(offset.x, physics),
      y: spring(offset.y, physics),
    };

    return (
      <Motion defaultStyle={origin} style={destination} onRest={this.onRest}>
        {(current: Position) => (
          <Canvas style={getMovement(current)}>
            {this.props.children}
          </Canvas>
        )}
      </Motion>
    );
  }
}

