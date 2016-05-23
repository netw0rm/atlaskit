import seanButton from '../src/index.js';

describe('sean-button', () => {
  describe('passing test', () => {
    it('should pass', () => {
      expect(true).to.be.true;
    });
    it('should use seanButton', () => expect(seanButton).to.not.be.null);
  });
});
