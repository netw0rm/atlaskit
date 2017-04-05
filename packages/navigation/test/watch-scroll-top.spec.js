import { expect } from 'chai';
import sinon from 'sinon';
import subscribe from '../src/watch-scroll-top';

describe('watch scroll top', () => {
  it('should execute the callback when the user scrolls', () => {
    const stub = sinon.stub();
    const el = document.createElement('div');
    subscribe(el, stub);

    el.scrollTo(0, 1000);

    expect(stub.called).to.equal(true);
  });

  it('should not execute the callback if the scroll has not changed', () => {

  });

  it('should return a function that cancels the subscription', () => {

  });
});
