// @flow
import {
  getDraggableDimension,
  getDroppableDimension,
} from '../../../src/state/dimension';
// eslint-disable-next-line no-duplicate-imports
import getDragImpact from '../../../src/state/get-drag-impact';
import noImpact from '../../../src/state/no-impact';
import { getClientRect, noMargin } from '../../utils/dimension';
import type {
  WithinDroppable,
  DraggableId,
  DroppableId,
  DraggableDimension,
  DroppableDimension,
  DraggableDimensionMap,
  DroppableDimensionMap,
  DragImpact,
  Position,
} from '../../../src/types';

const droppableId: DroppableId = 'drop-1';
const noScroll: Position = { x: 0, y: 0 };

const droppable: DroppableDimension = getDroppableDimension({
  id: droppableId,
  clientRect: getClientRect({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  }),
  margin: noMargin,
  windowScroll: noScroll,
  scroll: noScroll,
});

// Making sure the draggables have different heights
// so that we do not get false positives in the tests

// height of 9
const draggable1: DraggableDimension = getDraggableDimension({
  id: 'drag-1',
  droppableId,
  clientRect: getClientRect({
    top: 1,
    left: 10,
    right: 90,
    bottom: 11,
  }),
  margin: noMargin,
  windowScroll: noScroll,
});

// // height of 19
// const draggable2: Dimension = getDimension({
//   id: 'drag-2',
//   top: 11,
//   left: 10,
//   right: 90,
//   bottom: 30,
// });

// // height of 29
// const draggable3: Dimension = getDimension({
//   id: 'drag-3',
//   top: 31,
//   left: 10,
//   right: 90,
//   bottom: 60,
// });

const droppables: DroppableDimensionMap = {
  [droppable.id]: droppable,
};

const draggables: DraggableDimensionMap = {
  [draggable1.id]: draggable1,
  // [draggable2.id]: draggable2,
  // [draggable3.id]: draggable3,
};

describe('get drag impact', () => {
  it.only('should return no movement when not dragging over anything', () => {
    // dragging up above the list
    const page: Position = {
      x: droppable.page.withMargin.left,
      y: droppable.page.withMargin.top - 100,
    };

    const withinDroppable: WithinDroppable = {
      center: page,
    };

    const impact: DragImpact = getDragImpact({
      page,
      withinDroppable,
      draggableId: draggable1.id,
      draggables,
      droppables,
    });

    expect(impact).toEqual(noImpact);
  });

  describe('moving forward', () => {
    describe('not moved far enough', () => {
      it('should return the starting position', () => {
        // moving forward - but not enough
        const newCenter: Position = {
          x: draggable2.center.x,
          y: draggable2.center.y + 1,
        };
        const expected: DragImpact = {
          movement: {
            amount: 0,
            draggables: [],
            isMovingForward: true,
          },
          destination: {
            droppableId: droppable.id,
            index: 1,
          },
        };

        const impact: DragImpact = getDragImpact(newCenter, draggable2.id, draggables, droppables);

        expect(impact).to.deep.equal(expected);
      });
    });

    describe('moving past one item', () => {
      // moving forward past the top of the next item
      const newCenter: Position = {
        x: draggable1.center.x,
        y: draggable2.withMargin.top + 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable1.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(1);
      });

      it('should indicate that the item being move forward', () => {
        expect(impact.movement.isMovingForward).to.equal(true);
      });

      it('should indicate that the item being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable1.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable2.id]);
      });
    });

    describe('moving past two items', () => {
      // moving forward past the top of the third item
      const newCenter: Position = {
        x: draggable1.center.x,
        y: draggable3.withMargin.top + 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable1.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(2);
      });

      it('should indicate that the item being move forward', () => {
        expect(impact.movement.isMovingForward).to.equal(true);
      });

      it('should indicate that the item being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable1.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable2.id, draggable3.id]);
      });
    });

    describe('moving past one item when the dragging item is not the first in the list', () => {
      // moving the second item forward past the top of the third item
      const newCenter: Position = {
        x: draggable2.center.x,
        y: draggable3.withMargin.top + 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable2.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(2);
      });

      it('should indicate that the item being move forward', () => {
        expect(impact.movement.isMovingForward).to.equal(true);
      });

      it('should indicate that the item being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable2.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable3.id]);
      });
    });
  });

  // same tests as moving forward
  describe('moving backward', () => {
    describe('not moved far enough', () => {
      it('should return the initial location', () => {
        // moving the last item backward - but not enough
        const newCenter: Position = {
          x: draggable3.center.x,
          y: draggable3.center.y - 1,
        };

        const impact: DragImpact = getDragImpact(newCenter, draggable3.id, draggables, droppables);

        expect(impact).to.deep.equal({
          movement: {
            amount: 0,
            draggables: [],
            isMovingForward: false,
          },
          destination: {
            droppableId: droppable.id,
            index: 2,
          },
        });
      });
    });

    describe('moving past one item', () => {
      // moving backward past the bottom of the previous item
      const newCenter: Position = {
        x: draggable3.center.x,
        y: draggable2.withMargin.bottom - 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable3.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(1);
      });

      it('should indicate that the item being moved backward', () => {
        expect(impact.movement.isMovingForward).to.equal(false);
      });

      it('should indicate that the item being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable3.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable2.id]);
      });
    });

    describe('moving past two items', () => {
      // moving the last item backward past the bottom of the first item
      const newCenter: Position = {
        x: draggable3.center.x,
        y: draggable1.withMargin.bottom - 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable3.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(0);
      });

      it('should indicate that the item being moved backward', () => {
        expect(impact.movement.isMovingForward).to.equal(false);
      });

      it('should indicate that the items being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable3.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable1.id, draggable2.id]);
      });
    });

    describe('moving past one item when the dragging item is not the last in the list', () => {
      // moving the second item backward past the bottom of the first item
      const newCenter: Position = {
        x: draggable2.center.x,
        y: draggable1.withMargin.bottom - 1,
      };

      const impact: DragImpact = getDragImpact(newCenter, draggable2.id, draggables, droppables);

      it('should return the droppable the item is in', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.droppableId).to.equal(droppable.id);
      });

      it('should return the new index of the item', () => {
        if (!impact.destination) {
          expect.fail();
          return;
        }
        expect(impact.destination.index).to.equal(0);
      });

      it('should indicate that the item being moved backward', () => {
        expect(impact.movement.isMovingForward).to.equal(false);
      });

      it('should indicate that the items being moved should move the height of the item being dragged', () => {
        expect(impact.movement.amount).to.equal(draggable2.withMargin.height);
      });

      it('should return the items that need to be moved', () => {
        expect(impact.movement.draggables).to.deep.equal([draggable1.id]);
      });
    });
  });
});
