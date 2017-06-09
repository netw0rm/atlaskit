// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { makeSelector } from '../../../src/view/draggable/make-connected-draggable';
import getDimension from '../get-dimension-util';
import noImpact from '../../../src/state/no-impact';
import type {
  CurrentDrag,
  DragResult,
  DragComplete,
  DragImpact,
  DraggableId,
  DraggingInitial,
  Position,
} from '../../../src/types';
import type { OwnProps, MapProps, NeedsProviding } from '../../../src/view/draggable/draggable-types';

const make = (() => {
  let callCount = 0;
  const provide = (ownProps: OwnProps): NeedsProviding => ({
    id: ownProps.id,
    isDragEnabled: ownProps.isDragEnabled,
  });

  return () => {
    callCount++;
    const id: DraggableId = `drag-id-${callCount}`;
    const selector = makeSelector(provide);
    const provided: NeedsProviding = provide({
      id,
      isDragEnabled: true,
    });
    const dimension = getDimension({
      top: 100 * callCount,
      left: 0,
      right: 0,
      bottom: (100 * callCount) + 20,
    });
    const initial: DraggingInitial = {
      source: {
        index: 0,
        droppableId: 'drop-1',
      },
      center: dimension.center,
      scroll: { x: 0, y: 0 },
      selection: dimension.center,
      dimension,
    };
    const drag = (offset: Position, impact?: DragImpact = noImpact): CurrentDrag => {
      const center: Position = {
        x: initial.center.x + offset.x,
        y: initial.center.y + offset.y,
      };
      const currentDrag: CurrentDrag = {
        dragging: {
          id,
          type: 'TYPE',
          offset,
          center,
          shouldAnimate: true,
        },
        impact,
        initial,
      };
      return currentDrag;
    };
    const complete = (
      newHomeOffset: Position,
      impact?: DragImpact = noImpact,
      shouldAnimate?: boolean = true
    ): DragComplete => {
      const result: DragResult = {
        draggableId: id,
        source: initial.source,
        destination: {
          index: initial.source.index + 1,
          droppableId: initial.source.droppableId,
        },
      };
      const output: DragComplete = {
        result,
        last: drag(newHomeOffset, impact),
        newHomeOffset,
        isWaitingForAnimation: shouldAnimate,
      };
      return output;
    };

    return { id, selector, provided, initial, dimension, drag, complete };
  };
})();

const getDefaultMapProps = (id: DraggableId): MapProps => ({
  id,
  isDragEnabled: true,
  isDropAnimating: false,
  isDragging: false,
  canAnimate: true,
  // at the origin by default
  offset: {
    x: 0,
    y: 0,
  },
  initial: null,
});

