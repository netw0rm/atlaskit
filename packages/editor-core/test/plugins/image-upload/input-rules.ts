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

  describe('image rule', () => {
    it('should convert `![text](url)` to image', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, `![text](url)`);
      expect(pm.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
    });
  });


});
