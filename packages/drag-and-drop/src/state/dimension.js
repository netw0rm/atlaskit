// @flow
import type {
  DroppableId,
  DraggableId,
  Position,
  DraggableDimension,
  DroppableDimension,
  DimensionFragment,
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

const getWithPosition = (clientRect: ClientRect, point: Position): ClientRect => {
  const { top, right, bottom, left, width, height } = clientRect;
  return {
    top: top + point.y,
    left: left + point.x,
    bottom: bottom + point.y,
    right: right + point.x,
    height,
    width,
  };
};

const getWithMargin = (clientRect: ClientRect, margin: Margin): ClientRect => {
  const { top, right, bottom, left, height, width } = clientRect;
  return {
    top: top + margin.top,
    left: left + margin.left,
    bottom: bottom + margin.bottom,
    right: right + margin.right,
    height: height + margin.top + margin.bottom,
    width: width + margin.left + margin.right,
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
    x: ((initial.right + point.x) + (initial.left + point.x)) / 2,
    y: ((initial.bottom + point.y) + (initial.top + point.y)) / 2,
  },
});

export const getDraggableDimension = (
  id: DraggableId,
  droppableId: DroppableId,
  clientRect: ClientRect,
  margin: Margin,
  windowScroll: Position,
): DraggableDimension => {
  const withScroll = getWithPosition(clientRect, windowScroll);
  const withScrollAndMargin = getWithMargin(withScroll, margin);

  const dimension: DraggableDimension = {
    id,
    droppableId,
    // with scroll
    page: {
      withoutMargin: getFragment(withScroll),
      withMargin: getFragment(withScrollAndMargin),
    },
    // on the viewport
    client: {
      withoutMargin: getFragment(clientRect),
      withMargin: getWithMargin(clientRect, margin),
    },
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
  const withScroll = getWithPosition(clientRect, windowScroll);
  const withScrollAndMargin = getWithMargin(withScroll, margin);

  const dimension: DroppableDimension = {
    id,
    scroll: {
      initial: scroll,
      current: scroll,
    },
    withoutMargin: getFragment(withScroll),
    withMargin: getFragment(withScrollAndMargin),
  };

  return dimension;
};
