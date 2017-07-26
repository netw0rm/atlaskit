import { afterMutations } from '../../src';

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('afterMutations', () => {
  it('should respond to prop changes', (done) => {
    const spy = jest.fn();
    afterMutations(
      spy,
      spy,
      spy,
      () => {
        expect(spy).toHaveBeenCalledTimes(3);
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
