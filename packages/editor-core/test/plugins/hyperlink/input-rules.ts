import * as chai from 'chai';
import { expect } from 'chai';
import HyperlinkPlugin from '../../../src/plugins/hyperlink';
import {
  insertText, chaiPlugin, fixtures, makeEditor, doc, a as link, linkable, code_block
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: HyperlinkPlugin(defaultSchema),
    place: fixture(),
  });

  describe('input rules', () => {
    it('should convert "www.atlassian.com" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'www.atlassian.com', sel, sel);

      const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'www.atlassian.com/', sel, sel);

      const a = link({ href: 'http://www.atlassian.com/' })('www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "http://www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'http://www.atlassian.com/', sel, sel);

      const a = link({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "http://www.atlassian.com" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'http://www.atlassian.com', sel, sel);

      const a = link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "https://www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'https://www.atlassian.com/', sel, sel);

      const a = link({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should convert "https://www.atlassian.com" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'https://www.atlassian.com', sel, sel);

      const a = link({ href: 'https://www.atlassian.com' })('https://www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(linkable(a)));
    });

    it('should not convert "https://www.atlassian.com" to hyperlink inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, 'https://www.atlassian.com', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('https://www.atlassian.com')));
    });

    it('should not convert "javascript://alert(1) " to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'javascript://alert(1);', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(linkable('javascript://alert(1);')));
    });

    it('should convert "[text](http://foo)" to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, '[text](http://foo)', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: 'http://foo' })('text'))));
    });

    it('should convert "[text](http://foo)" to hyperlink inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, '[text](http://foo)', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('[text](http://foo)')));
    });
  });
});
