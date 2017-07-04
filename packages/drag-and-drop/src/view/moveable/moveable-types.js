// @flow
import type { HasDefaultProp } from 'babel-plugin-react-flow-props-to-prop-types';
import type { Position } from '../../types';

export type Speed = 'INSTANT' | 'STANDARD' | 'FAST';

export type Style = {|
  transform: string,
|}

export type Props = {|
  children: (?Style) => void,
  speed: Speed,
  destination: HasDefaultProp<Position>,
  onMoveEnd?: () => void,
|}

export type DefaultProps = {|
  destination: Position,
|}
