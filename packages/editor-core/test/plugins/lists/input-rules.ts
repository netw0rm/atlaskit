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

  describe('bullet list rule', () => {
    it('should convert "* " to a bullet list item', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(ul(li(p()))));
    });

    it('should not convert "** " to a nested bullet list item', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '** ');
      expect(pm.doc).to.deep.equal(doc(p('** ')));
    });

    it('should not convert "* " to a bullet list item when already inside a list', () => {
      const { pm, sel } = editor(doc(ul(li(p('{<>}')))));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('* ')))));
    });

    it('should convert "* " to a bullet list item when inside a blockquote', () => {
      const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(blockquote(ul(li(p())))));
    });

    it('should not convert "* " to a bullet list item when inside a codeblock', () => {
      const { pm, sel } = editor(doc(code_block()('{<>}')));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(code_block()('* ')));
    });

    it('should not convert "* " to a bullet list item when inside a heading', () => {
      const { pm, sel } = editor(doc(h1('{<>}')));

      pm.input.insertText(sel, sel, '* ');
      expect(pm.doc).to.deep.equal(doc(h1('* ')));
    });
  });

  describe('ordered list rule', () => {
    it('should convert "[number]. " to a ordered list item', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should always begin a new list on 1', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '3. ');
      expect(pm.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should convert "[number]. " to a ordered list item when inside a blockquote', () => {
      const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(blockquote(ol(li(p())))));
    });

    it('should not convert "[number]. " to a ordered list item when inside a codeblock', () => {
      const { pm, sel } = editor(doc(code_block()('{<>}')));

      pm.input.insertText(sel, sel, '1. ');
      expect(pm.doc).to.deep.equal(doc(code_block()('1. ')));
    });
  });


});
