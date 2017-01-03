import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Nothing, * as other from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(Nothing).to.be.undefined;
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'Emoji',
        'EmojiPicker',
        'EmojiService',
      ]);
    });
  });
});
