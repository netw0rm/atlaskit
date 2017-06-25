// @flow
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import memoizeOne from 'memoize-one';
import * as physics from '../physics';
import type { Position } from '../../types';

export type Speed = 'INSTANT' | 'STANDARD' | 'FAST';

type PositionLike = {|
  x: any,
  y: any,
|};

const origin: Position = {
  x: 0,
  y: 0,
};

const isAtOrigin = (point: PositionLike): boolean =>
  point.x === origin.x && point.y === origin.y;

type Props = {|
  children: (Object) => ?Object,
  speed: Speed,
  destination?: Position,
  onMoveEnd?: () => void,
|}

type DefaultProps = {|
  innerRef: (Element) => void,
  destination: Position,
  style: Object,
|}

const getStyle = (isNotMoving: boolean, x: number, y: number): ?Object => {
  if (isNotMoving) {
    return null;
  }

  const point: Position = { x, y };
  // not applying any transforms when not moving
  if (isAtOrigin(point)) {
    return null;
  }
  return {
    transform: `translate(${point.x}px, ${point.y}px)`,
  };
};

export default class Movable extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props

  static defaultProps: DefaultProps = {
    innerRef: () => {},
    destination: origin,
    style: {},
  }
  /* eslint-enable */

  onRest = () => {
    const { onMoveEnd } = this.props;

    if (!onMoveEnd) {
      return;
    }

    // This needs to be async otherwise Motion will not re-execute if
    // offset or start change

    // Could check to see if another move has started
    // and abort the previous onMoveEnd
    setTimeout(() => onMoveEnd());
  }

  getFinal = (): PositionLike => {
    // $ExpectError - flow does not play well with default props
    const destination: Position = this.props.destination;
    const speed = this.props.speed;

    if (speed === 'INSTANT') {
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

    // bug with react-motion: https://github.com/chenglou/react-motion/issues/437
    // even if both defaultStyle and style are {x: 0, y: 0 } if there was
    // a previous animation it uses the last value rather than the final value
    const isNotMoving: boolean = isAtOrigin(final);

    return (
      // https://github.com/chenglou/react-motion/issues/375
      // $ExpectError - React motion! *fist shake*
      <Motion defaultStyle={origin} style={final} onRest={this.onRest}>
        {(current: Position) =>
          this.props.children(getStyle(
            isNotMoving,
            current.x,
            current.y
          ))}
      </Motion>
    );
  }
}

