import DefaultExport, * as other from '../src';
import EmojiPicker from '../src/EmojiPicker';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(DefaultExport).to.equal(EmojiPicker);
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'Emoji',
        'ResourcedEmoji',
        'EmojiPicker',
        'EmojiTypeAhead',
        'EmojiResource',
        'EmojiService',
        'default',
      ]);
    });
  });
});
