import type { Position } from '../../state/types';

export default (node: Node): Position => {
  const { top, right, bottom, left } = node.getBoundingClientRect();
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;

  return {
    x: centerX,
    y: centerY,
  };
};
