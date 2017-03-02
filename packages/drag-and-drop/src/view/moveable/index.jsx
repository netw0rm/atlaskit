// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import * as physics from './physics';
import type { Position } from '../../types';

export type Speed = 'NONE' | 'STANDARD' | 'FAST';

type Props = {|
  children?: React$Element<*>,
  // TODO: should this be optional?
  destination: Position,
  speed: Speed,
  zIndex: string,
  onMoveEnd?: Function,
  innerRef?: Function,
|}

type DefaultProps = {|
  destination: Position,
  innerRef: Function,
|}

// TODO: memoizeOne
const getMovement = (point: Position): Object => {
  if (point.x === 0 && point.y === 0) {
    return {};
  }
  // todo: support different vendors
  return {
    transform: `translate(${point.x}px, ${point.y}px)`,
  };
};

const Canvas = styled.div`
  display: inline-block;
  z-index: ${props => (props.zIndex)};
`;

const start: Position = {
  x: 0,
  y: 0,
};

export default class Movable extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  defaultProps: DefaultProps

  static defaultProps: DefaultProps = {
    innerRef: () => {},
    destination: start,
  }
  /* eslint-enable */

  onRest = () => {
    const { onMoveEnd } = this.props;

    if (!onMoveEnd) {
      return;
    }

    // needs to be async otherwise Motion will not re-execute if
    // offset or start change

    // could check to see if another move has started and abort the previous onMoveEnd
    setTimeout(onMoveEnd);
  }

  getFinal = () => {
    const { destination, speed } = this.props;

    if (speed === 'NONE') {
      return destination;
    }

    const selected = speed === 'FAST' ? physics.fast : physics.standard;

    return {
      x: spring(destination.x, selected),
      y: spring(destination.y, selected),
    };
  }

  render() {
    const final = this.getFinal();

    return (
      // https://github.com/chenglou/react-motion/issues/375
      // $FlowFixMe
      <Motion defaultStyle={start} style={final} onRest={this.onRest}>
        {(current: Position) => (
          <Canvas
            style={getMovement(current)}
            zIndex={this.props.zIndex}
            innerRef={this.props.innerRef}
          >
            {this.props.children}
          </Canvas>
        )}
      </Motion>
    );
  }
}

