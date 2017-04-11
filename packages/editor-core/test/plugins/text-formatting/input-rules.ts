import * as chai from 'chai';
import { expect } from 'chai';

import TextFormattingPlugin from '../../../src/plugins/text-formatting';
import {
  fixtures, mention, em, strike, code, strong, insertText, chaiPlugin, doc, makeEditor, p, code_block
} from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('text-formatting input rules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: TextFormattingPlugin,
    place: fixture()
  });

  describe('strong rule', () => {
    it('should convert "**text**" to strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(strong('text'))));
    });

    it('should not convert "**text**" to strong inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '**text**', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('**text**')));
    });
  });

  describe('em rule', () => {
    it('should convert "*text*" to em', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '*text*', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(em('text'))));
    });

    it('should limit mark to surrounded text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '*italic*', sel);
      insertText(editorView, 'm', editorView.state.selection.$from.pos);
      expect(editorView.state.doc).to.deep.equal(doc(p(em('italic'), 'm')));
    });

    it('should keep current marks when converting from markdown', () => {
      const { editorView, sel } = editor(doc(p(strong('This is bold {<>}'))));

      insertText(editorView, '*italic*', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(strong('This is bold '), em(strong('italic')))));
    });

    it('should not convert "*text*" to em inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '*text*', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('*text*')));
    });
  });

  describe('stike rule', () => {
    it('should convert "~~text~~" to strike', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~text~~', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(strike('text'))));
    });

    it('should not convert "~~text~~" to strike inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '~~text~~', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('~~text~~')));
    });
  });

  describe('code rule', () => {
    it('should convert "`text`" to code text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '`text`', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(code('text'))));
    });

    it('should convert mention to plaint text', () => {
      const mentionNode = mention({ id: '1234', displayName: '@helga' });
      const { editorView, sel } = editor(
        doc(p(
          'hey! `hello, ',
          mentionNode,
          ' there{<>}?'
        )));
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('hey! ', code('hello, @helga there'), '?')));
    });

    it('should cleanup other formatting', () => {
      const mentionNode = mention({ id: '1234', displayName: '@helga' });
      const { editorView, sel } = editor(
        doc(p(
          '`',
          strong('hello '),
          mentionNode,
          em(', '),
          strike('there?{<>}')
        )));
      insertText(editorView, '`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(code('hello @helga, there?'))));
    });

    it('should not convert "`text`" to code text inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '`text`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('`text`')));
    });
  });

  describe('nested rules', () => {
    it('should convert "*`text`*" to italic code text', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '*`text`', sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('*', code('text'))));

      insertText(editorView, '*', editorView.state.selection.from);
      expect(editorView.state.doc).to.deep.equal(doc(p(em(code('text')))));
    });

    it('should convert "~~**text**~~" to strike strong', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '~~**text**', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('~~', strong('text'))));
      insertText(editorView, '~~', editorView.state.selection.from);
      expect(editorView.state.doc).to.deep.equal(doc(p(strike(strong('text')))));
    });
  });
});