describe('Draggable - unconnected', () => {
  it('should log an error and return default props if the selector receives both a current drag and a drag completion', () => {
    sinon.stub(console, 'error');
    const { id, complete, drag, selector, provided } = make();

    const result: MapProps = selector.resultFunc(
      drag({ x: 10, y: 20 }),
      complete({ x: 10, y: 20 }),
      provided,
    );

    expect(console.error.called).to.equal(true);
    expect(result).to.deep.equal(getDefaultMapProps(id));
    console.error.restore();
  });

  describe('item is not dragging', () => {
    const { id, selector, provided } = make();
    it('should return the default props', () => {
      const result: MapProps = selector.resultFunc(
        null,
        null,
        provided,
      );

      expect(result).to.deep.equal(getDefaultMapProps(id));
    });

    it('should not break memoization on multiple calls', () => {
      const first: MapProps = selector.resultFunc(
        null,
        null,
        provided,
      );
      const second: MapProps = selector.resultFunc(
        null,
        null,
        provided,
      );

      // checking that we got the same object back
      expect(first).to.equal(second);
    });
  });

  describe('item is dragging', () => {
    it('should return the current position of the item', () => {
      const { id, initial, selector, provided, drag } = make();
      const offset: Position = {
        x: 100,
        y: 200,
      };
      const expected: MapProps = {
        id,
        isDragEnabled: true,
        isDropAnimating: false,
        isDragging: true,
        canAnimate: true,
        offset,
        initial,
      };

      const result: MapProps = selector.resultFunc(
        drag(offset),
        null,
        provided,
      );

      expect(result).to.deep.equal(expected);
    });

    it('should break memoization on every call', () => {
      const { selector, provided, drag } = make();
      const currentDrag: CurrentDrag = drag({ x: 100, y: 200 });

      const first: MapProps = selector.resultFunc(
        currentDrag,
        null,
        provided,
      );
      const second: MapProps = selector.resultFunc(
        currentDrag,
        null,
        provided,
      );

      // checking we did not get the same reference back
      expect(first).to.not.equal(second);
    });
  });

  describe('another item is dragging', () => {
    const notDragging = make();
    const dragging = make();

    describe('item does not need to move out of the way', () => {
      it('should return the default props', () => {
        const props: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 10, y: 20 }),
          null,
          notDragging.provided,
        );

        expect(props).to.deep.equal(getDefaultMapProps(notDragging.id));
      });

      it('should not break memoization on multiple calls', () => {
        const result1: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 10, y: 20 }),
          null,
          notDragging.provided,
        );
        const result2: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 130, y: 220 }),
          null,
          notDragging.provided,
        );

        // checking we got the same object back
        expect(result1).to.equal(result2);
      });
    });

    describe('item needs to move out of the way', () => {
      it('should move backward to get out of the way when the dragging item is moving forward', () => {
        const impact: DragImpact = {
          movement: {
            draggables: [notDragging.id],
            amount: dragging.dimension.height,
            isMovingForward: true,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };
        const expected: MapProps = {
          id: notDragging.id,
          isDragEnabled: true,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: true,
          offset: { x: 0, y: -impact.movement.amount },
          initial: null,
        };

        const props: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 10, y: 20 }, impact),
          null,
          notDragging.provided
        );

        expect(props).to.deep.equal(expected);
      });

      it('should move forward to get out of the way when the dragging item is moving backward', () => {
        const impact: DragImpact = {
          movement: {
            draggables: [notDragging.id],
            amount: dragging.dimension.height,
            isMovingForward: false,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };
        const expected: MapProps = {
          id: notDragging.id,
          isDragEnabled: true,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: true,
          offset: { x: 0, y: impact.movement.amount },
          initial: null,
        };

        const props: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 10, y: 20 }, impact),
          null,
          notDragging.provided
        );

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization on mulitiple calls', () => {
        const impact: DragImpact = {
          movement: {
            draggables: [notDragging.id],
            amount: dragging.dimension.height,
            isMovingForward: false,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };

        const result1: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 560, y: 20 }, impact),
          null,
          notDragging.provided
        );
        const result2: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 10, y: 250 }, impact),
          null,
          notDragging.provided
        );

        // it should return the same object
        expect(result1).to.equal(result2);
      });
    });
  });

  describe('dragging is complete', () => {
    describe('item was dragging', () => {
      it('should move to the new home offset', () => {
        const { id, initial, selector, provided, complete } = make();
        const newHomeOffset: Position = {
          x: 100,
          y: 10,
        };
        const expected: MapProps = {
          id,
          isDragEnabled: true,
          isDragging: false,
          isDropAnimating: true,
          canAnimate: true,
          offset: newHomeOffset,
          initial,
        };

        const props: MapProps = selector.resultFunc(
          null,
          complete(newHomeOffset),
          provided
        );

        expect(props).to.deep.equal(expected);
      });

      it('should not animate if request not to do so', () => {
        const { id, initial, selector, provided, complete } = make();
        const newHomeOffset: Position = {
          x: 100,
          y: 10,
        };
        const expected: MapProps = {
          id,
          isDragEnabled: true,
          isDragging: false,
          isDropAnimating: false,
          canAnimate: false,
          offset: newHomeOffset,
          initial,
        };

        const props: MapProps = selector.resultFunc(
          null,
          complete(newHomeOffset, undefined, false),
          provided
        );

        expect(props).to.deep.equal(expected);
      });
    });

    describe('item was not dragging and not moved', () => {
      it('should remain in its original position', () => {
        const dragging = make();
        const notDragging = make();
        const expected: MapProps = getDefaultMapProps(notDragging.id);

        const props: MapProps = notDragging.selector.resultFunc(
          null,
          dragging.complete({ x: 100, y: 200 }, noImpact),
          notDragging.provided,
        );

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization from while the drag was occuring', () => {
        const dragging = make();
        const notDragging = make();
        const defaultProps: MapProps = getDefaultMapProps(notDragging.id);

        const duringDrag: MapProps = notDragging.selector.resultFunc(
          dragging.drag({ x: 100, y: 200 }),
          null,
          notDragging.provided,
        );
        const postDrag: MapProps = notDragging.selector.resultFunc(
          null,
          dragging.complete({ x: 100, y: 200 }, noImpact),
          notDragging.provided,
        );

        expect(duringDrag).to.deep.equal(defaultProps);
        expect(postDrag).to.deep.equal(defaultProps);
        // checking object equality
        expect(duringDrag).to.equal(postDrag);
      });
    });

    describe('item was not dragging but was moved out of the way', () => {
      const dragging = make();
      const notDragging = make();
      it('should move to the final offset', () => {
        const impact: DragImpact = {
          movement: {
            draggables: [notDragging.id],
            amount: dragging.dimension.height,
            isMovingForward: true,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };
        const expected: MapProps = {
          id: notDragging.id,
          isDragEnabled: true,
          isDropAnimating: false,
          isDragging: false,
          canAnimate: true,
          // Because the item is moving forward, this will
          // be moving backwards to get out of the way.
          offset: {
            x: 0,
            y: -dragging.dimension.height,
          },
          initial: null,
        };

        const props: MapProps = notDragging.selector.resultFunc(
          null,
          dragging.complete({ x: 100, y: 100 }, impact),
          notDragging.provided,
        );

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization if it was already heading to the same location before the drag was completed', () => {
        const offset: Position = {
          x: 100,
          y: 200,
        };
        // notDragging is moving out of the way
        const impact: DragImpact = {
          movement: {
            draggables: [notDragging.id],
            amount: dragging.dimension.height,
            isMovingForward: true,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };

        const duringDrag: MapProps = notDragging.selector.resultFunc(
          dragging.drag(offset, impact),
          null,
          notDragging.provided,
        );
        const afterDrag: MapProps = notDragging.selector.resultFunc(
          null,
          dragging.complete({ x: 1, y: 10 }, impact),
          notDragging.provided,
        );

        // checking that the result objects have the same reference
        expect(duringDrag).to.equal(afterDrag);
      });
    });
  });
});
