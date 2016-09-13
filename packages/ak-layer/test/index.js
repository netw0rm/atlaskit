import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import LayerWC from '../src/index';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import { handlePopperUpdate } from '../src/internal/helpers';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-layer: logic', () => {
  let fixture;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    fixture = new LayerWC();
    const componentHasShadowRoot = () => !!getShadowRoot(fixture);

    container.appendChild(fixture);
    document.body.appendChild(container);

    return waitUntil(componentHasShadowRoot);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should be possible to create a component', () => {
    expect(() => new LayerWC()).not.to.throw(Error);
  });

  it('should have an alignment object attached', () => {
    const alignmentObjectAttached = () => fixture.alignment !== undefined;

    return waitUntil(alignmentObjectAttached).should.be.fulfilled;
  });

  describe('.isFlipped getter', () => {
    it('should be true if the layer does not have enough space', () => {
      // we'll test this by manually calling the handlePopperUpdate function, testing actual spaces
      // would just be testing poppers functionality.

      // popper sends back an object from the onUpdate method. We'll mock that object here
      const fakePopperUpdate = {
        flipped: true,
      };
      const elemIsFlipped = () => fixture.isFlipped;

      // check the negative case first
      expect(elemIsFlipped()).to.be.false;
      handlePopperUpdate(fixture, fakePopperUpdate);

      waitUntil(elemIsFlipped).should.be.fulfilled;
    });
    it('should be false if the layer does have enough space', () => {
      // popper will not send a 'flipped' param if it was not flipped
      const fakePopperUpdate = {};
      const elemIsFlipped = () => fixture.isFlipped;

      handlePopperUpdate(fixture, fakePopperUpdate);

      waitUntil(elemIsFlipped).should.be.fulfilled;
    });
  });
});
