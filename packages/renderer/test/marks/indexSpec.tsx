import { mount } from 'enzyme';
import { expect } from 'chai';
import {
  getMarksByOrder,
  isSameMark,
  markOrder,
  renderMark,
} from '../../src/marks';
import Strong from '../../src/marks/strong';

describe('Marks', () => {

  describe('getMarksByOrder', () => {
    it('should return marks in right order', () => {
      const unorderedMarks = [
        {
          type: 'strong'
        },
        {
          type: 'link'
        },
        {
          type: 'em'
        },
        {
          type: 'mono'
        },
        {
          type: 'subsup'
        },
        {
          type: 'underline'
        },
        {
          type: 'strike'
        },
      ];

      const orderedMarks = getMarksByOrder(unorderedMarks);
      orderedMarks.forEach((mark, index) => {
        expect(markOrder[index]).to.equal(mark.type);
      });
    });
  });

  describe('isSameMark', () => {

    it('should return false if mark is null or otherMark is null', () => {
      expect(isSameMark(null, { type: 'strong' })).to.equal(false);
      expect(isSameMark({ type: 'strong' }, null)).to.equal(false);
    });

    it('should return false if type is not the same', () => {
      expect(isSameMark({ type: 'strong' }, { type: 'strike' })).to.equal(false);
    });

    it('should return false if mark has attributes but otherMark does not, or vice-versa', () => {
      expect(isSameMark({ type: 'link', attrs: {} }, { type: 'link' })).to.equal(false);
      expect(isSameMark({ type: 'link' }, { type: 'link', attrs: {} })).to.equal(false);
    });

    it('should return false if mark-type is the same but attributes is not', () => {
      expect(isSameMark({ type: 'link', attrs: { url: 'www.atlassian.com' } }, { type: 'link', attrs: { url: 'www.hipchat.com' } })).to.equal(false);
    });

    it('should return true if type is the same and attributes match', () => {
      expect(isSameMark({ type: 'link', attrs: { url: 'www.atlassian.com' } }, { type: 'link', attrs: { url: 'www.atlassian.com' } })).to.equal(true);
    });

  });

  describe('renderMark', () => {

    it('should render the right mark based on type', () => {
      const mark = mount(renderMark( { type: 'strong', content: [ { type: 'text', text: 'hello world' } ]}));
      expect(mark.is(Strong)).to.equal(true);
    });

    it('should render as text if given a textnode', () => {
      expect(renderMark( { type: 'text', text: 'hello world' } as any)).to.equal('hello world');
    });

    it('should ignore unknown mark and render it the content', () => {
      expect(renderMark( { type: 'stroooong', content: [ { type: 'text', text: 'hello world' } ]})).to.equal('hello world');
    });

  });

});
