import * as chai from 'chai';
import { expect } from 'chai';
import HyperlinkPlugin from '../../../src/plugins/hyperlink';
import { insertText, chaiPlugin, fixtures, makeEditor, doc, a as link, linkable } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: HyperlinkPlugin,
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

    it('should not convert "javascript://alert(1) " to hyperlink', () => {
      const { editorView, sel } = editor(doc(linkable('{<>}')));
      insertText(editorView, 'javascript://alert(1);', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(linkable('javascript://alert(1);')));
    });
  });
});
