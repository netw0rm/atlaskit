import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

import LayerWC from '../src';
import { handlePopperUpdate } from '../src/internal/helpers';


chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-layer: logic', () => {
  let fixture;
  let container;
  let target;

  beforeEach(() => {
    container = document.createElement('div');
    target = document.createElement('div');
    fixture = new LayerWC();
    target.id = 'target';
    fixture.target = target;

    const componentHasShadowRoot = () => !!getShadowRoot(fixture);

    container.appendChild(fixture);
    document.body.appendChild(container);
    document.body.appendChild(target);

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

  it('Popper.js should be initialized', () => {
    const div = getShadowRoot(fixture).firstChild;

    // those are the attibutes that Popper applies to the element when it's initialized
    expect(div.getAttribute('x-placement')).to.equal('right');
    expect(window.getComputedStyle(div).position).to.equal('fixed');
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

      return waitUntil(elemIsFlipped).should.be.fulfilled;
    });
    it('should be false if the layer does have enough space', () => {
      const fakeUpdateWithFlip = {
        flipped: true,
      };
      // popper will not send a 'flipped' param if it was not flipped
      const fakeUpdateNoFlip = {};
      const elemIsFlipped = () => fixture.isFlipped;

      // set up the negative case first, so we'll cause a flip
      handlePopperUpdate(fixture, fakeUpdateWithFlip);

      return waitUntil(elemIsFlipped)
        .then(() => {
          handlePopperUpdate(fixture, fakeUpdateNoFlip);

          // now check that we are unflipped
          return waitUntil(() => !elemIsFlipped());
        }).should.be.fulfilled;
    });
  });

  describe('onUpdate callback', () => {
    it('should be called when popper gets updated', () => {
      const spy = sinon.spy();
      const onUpdateCalled = () => (spy.callCount > 0);

      fixture.onUpdate = spy;
      // trigger an update in popper
      fixture.position = 'top center';

      return waitUntil(onUpdateCalled).should.be.fulfilled;
    });

    it('should pass in isFlipped:true value when flipped', () => {
      const spy = sinon.spy();
      const fakeUpdateWithFlip = {
        flipped: true,
      };
      const onUpdateCalled = () => (spy.callCount > 0);

      fixture.onUpdate = spy;
      handlePopperUpdate(fixture, fakeUpdateWithFlip);

      return waitUntil(onUpdateCalled).then(() => {
        // check that the first argument to the first call of the spy had .isFlipped: true
        expect(spy.args[0][0].isFlipped).to.be.true;
      }).should.be.fulfilled;
    });

    it('should pass in isFlipped:false value when not flipped', () => {
      const spy = sinon.spy();
      const fakeUpdateWithNoFlip = {};
      const onUpdateCalled = () => (spy.callCount > 0);

      fixture.onUpdate = spy;
      handlePopperUpdate(fixture, fakeUpdateWithNoFlip);

      return waitUntil(onUpdateCalled).then(() => {
        // check that the first argument to the first call of the spy had .isFlipped: false
        expect(spy.args[0][0].isFlipped).to.be.false;
      }).should.be.fulfilled;
    });
  });
});
