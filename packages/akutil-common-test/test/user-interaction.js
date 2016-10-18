import chai from 'chai';
import sinonChai from 'sinon-chai';

import { keydown, keyup, keypress } from '../src';


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

describe('keypress', () => {
  it('fire keypress events', () => {
    const spy = sinon.spy();
    document.addEventListener('keypress', spy);
    keypress('[');
    document.removeEventListener('keypress', spy);
    spy.should.have.been.calledOnce;
  });
});
