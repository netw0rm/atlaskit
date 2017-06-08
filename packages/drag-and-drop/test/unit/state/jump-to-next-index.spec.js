// @flow
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getDiffToJumpBackward, getDiffToJumpForward } from '../../../src/state/jump-to-next-index';
import getDimension from '../get-dimension-util';
import type {
  Dimension,
  DimensionMap,
  DraggableLocation,
  Position,
} from '../../../src/types';

const droppable: Dimension = getDimension({
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
});

const draggable1: Dimension = getDimension({
  top: 10,
  left: 10,
  bottom: 20,
  right: 90,
});

const draggable2: Dimension = getDimension({
  top: 21,
  left: 10,
  bottom: 30,
  right: 90,
});

const draggable3: Dimension = getDimension({
  top: 31,
  left: 10,
  bottom: 40,
  right: 90,
});

const droppables: DimensionMap = {
  [droppable.id]: droppable,
};

const draggables: DimensionMap = {
  [draggable1.id]: draggable1,
  [draggable2.id]: draggable2,
  [draggable3.id]: draggable3,
};

describe('jump to next index', () => {
  describe('jump forward', () => {
    it('should return null if cannot move forward', () => {
      const location: DraggableLocation = {
        index: 2,
        droppableId: droppable.id,
      };

      const point: ?Position = getDiffToJumpForward(
        draggable3.center,
        location,
        draggables,
        droppables,
      );

      expect(point).to.equal(null);
    });

    describe('moving an item forward one place', () => {
      it('should return how far is needed to move', () => {
        const location: DraggableLocation = {
          index: 0,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: draggable2.center.x - draggable1.center.x,
          y: draggable2.center.y - draggable1.center.y,
        };

        const result: ?Position = getDiffToJumpForward(
          draggable1.center,
          location,
          draggables,
          droppables,
        );

        expect(result).to.deep.equal(expected);
      });
    });

    describe('moving an item forward that is not the first in the list', () => {
      it('should return how far is needed to move', () => {
        const location: DraggableLocation = {
          index: 1,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: draggable3.center.x - draggable2.center.x,
          y: draggable3.center.y - draggable2.center.y,
        };

        const result: ?Position = getDiffToJumpForward(
          draggable2.center,
          location,
          draggables,
          droppables,
        );

        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe('jump backward', () => {
    it('should return null if cannot move backward', () => {
      const location: DraggableLocation = {
        index: 0,
        droppableId: droppable.id,
      };

      const point: ?Position = getDiffToJumpBackward(
        draggable1.center,
        location,
        draggables,
        droppables,
      );

      expect(point).to.equal(null);
    });

    describe('moving an item backward one place', () => {
      it('should return how far is needed to move', () => {
        // dragging the third item back one
        const location: DraggableLocation = {
          index: 2,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: -1 * (draggable2.center.x - draggable3.center.x),
          y: -1 * (draggable2.center.y - draggable3.center.y),
        };

        const result: ?Position = getDiffToJumpBackward(
          draggable3.center,
          location,
          draggables,
          droppables,
        );

        expect(result).to.deep.equal(expected);
      });
    });

    describe('moving an item backward that is not the last in the list', () => {
      it('should return how far is needed to move', () => {
        // dragging the second item back one
        const location: DraggableLocation = {
          index: 1,
          droppableId: droppable.id,
        };
        const expected: Position = {
          x: -1 * (draggable1.center.x - draggable2.center.x),
          y: -1 * (draggable1.center.y - draggable2.center.y),
        };

        const result: ?Position = getDiffToJumpBackward(
          draggable2.center,
          location,
          draggables,
          droppables,
        );

        expect(result).to.deep.equal(expected);
      });
    });
  });
});
