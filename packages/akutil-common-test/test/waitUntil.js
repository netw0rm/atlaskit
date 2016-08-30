import { waitUntil } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

describe('waitUntil', () => {
  it('should call .then after condition is met', (done) => {
    let val = 0;
    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    waitUntil(() => (val === 1)).then(() => {
      expect(val).to.equal(1);
      done();
    });
  });

  it('should call the passed in function', (done) => {
    let val = 0;

    function valEqualsOne() {
      return val === 1;
    }

    const spy = sinon.spy(valEqualsOne);

    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    waitUntil(spy).then(() => {
      spy.should.have.been.called;
      done();
    });
  });

  it('should be able to chain calls', (done) => {
    let val = 0;

    setTimeout(() => (val += 1), 10);

    waitUntil(() => (val === 1))
      .then(() => {
        expect(val).to.equal(1);

        setTimeout(() => (val += 1));

        return waitUntil(() => (val === 2));
      })
      .then(() => {
        expect(val).to.equal(2);
        done();
      });
  });
});
