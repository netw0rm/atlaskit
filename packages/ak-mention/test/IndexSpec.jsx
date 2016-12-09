import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Picker, * as other from '../src';
import { name } from '../package.json';

chai.use(chaiAsPromised);
chai.should();

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      Picker.should.be.not.be.null;
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'MentionResource',
        'AbstractMentionResource',
        'AbstractPresenceResource',
        'MentionList',
        'ResourcedMentionList',
        'MentionPicker',
        'default',
      ]);

      other.default.should.be.equals(Picker);
    });
  });
});
