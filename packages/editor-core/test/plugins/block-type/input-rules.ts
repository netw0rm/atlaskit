import * as chai from 'chai';
import { expect } from 'chai';
import BlockTypePlugin from '../../../src/plugins/block-type';
import {
  blockquote, chaiPlugin, doc, fixtures, h1, h2, h3, insertText, li, makeEditor, p, ul
} from '../../../src/test-helper';
chai.use(chaiPlugin);

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

      insertText(editorView, '# ', sel);

      expect(editorView.state.doc).to.deep.equal(doc(h1()));
    });

    it('should convert "## " to heading 2', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h2()));
    });

    it('should convert "### " to heading 3', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h3()));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('> ')))));
    });
  });

});
