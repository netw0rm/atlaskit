import DefaultExport, * as other from '../src';
import EmojiPicker from '../src/components/picker/EmojiPicker';
import { name } from '../package.json';
import { expect } from 'chai';

describe(name, () => {
  describe('exports', () => {
    it('should not export a base component', () => {
      expect(DefaultExport).to.equal(EmojiPicker);
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'Emoji',
        'EmojiPlaceholder',
        'ResourcedEmoji',
        'ResourcedEmojiShortcut',
        'EmojiPicker',
        'EmojiTypeAhead',
        'EmojiResource',
        'EmojiProvider',
        'AbstractResource',
        'EmojiService',
        'EmojiSearchResult',
        'EmojiLoader',
        'denormaliseEmojiServiceResponse',
        'default',
      ]);
    });
  });
});
