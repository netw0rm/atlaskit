import { getFlipBehavior } from '../../src/internal/helpers';

describe('Layer', () => {
  describe('helpers', () => {
    describe('getFlipBehavior', () => {
      it('with autoFlip = true, returns null', () => {
        const props = {
          position: 'right',
          autoFlip: true,
        };
        expect(getFlipBehavior(props)).to.equal(null);
      });

      it('with autoFlip = false, returns null', () => {
        const props = {
          position: 'right',
          autoFlip: false,
        };
        expect(getFlipBehavior(props)).to.equal(null);
      });

      it('with single value in array', () => {
        const props = {
          position: 'left',
          autoFlip: ['right'],
        };
        expect(getFlipBehavior(props)).to.deep.equal(['left', 'right']);
      });

      it('with multiple values in array', () => {
        const props = {
          position: 'right',
          autoFlip: ['top', 'left', 'bottom'],
        };
        expect(getFlipBehavior(props)).to.deep.equal(['right', 'top', 'left', 'bottom']);
      });
    });
  });
});
