// @flow
import type { Position } from '../types';

export const add = (point1: Position, point2: Position): Position => ({
  x: point1.x + point2.x,
  y: point1.y + point2.y,
});

export const subtract = (point1: Position, point2: Position): Position => ({
  x: point1.x - point2.x,
  y: point1.y - point2.y,
});

export const isEqual = (point1: Position, point2: Position): boolean =>
  point1.x === point2.x && point1.y === point2.y;

export const center = (point1: Position, point2: Position): Position => ({
  x: (point1.x + point2.x) / 2,
  y: (point1.y + point2.y) / 2,
});

export const negate = (point: Position): Position => ({
  x: -point.x,
  y: -point.y,
});
