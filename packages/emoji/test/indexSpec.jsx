import Nothing, * as other from '../src';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(Nothing).to.equal(undefined);
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'Emoji',
        'EmojiPicker',
        'EmojiTypeAhead',
        'EmojiResource',
        'EmojiService',
        'ResourcedEmoji',
      ]);
    });
  });
});
