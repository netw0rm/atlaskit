import * as chai from 'chai';
import { expect } from 'chai';
import { EditorView } from '../../../src';
import BlockTypePlugin from '../../../src/plugins/block-type';
import {
  blockquote, chaiPlugin, doc, fixtures, h1, h2, h3, li, makeEditor, p, ul
} from '../../../src/test-helper';
chai.use(chaiPlugin);

const insertText = (editorView: EditorView, text: string, from?: number, to?: number): void => {
  const transaction = editorView.state.tr.insertText(text, from, to);
  editorView.dispatch(transaction);
};

describe('inputrules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: BlockTypePlugin,
    place: fixture()
  });

  describe('heading rule', () => {
    it('should convert "# " to heading 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '# ', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(h1()));
    });

    it('should convert "## " to heading 2', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '## ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(h2()));
    });

    it('should convert "### " to heading 3', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '### ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(h3()));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '> ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '> ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '> ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('> ')))));
    });
  });

});
