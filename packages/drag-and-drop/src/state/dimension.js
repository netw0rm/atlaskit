// @flow
import type {
  DroppableId,
  DraggableId,
  Position,
  DraggableDimension,
  DroppableDimension,
  DimensionFragment,
  DraggableDimensionFragment,
} from '../types';

export type ClientRect = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
|}

export type Margin = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
|}

const origin: Position = { x: 0, y: 0 };

const getWithWindowScroll = (clientRect: ClientRect, windowScroll: Position): ClientRect => {
  const { top, right, bottom, left, width, height } = clientRect;
  return {
    top: top + windowScroll.y,
    left: left + windowScroll.x,
    bottom: bottom + windowScroll.y,
    right: right + windowScroll.x,
    height,
    width,
  };
};

const getWithMargin = (clientRect: ClientRect, margin: Margin): ClientRect => {
  const { top, right, bottom, left } = clientRect;
  return {
    top: top + margin.top,
    left: left + margin.left,
    bottom: bottom + margin.bottom,
    right: right + margin.right,
    height: ((bottom + margin.bottom) - (top + margin.top)) / 2,
    width: ((right + margin.right) - (left + margin.left)) / 2,
  };
};

const getFragment = (
  initial: ClientRect | DimensionFragment,
  point?: Position = origin
): DimensionFragment => ({
  top: initial.top + point.y,
  left: initial.left + point.x,
  bottom: initial.bottom + point.y,
  right: initial.right + point.x,
  width: initial.width,
  height: initial.height,
  center: {
    x: ((initial.left + point.x) + (initial.right + point.x)) / 2,
    y: ((initial.top + point.y) + (initial.bottom + point.y)) / 2,
  },
});

export const getDraggableDimension = (
  id: DraggableId,
  droppableId: DroppableId,
  clientRect: ClientRect,
  margin: Margin,
  windowScroll: Position,
  droppableScroll: Position,
): DraggableDimension => {
  const withScroll = getWithWindowScroll(clientRect, windowScroll);
  const withScrollAndMargin = getWithMargin(withScroll, margin);

  const withoutDroppableScroll: DraggableDimensionFragment = {
    withoutMargin: getFragment(withScroll),
    withMargin: getFragment(withScrollAndMargin),
  };

  const withDroppableScroll: DraggableDimensionFragment = {
    withoutMargin: getFragment(withoutDroppableScroll.withoutMargin, droppableScroll),
    withMargin: getFragment(withoutDroppableScroll.withMargin, droppableScroll),
  };

  const dimension: DraggableDimension = {
    id,
    droppableId,
    withoutDroppableScroll,
    withDroppableScroll,
  };
  return dimension;
};

export const getDroppableDimension = (
  id: DroppableId,
  clientRect: ClientRect,
  margin: Margin,
  windowScroll: Position,
  scroll: Position,
): DroppableDimension => {
  const withScroll = getWithWindowScroll(clientRect, windowScroll);
  const withScrollAndMargin = getWithMargin(withScroll, margin);

  const dimension: DroppableDimension = {
    id,
    scroll,
    withoutMargin: getFragment(withScroll),
    withMargin: getFragment(withScrollAndMargin),
  };

  return dimension;
};
