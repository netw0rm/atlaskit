import { expect } from 'chai';

import Picker, * as other from '../src';
import { name } from '../package.json';

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      expect(Picker).to.not.equal(null);
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'MentionResource',
        'AbstractMentionResource',
        'PresenceResource',
        'AbstractPresenceResource',
        'MentionItem',
        'MentionList',
        'ResourcedMentionList',
        'MentionPicker',
        'Mention',
        'ResourcedMention',
        'isSpecialMention',
        'default',
      ]);

      other.default.should.be.equals(Picker);
    });
  });
});
