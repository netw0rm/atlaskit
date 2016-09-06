import { keydown, keyup } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

describe('keydown', () => {
  it('fire keydown events', () => {
    const spy = sinon.spy();
    document.addEventListener('keydown', spy);
    keydown('[');
    document.removeEventListener('keydown', spy);
    spy.should.have.been.calledOnce;
  });
});

describe('keyup', () => {
  it('fire keyup events', () => {
    const spy = sinon.spy();
    document.addEventListener('keyup', spy);
    keyup('[');
    document.removeEventListener('keyup', spy);
    spy.should.have.been.calledOnce;
  });
});
