import * as chai from 'chai';
import { expect } from 'chai';
import MarkdownInputRulesPlugin from '../../../src/plugins/inputrules';
import {
  a, blockquote, br, chaiPlugin, code_block, doc, em, h1, h2,
  h3, hr, img, li, makeEditor, code, ol, p, strike, strong, ul, mention
} from '../../../test-helper';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: MarkdownInputRulesPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('rule', () => {
    it('should not convert "***" in the middle of a line to a horizontal rule', () => {
      const { pm, sel } = editor(doc(p('test{<>}')));

      pm.input.insertText(sel, sel, 'text***');
      expect(pm.doc).to.not.equal(doc(p(), hr, p()));
    });

    it('should convert "---" at the start of a line to horizontal rule', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '---');
      expect(pm.doc).to.deep.equal(doc(p(), hr, p()));
    });

    it('should not convert "---" in the middle of a line to a horizontal rule', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, 'text---');
      expect(pm.doc).to.not.equal(doc(p('text'), hr, p()));
    });
  });


});
