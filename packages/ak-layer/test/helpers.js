import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { handlePopperUpdate } from '../src/internal/helpers';

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
      _isFlipped: false,
    };
  });

  describe('handlePopperUpdate', () => {
    it('should set the _isFlipped property to true if popper returns flipped state', () => {
      const fakePopperUpdate = {
        flipped: true,
      };

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem._isFlipped).to.be.true; // eslint-disable-line no-underscore-dangle
    });

    it('should set the _isFipped property to false when popper returns false for isFlipped', () => {
      const fakePopperUpdate = {
        flipped: false,
      };

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem._isFlipped).to.be.false; // eslint-disable-line no-underscore-dangle
    });

    it('should set the _isFipped property to false when popper returns undefined for flipped', () => { // eslint-disable-line  max-len
      // popper doesnt always send the 'flipped' attribute
      const fakePopperUpdate = {};

      handlePopperUpdate(fakeElem, fakePopperUpdate);

      expect(fakeElem._isFlipped).to.be.false; // eslint-disable-line no-underscore-dangle
    });
  });
});
