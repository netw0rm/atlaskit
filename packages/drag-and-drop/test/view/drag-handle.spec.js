describe('Drag handle', () => {
  describe('unmounting', () => {
    it('should not do anything if nothing is dragging', () => {

    });

    describe('currently dragging', () => {
      it('should unbind window events', () => {

      });

      it('should call onCancel', () => {

      });
    });
  });

  describe('navigation', () => {
    it('should be selectable when dragging is enabled', () => {

    });

    it('should not be selectable when dragging is not enabled', () => {

    });

    it('should allow tabbing to another draggable while not dragging', () => {

    });

    it('should not allow tabbing to another draggable while dragging', () => {

    });
  });

  describe('cursor', () => {
    it('should use standard cursor when dragging is not enabled', () => {

    });

    it('should use a grab cursor when dragging is enabled and the user is not dragging', () => {

    });

    it('should use a grabbing cursor when dragging is enabled and the user is dragging', () => {

    });
  });

  describe('mouse dragging', () => {
    describe('lift', () => {
      it('should cancel a current keyboard drag', () => {

      });

      it('should not cancel a keyboard drag if there is no current one', () => {

      });

      it('should throw if it is already dragging', () => {

      });

      it('should not do anything if dragging is not enabled', () => {

      });

      it('should not do anything if not using the primary mouse button', () => {

      });

      it('should call `lift` with the current mouse down position', () => {

      });
    });

    describe('move', () => {
      it('should not do anything if not using the primary mouse button', () => {

      });

      it('should publish `move` with the current mouse position', () => {

      });

      it('should publish `move` even when the mouse event is outside the dragging element', () => {

      });

      it('should throw an error if somehow a user manages to trigger a mouse down event before a mouse up', () => {

      });

      it('should cancel a drag when the escape key is pressed', () => {

      });

      it('should not move if the up arrow is pressed', () => {

      });

      it('should not move if the down arrow is pressed', () => {

      });
    });

    describe('drop', () => {
      it('should throw if you are not dragging', () => {

      });

      it('should drop when you lift any button', () => {

      });

      it('should drop when you press spacebar', () => {

      });

      describe('cleanup', () => {
        it('should not do anything on mouse moves', () => {

        });

        it('should not do anything on mouse up', () => {

        });
      });
    });
  });

  describe('keyboard dragging', () => {
    describe('lift', () => {
      it('should not lift if dragging is disabled', () => {

      });

      it('should lift on a spacebar press', () => {

      });

      it('should not scroll the page when pressing spacebar', () => {

      });
    });

    describe('move', () => {
      it('should do nothing if not lifted', () => {

      });

      describe('pressing the up arrow', () => {
        it('should move backward', () => {

        });

        it('should prevent scrolling', () => {

        });
      });

      describe('pressing the down arrow', () => {
        it('should move forward', () => {

        });

        it('should prevent scrolling', () => {

        });
      });
    });

    describe('drop', () => {
      it('should drop on a spacebar press after a lift', () => {

      });
    });
  });

  describe('disabling drag', () => {
    it('should not cancel drags if there is nothing dragging', () => {

    });

    it('should cancel any current drags', () => {

    });
  });

  describe('subsequent drags', () => {
    it('should be possible to do another drag after one finishes', () => {

    });
  });
});
