// @flow
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { makeSelector } from '../../../src/view/droppable/connected-droppable';
import noImpact from '../../../src/state/no-impact';
import getDimension from '../get-dimension-util';
import type {
  Phase,
  DragState,
  PendingDrop,
  Position,
  DraggableId,
  DroppableId,
  InitialDrag,
  DragImpact,
  DropResult,
  CurrentDrag,
  Dimension,
} from '../../../src/types';
import type { OwnProps, NeedsProviding, MapProps } from '../../../src/view/droppable/droppable-types';

const provide = (ownProps: OwnProps): NeedsProviding => ({
  id: ownProps.id,
  isDropEnabled: ownProps.isDropEnabled,
});

const defaultProvided: NeedsProviding = provide({
  id: 'drop-1',
  isDropEnabled: true,
});

type SelectorArgs = {|
  phase: Phase,
  drag: ?DragState,
  pending: ?PendingDrop,
  provided: NeedsProviding,
|}

const execute = (selector: Function) =>
  ({ phase, drag, pending, provided }: SelectorArgs) =>
    selector.resultFunc(
      phase, drag, pending, provided
    );

const getDefaultMapProps = (id): MapProps => ({
  id,
  isDraggingOver: false,
});

const droppableId: DroppableId = 'drop-1';
const draggableId: DraggableId = 'drag-1';

type DragArgs = {|
  isDraggingOver: boolean
|}

const perform = (() => {
  const dragDimension: Dimension = getDimension({
    top: 100,
    left: 0,
    right: 100,
    bottom: 200,
  });
  const initial: InitialDrag = {
    source: {
      index: 0,
      droppableId,
    },
    center: dragDimension.center,
    scroll: { x: 0, y: 0 },
    selection: dragDimension.center,
    dimension: dragDimension,
  };
  const offset: Position = {
    x: 10,
    y: 20,
  };
  const center: Position = {
    x: initial.center.x + offset.x,
    y: initial.center.y + offset.y,
  };
  const current: CurrentDrag = {
    id: draggableId,
    type: 'TYPE',
    offset,
    center,
    shouldAnimate: true,
  };

  const dragOverImpact: DragImpact = {
    movement: {
      draggables: [draggableId],
      amount: dragDimension.height,
      isMovingForward: true,
    },
    destination: {
      index: initial.source.index + 1,
      droppableId,
    },
  };

  const drag = ({ isDraggingOver }: DragArgs): DragState => {
    const state: DragState = {
      current,
      impact: isDraggingOver ? dragOverImpact : noImpact,
      initial,
    };
    return state;
  };

  const drop = ({ isDraggingOver }: DragArgs): PendingDrop => {
    // some made up position
    const newHomeOffset: Position = {
      x: 100,
      y: 20,
    };

    const result: DropResult = {
      draggableId,
      source: initial.source,
      destination: {
        index: initial.source.index + 1,
        droppableId: initial.source.droppableId,
      },
    };

    const pending: PendingDrop = {
      newHomeOffset,
      result,
      last: drag({ isDraggingOver }),
    };

    return pending;
  };

  return { drag, drop };
})();

