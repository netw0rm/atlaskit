// @flow
import type { Position } from '../../types';

export type Speed = 'INSTANT' | 'STANDARD' | 'FAST';

export type Style = {|
  transform: string,
|}

export type Props = {|
  children: (?Style) => void,
  speed: Speed,
  destination?: Position,
  onMoveEnd?: () => void,
|}

export type DefaultProps = {|
  innerRef: (Element) => void,
  destination: Position,
|}
