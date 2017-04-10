import { expect } from 'chai';
import sinon from 'sinon';
import createStub from 'raf-stub';
import subscribe from '../src/watch-scroll-top';

const raf = createStub();
const originalRaf = window.requestAnimationFrame;
const originalCaf = window.cancelAnimationFrame;

describe('watch scroll top', () => {
  let unsubscribeManaged;

  const triggerScroll = (el, scrollTop) => {
    el.scrollTop = scrollTop;
    // currently not working with new CustomEvent() so using an older syntax
    const event = document.createEvent('Event');
    event.initEvent('scroll', true, true);
    el.dispatchEvent(event);
  };

  const startManagedSubscription = (el, fn) => {
    unsubscribeManaged = subscribe(el, fn);
  };

  before(() => {
    window.requestAnimationFrame = raf.add;
    window.cancelAnimationFrame = raf.remove;
  });

  afterEach(() => {
    raf.reset();
    if (unsubscribeManaged) {
      unsubscribeManaged();
      unsubscribeManaged = null;
    }
  });

  after(() => {
    window.requestAnimationFrame = originalRaf;
    window.cancelAnimationFrame = originalCaf;
  });

  it('should execute the callback immediately with the current scroll', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');
    el.scrollTop = 500;

    startManagedSubscription(el, callback);

    expect(callback.calledWith(500)).to.equal(true);
  });

  it('should execute the callback when the user scrolls', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);
    triggerScroll(el, 200);
    raf.step();

    expect(callback.calledWith(200)).to.equal(true);
  });

  it('should execute the callback if the scroll changes', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    raf.step();

    expect(callback.secondCall.calledWith(200)).to.equal(true);

    triggerScroll(el, 500);
    raf.step();

    expect(callback.thirdCall.calledWith(500)).to.equal(true);
  });

  it('should not execute the callback if the scroll has not changed', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    raf.step();

    expect(callback.callCount).to.equal(2);

    triggerScroll(el, 200);
    raf.step();

    expect(callback.callCount).to.equal(2);
  });

  it('should wait for an animation frame before triggering the returning the scrollTop', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');
    el.scrollTop = 0;

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    triggerScroll(el, 300);
    triggerScroll(el, 400);
    raf.step();

    expect(callback.firstCall.calledWith(0)).to.equal(true);
    expect(callback.secondCall.calledWith(400)).to.equal(true);
  });

  it('should return a function that cancels the subscription', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    const unsubscribe = subscribe(el, callback);

    expect(callback.callCount).to.equal(1);

    unsubscribe();

    // would normally trigger the scroll handler
    triggerScroll(el, 400);
    raf.step();

    expect(callback.callCount).to.equal(1);
  });

  it('should cancel any pending animation frames on unsubscribe', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    const unsubscribe = subscribe(el, callback);

    expect(callback.callCount).to.equal(1);

    // will create an animation frame
    triggerScroll(el, 400);
    // unsubscribe before frame is executed
    unsubscribe();
    // tick any frames
    raf.step();

    expect(callback.callCount).to.equal(1);
  });
});
