import * as chai from 'chai';
import { expect } from 'chai';
import ListsInputRulesPlugin from '../../../src/plugins/lists/input-rule';
import {
  insertText,
  blockquote, chaiPlugin, code_block, doc, h1,
  li, makeEditor, ol, p, ul
} from '../../../src/test-helper';
import schema from '../../../src/test-helper/schema';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor({ doc, schema, plugin: ListsInputRulesPlugin(schema) });

  describe('bullet list rule', () => {
    it('should convert "* " to a bullet list item', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p()))));
    });

    it('should not convert "** " to a nested bullet list item', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '** ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('** ')));
    });

    it('should not convert "* " to a bullet list item when already inside a list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('* ')))));
    });

    it('should convert "* " to a bullet list item when not inside first paragraph of a list', () => {
      const { editorView, sel } = editor(doc(ul(li(p(), p('{<>}')))));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p(), ul(li(p()))))));
    });

    it('should convert "* " to a bullet list item when inside a blockquote', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(ul(li(p())))));
    });

    it('should not convert "* " to a bullet list item when inside a codeblock', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('* ')));
    });

    it('should not convert "* " to a bullet list item when inside a heading', () => {
      const { editorView, sel } = editor(doc(h1('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h1('* ')));
    });
  });

  describe('ordered list rule', () => {
    it('should convert "[number]. " to a ordered list item', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should always begin a new list on 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '3. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should convert "[number]. " to a ordered list item when inside a blockquote', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(ol(li(p())))));
    });

    it('should not convert "[number]. " to a ordered list item when inside a codeblock', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('1. ')));
    });
  });
});
