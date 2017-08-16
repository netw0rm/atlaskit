import { name } from '../../../../package.json';
import { expect } from 'chai';
import { doc, p } from '../../../../src/test-helper';
import { isEmpty, isEmptyParagraph } from '../../../../src/editor/utils/document';

describe(name, () => {
  describe('Utils -> Document', () => {
    describe('#isEmptyParagraph', () => {
      it('should return true if paragraph is empty', () => {
        expect(isEmptyParagraph(p())).to.equal(true);
      });

      it('should return false if paragraph is not empty', () => {
        expect(isEmptyParagraph(p('some text'))).to.equal(false);
      });
    });

    describe('#isEmpty', () => {
      it('should return true if node is empty', () => {
        expect(isEmpty(doc())).to.equal(true);
      });

      it('should return true if the only child of a node is an empty paragraph', () => {
        expect(isEmpty(doc(p()))).to.equal(true);
      });

      it('should return true if node only contains empty block nodes', () => {
        expect(isEmpty(doc(p(), p(), p()))).to.equal(true);
      });

      it('should return false if the only child of a node is not an empty paragraph', () => {
        expect(isEmpty(doc(p('some text')))).to.equal(false);
      });

      it('should return false if node contains non-empty block nodes', () => {
        expect(isEmpty(doc(p(), p('some text'), p()))).to.equal(false);
      });
    });
  });
});
