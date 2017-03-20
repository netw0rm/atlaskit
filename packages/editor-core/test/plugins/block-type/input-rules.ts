import * as chai from 'chai';
import { expect } from 'chai';
import BlockTypePlugin from '../../../src/plugins/block-type';
import {
  blockquote, chaiPlugin, doc, h1, h2, h3, li, makeEditor, p, ul
} from '../../../src/test-helper';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: BlockTypePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('heading rule', () => {
    it('should convert "# " to heading 1', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '# ');
      expect(pm.doc).to.deep.equal(doc(h1()));
    });

    it('should convert "## " to heading 2', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '## ');
      expect(pm.doc).to.deep.equal(doc(h2()));
    });

    it('should convert "### " to heading 3', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '### ');
      expect(pm.doc).to.deep.equal(doc(h3()));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { pm, sel } = editor(doc(p('{<>}')));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { pm, sel } = editor(doc(blockquote(p('{<>}'))));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a list', () => {
      const { pm, sel } = editor(doc(ul(li(p('{<>}')))));

      pm.input.insertText(sel, sel, '> ');
      expect(pm.doc).to.deep.equal(doc(ul(li(p('> ')))));
    });
  });

});
