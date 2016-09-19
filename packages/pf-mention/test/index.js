import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MentionPicker, * as other from '../src';
import { name } from '../package.json';
import { Component } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new MentionPicker).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      other.events.should.be.defined;
      Object.keys(other.events).should.be.deep.equal(['selected', 'mentionListRendered']);
    });

    it('should export all the right subcomponents', () => {
      Object.keys(other).should.be.deep.equal([
        'MentionResource',
        'AbstractMentionResource',
        'MentionList',
        'ResourcedMentionList',
        'MentionPicker',
        'events',
        'default',
      ]);

      (new other.MentionList).should.be.an.instanceof(Component);
      (new other.ResourcedMentionList).should.be.an.instanceof(Component);
      (new other.MentionPicker).should.be.an.instanceof(Component);

      other.default.should.be.equals(MentionPicker);
    });
  });
});
