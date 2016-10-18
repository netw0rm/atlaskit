import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { handlePopperUpdate } from '../src/internal/helpers';
import { flippedSymbol } from '../src/internal/symbols';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-layer helpers', () => {
  // We'll just use an object to represent the element as it should access it the same way as
  // the component.
  let fakeElem;

  beforeEach(() => {
    fakeElem = {
      someState: 'blah',
      [flippedSymbol]: false,
    };
  });

  describe('handlePopperUpdate', () => {
    it('should set the flipped property to true if popper returns flipped state', () => {
      const fakePopperUpdate = {
        flipped: true,
      };

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem[flippedSymbol]).to.be.true;
    });

    it('should set the flipped property to false when popper returns false for isFlipped', () => {
      const fakePopperUpdate = {
        flipped: false,
      };

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem[flippedSymbol]).to.be.false;
    });

    it('should set the flipped property to false when popper returns undefined for flipped', () => {
      // popper doesnt always send the 'flipped' attribute
      const fakePopperUpdate = {};

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem[flippedSymbol]).to.be.false;
    });
  });
});
