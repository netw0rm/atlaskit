import { waitUntil } from '../../src';

describe('waitUntil', () => {
  it('should call .then after condition is met', () => {
    let val = 0;
    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    return waitUntil(() => val === 1).then(() => {
      expect(val).toBe(1);
    });
  });

  it('should call the passed in function', () => {
    let val = 0;

    function valEqualsOne() {
      return val === 1;
    }

    const spy = jest.fn().mockImplementation(valEqualsOne);

    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    return waitUntil(spy).then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should be able to chain calls', () => {
    let val = 0;

    setTimeout(() => (val += 1), 10);

    return waitUntil(() => (val === 1))
      .then(() => {
        expect(val).toBe(1);

        setTimeout(() => (val += 1));

        return waitUntil(() => (val === 2));
      })
      .then(() => {
        expect(val).toBe(2);
      });
  });

  it('should reject after a certain timeout', () => {
    let val = 2;
    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1, which will never happen;
    return waitUntil(() => (val === 1), 100, 10).then(() => {}, (e) => {
      expect(e).toBe('timeout');
    });
  });
});
