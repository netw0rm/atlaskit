import seanButton, { subtract } from '../src/index.js';

describe('sean-button', () => {
  describe('passing test', () => {
    it('should pass', () => {
      expect(true).to.be.true;
    });
    it('should use seanButton', () => expect(seanButton).to.not.be.null);
  });
});

describe('subract helper function', () => {
  it('should calculate 2 - 1', () => {
    const result = subtract(2, 1);
    expect(result).to.be.equal(1);
  });
});
