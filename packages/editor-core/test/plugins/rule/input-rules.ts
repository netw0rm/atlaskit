import * as chai from 'chai';
import { expect } from 'chai';
import RulePlugin from '../../../src/plugins/rule';
import {
  chaiPlugin, doc, fixtures, hr, insertText, makeEditor, p
} from '../../../src/test-helper';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: RulePlugin,
    place: fixture()
  });

  describe('rule', () => {
    it('should not convert "***" in the middle of a line to a horizontal rule', () => {
      const { editorView, sel } = editor(doc(p('test{<>}')));

      insertText(editorView, 'text***', sel);

      expect(editorView.state.doc).to.not.equal(doc(p(), hr, p()));
    });

    it('should convert "---" at the start of a line to horizontal rule', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '---', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(), hr, p()));
    });

    it('should not convert "---" in the middle of a line to a horizontal rule', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, 'text---', sel);

      expect(editorView.state.doc).to.not.equal(doc(p('text'), hr, p()));
    });
  });


});
