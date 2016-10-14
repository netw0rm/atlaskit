import chai from 'chai';
import sinonChai from 'sinon-chai';

import { afterMutations } from '../src';


chai.should();
chai.use(sinonChai);

describe('afterMutations', () => {
  it('should respond to prop changes', (done) => {
    const spy = sinon.spy();
    afterMutations(
      spy,
      spy,
      spy,
      () => {
        spy.should.have.been.calledThrice;
        done();
      });
  });

  it('should allow returning values', (done) => {
    afterMutations(
      () => 1,
      (n) => {
        n.should.be.equal(1);
        return n + 2;
      },
      n => (n.should.be.equal(3)),
      done
    );
  });
});
