import { afterMutations } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
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
});
