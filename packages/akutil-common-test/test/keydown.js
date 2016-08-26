import { keydown } from '../src';
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
