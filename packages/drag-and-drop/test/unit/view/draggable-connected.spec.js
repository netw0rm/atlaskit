// @flow
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { makeSelector } from '../../../src/view/draggable/make-connected-draggable';
import getDimension from '../get-dimension-util';
import noImpact from '../../../src/state/no-impact';
import type {
  CurrentDrag,
  Phase,
  DragState,
  DropResult,
  PendingDrop,
  Dimension,
  DragImpact,
  DraggableId,
  InitialDrag,
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
    const dimension: Dimension = getDimension({
      top: 100 * callCount,
      left: 0,
      right: 100,
      bottom: (100 * callCount) + 20,
    });
    const initial: InitialDrag = {
      source: {
        index: 0,
        droppableId: 'drop-1',
      },
      center: dimension.center,
      scroll: { x: 0, y: 0 },
      selection: dimension.center,
      dimension,
    };
    const drag = (offset: Position, impact?: DragImpact = noImpact): DragState => {
      const center: Position = {
        x: initial.center.x + offset.x,
        y: initial.center.y + offset.y,
      };
      const current: CurrentDrag = {
        id,
        type: 'TYPE',
        offset,
        center,
        shouldAnimate: true,
      };

      const state: DragState = {
        current,
        impact,
        initial,
      };
      return state;
    };
    const drop = (
      newHomeOffset: Position,
      impact?: DragImpact = noImpact,
    ): PendingDrop => {
      const result: DropResult = {
        draggableId: id,
        source: initial.source,
        destination: {
          index: initial.source.index + 1,
          droppableId: initial.source.droppableId,
        },
      };

      const pending: PendingDrop = {
        newHomeOffset,
        result,
        last: drag(newHomeOffset, impact),
      };
      return pending;
    };

    return { id, selector, provided, initial, dimension, drag, drop };
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

type SelectorArgs = {|
  phase: Phase,
  drag: ?DragState,
  pending: ?PendingDrop,
  provided: NeedsProviding
|}

const execute = (selector: Function) =>
  ({ phase, drag, pending, provided }: SelectorArgs): MapProps =>
    selector.resultFunc(
      phase,
      drag,
      pending,
      provided
    );

describe.only('Draggable - connected', () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  describe('dragging', () => {
    it('should log an error and return default props if there is invalid drag state', () => {
      const { id, selector, provided } = make();

      const result = execute(selector)({
        phase: 'DRAGGING',
        drag: null,
        pending: null,
        provided,
      });

      expect(result).to.deep.equal(getDefaultMapProps(id));
      expect(console.error.calledOnce).to.equal(true);
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

        const result: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: drag(offset),
          pending: null,
          provided,
        });

        expect(result).to.deep.equal(expected);
      });

      it('should break memoization on every call', () => {
        const { selector, provided, drag } = make();
        const state: DragState = drag({ x: 100, y: 200 });

        const first: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: state,
          pending: null,
          provided,
        });
        const second: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: state,
          pending: null,
          provided,
        });

      // checking we did not get the same reference back
        expect(first).to.not.equal(second);
        expect(first).to.deep.equal(second);
      });
    });

    describe('item is not dragging', () => {
      const dragging = make();
      const notDragging = make();
      it('should return the default props', () => {
        const result: MapProps = execute(notDragging.selector)({
          phase: 'DRAGGING',
          drag: dragging.drag({ x: 100, y: 200 }),
          pending: null,
          provided: notDragging.provided,
        });

        expect(result).to.deep.equal(getDefaultMapProps(notDragging.id));
      });

      it('should not break memoization on multiple calls', () => {
        const first: MapProps = execute(notDragging.selector)({
          phase: 'DRAGGING',
          drag: dragging.drag({ x: 100, y: 200 }),
          pending: null,
          provided: notDragging.provided,
        });
        const second: MapProps = execute(notDragging.selector)({
          phase: 'DRAGGING',
          drag: dragging.drag({ x: 100, y: 200 }),
          pending: null,
          provided: notDragging.provided,
        });

        // checking that we got the same object back
        expect(first).to.equal(second);
      });
    });
  });

  describe('drop animating', () => {
    it('should log an error and return default props if there is no pending drop', () => {
      const { id, selector, provided } = make();

      const props: MapProps = execute(selector)({
        phase: 'DROP_ANIMATING',
        drag: null,
        pending: null,
        provided,
      });

      expect(props).to.deep.equal(getDefaultMapProps(id));
      expect(console.error.calledOnce).to.equal(true);
    });

    describe('item was dragging', () => {
      it('should move to the new home offset', () => {
        const { id, initial, selector, provided, drop } = make();
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
        const pending: PendingDrop = drop(newHomeOffset);

        const props: MapProps = execute(selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending,
          provided,
        });

        expect(props).to.deep.equal(expected);
      });
    });

    describe('item was not dragging and not moved', () => {
      it('should remain in its original position', () => {
        const dragging = make();
        const notDragging = make();
        const expected: MapProps = getDefaultMapProps(notDragging.id);

        const props: MapProps = execute(notDragging.selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: dragging.drop({ x: 100, y: 200 }),
          provided: notDragging.provided,
        });

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization from while the drag was occurring', () => {
        const dragging = make();
        const notDragging = make();
        const defaultProps: MapProps = getDefaultMapProps(notDragging.id);

        const duringDrag: MapProps = execute(notDragging.selector)({
          phase: 'DRAGGING',
          drag: dragging.drag({ x: 100, y: 200 }),
          pending: null,
          provided: notDragging.provided,
        });
        const postDrag: MapProps = execute(notDragging.selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: dragging.drop({ x: 200, y: 200 }),
          provided: notDragging.provided,
        });

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
            amount: dragging.dimension.withMargin.height,
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
            y: -dragging.dimension.withMargin.height,
          },
          initial: null,
        };

        const props: MapProps = execute(notDragging.selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: dragging.drop({ x: 100, y: 100 }, impact),
          provided: notDragging.provided,
        });

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
            amount: dragging.dimension.withMargin.height,
            isMovingForward: true,
          },
          destination: {
            index: dragging.initial.source.index + 1,
            droppableId: dragging.initial.source.droppableId,
          },
        };

        const duringDrag: MapProps = execute(notDragging.selector)({
          phase: 'DRAGGING',
          drag: dragging.drag(offset, impact),
          pending: null,
          provided: notDragging.provided,
        });
        const afterDrag: MapProps = execute(notDragging.selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: dragging.drop({ x: 1, y: 10 }, impact),
          provided: notDragging.provided,
        });

        // checking that the result objects have the same reference
        expect(duringDrag).to.equal(afterDrag);
      });
    });
  });

  describe('drop complete', () => {
    const dragging = make();
    const notDragging = make();

    describe('item was dragging', () => {
      it('should move to the origin with no animation', () => {
        const expected: MapProps = {
          id: dragging.id,
          isDragEnabled: true,
          offset: { x: 0, y: 0 },
          isDropAnimating: false,
          isDragging: false,
          canAnimate: false,
          initial: null,
        };

        const props: MapProps = execute(dragging.selector)({
          phase: 'DROP_COMPLETE',
          drag: null,
          pending: null,
          provided: dragging.provided,
        });

        expect(props).to.deep.equal(expected);
      });
    });

    describe('item was not dragging', () => {
      it('should move to the origin with no animation', () => {
        const expected: MapProps = {
          id: notDragging.id,
          isDragEnabled: true,
          offset: { x: 0, y: 0 },
          isDropAnimating: false,
          isDragging: false,
          canAnimate: false,
          initial: null,
        };

        const props: MapProps = execute(notDragging.selector)({
          phase: 'DROP_COMPLETE',
          drag: null,
          pending: null,
          provided: notDragging.provided,
        });

        expect(props).to.deep.equal(expected);
      });
    });
  });

  describe('other phases', () => {
    it('should return the default props', () => {
      const phases: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS'];
      const { id, selector, provided } = make();

      phases.forEach((phase: Phase): void => {
        const props: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided,
        });

        expect(props).to.deep.equal(getDefaultMapProps(id));
      });
    });
  });
});
