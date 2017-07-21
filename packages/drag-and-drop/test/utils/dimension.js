import type { ClientRect, Margin } from '../../src/state/dimension';

type GetClientRect = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
|}

export const getClientRect = ({ top, right, bottom, left }: GetClientRect): ClientRect => ({
  top,
  right,
  bottom,
  left,
  width: (right - left),
  height: (bottom - top),
});

export const noMargin: Margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