describe('Droppable - connected', () => {
  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  describe('dropping is disabled', () => {
    const phases: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS', 'DRAGGING', 'DROP_ANIMATING', 'DROP_COMPLETE'];

    it('should always return the default props', () => {
      const expected: MapProps = {
        id: droppableId,
        isDraggingOver: false,
      };

      phases.forEach((phase: Phase) => {
        const props: MapProps = execute(makeSelector(provide))({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(expected);
      });
    });

    it('should not break memoization on multiple calls', () => {
      phases.forEach((phase: Phase) => {
        const selector = makeSelector(provide);

        const first: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });
        const second: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });

        // checking object equality
        expect(first).to.equal(second);
      });
    });
  });

  describe('while dragging', () => {
    it('should log an error an return the default props if no drag is available', () => {
      const props: MapProps = execute(makeSelector(provide))({
        phase: 'DRAGGING',
        drag: null,
        pending: null,
        provided: defaultProvided,
      });

      expect(props).to.deep.equal(getDefaultMapProps(defaultProvided.id));
      expect(console.error.called).to.equal(true);
    });

    describe('dragging over', () => {
      it('should return that it is dragging over', () => {
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: true,
        };

        const props: MapProps = execute(makeSelector(provide))({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: true }),
          pending: null,
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization on multiple drags', () => {
        const selector = makeSelector(provide);
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: true,
        };

        const props1: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: true }),
          pending: null,
          provided: defaultProvided,
        });
        const props2: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: true }),
          pending: null,
          provided: defaultProvided,
        });

        // checking object equality
        expect(props1).to.equal(props2);
        expect(props1).to.deep.equal(expected);
        expect(props2).to.deep.equal(expected);
      });
    });

    describe('not dragging over', () => {
      it('should return that it is not dragging over', () => {
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: false,
        };

        const props: MapProps = execute(makeSelector(provide))({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: false }),
          pending: null,
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization on multiple drags', () => {
        const selector = makeSelector(provide);
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: false,
        };

        const props1: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: false }),
          pending: null,
          provided: defaultProvided,
        });
        const props2: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: false }),
          pending: null,
          provided: defaultProvided,
        });

        // checking object equality
        expect(props1).to.equal(props2);
        expect(props1).to.deep.equal(expected);
        expect(props2).to.deep.equal(expected);
      });
    });
  });

  describe('while drop animating', () => {
    it('should log an error an return the default props if no pending drop is available', () => {
      const props: MapProps = execute(makeSelector(provide))({
        phase: 'DROP_ANIMATING',
        drag: null,
        pending: null,
        provided: defaultProvided,
      });

      expect(props).to.deep.equal(getDefaultMapProps(defaultProvided.id));
      expect(console.error.called).to.equal(true);
    });

    describe('dragging over', () => {
      it('should return that it is dragging over', () => {
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: true,
        };

        const props: MapProps = execute(makeSelector(provide))({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: perform.drop({ isDraggingOver: true }),
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization from a previous DRAGGING phase', () => {
        const selector = makeSelector(provide);
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: true,
        };

        const dragging: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: true }),
          pending: null,
          provided: defaultProvided,
        });
        const dropAnimating: MapProps = execute(selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: perform.drop({ isDraggingOver: true }),
          provided: defaultProvided,
        });

        expect(dragging).to.deep.equal(expected);
        expect(dropAnimating).to.deep.equal(expected);
        // checking object equality
        expect(dragging).to.equal(dropAnimating);
      });
    });

    describe('not dragging over', () => {
      it('should return that it is not dragging over', () => {
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: false,
        };

        const props: MapProps = execute(makeSelector(provide))({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: perform.drop({ isDraggingOver: false }),
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(expected);
      });

      it('should not break memoization from a previous DRAGGING phase', () => {
        const selector = makeSelector(provide);
        const expected: MapProps = {
          id: droppableId,
          isDraggingOver: false,
        };

        const dragging: MapProps = execute(selector)({
          phase: 'DRAGGING',
          drag: perform.drag({ isDraggingOver: false }),
          pending: null,
          provided: defaultProvided,
        });
        const dropAnimating: MapProps = execute(selector)({
          phase: 'DROP_ANIMATING',
          drag: null,
          pending: perform.drop({ isDraggingOver: false }),
          provided: defaultProvided,
        });

        expect(dragging).to.deep.equal(expected);
        expect(dropAnimating).to.deep.equal(expected);
        // checking object equality
        expect(dragging).to.equal(dropAnimating);
      });
    });
  });

  describe('other phases', () => {
    const other: Phase[] = ['IDLE', 'COLLECTING_DIMENSIONS', 'DROP_COMPLETE'];

    it('should return the default props', () => {
      const selector = makeSelector(provide);

      other.forEach((phase: Phase): void => {
        const props: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });

        expect(props).to.deep.equal(getDefaultMapProps(defaultProvided.id));
      });
    });

    it('should not break memoization on multiple calls', () => {
      const selector = makeSelector(provide);

      other.forEach((phase: Phase): void => {
        const first: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });
        const second: MapProps = execute(selector)({
          phase,
          drag: null,
          pending: null,
          provided: defaultProvided,
        });

        expect(first).to.deep.equal(getDefaultMapProps(defaultProvided.id));
        expect(second).to.deep.equal(getDefaultMapProps(defaultProvided.id));
        // checking object equality
        expect(first).to.equal(second);
      });
    });
  });
});
