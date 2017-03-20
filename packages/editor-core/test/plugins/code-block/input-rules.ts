import * as chai from 'chai';
import { expect } from 'chai';
import CodeBlockPlugin from '../../../src/plugins/code-block';

import {
  br, chaiPlugin, code_block, doc, fixtures, insertText, li, makeEditor, p, ul
} from '../../../src/test-helper';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: CodeBlockPlugin,
    place: fixture()
  });

  describe('codeblock rule', () => {
    context('when node is not convertable to code block', () => {
      it('should not convert "```" to a code block\t', () => {
        const { editorView, sel } = editor(doc(ul(li(p('{<>}hello')))));

        insertText(editorView, '```', sel);

        expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('```hello')))));
      });
    });

    context('when node is convertable to code block', () => {
      context('when converted node has content', () => {
        it('should convert "```" to a code block', () => {
          const { editorView, sel } = editor(doc(p('{<>}hello', br, 'world')));

          insertText(editorView, '```', sel);

          expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello\nworld')));
        });
      });

      context('when converted node has no content', () => {
        it('should not convert "```" to a code block\t', () => {
          const { editorView, sel } = editor(doc(p('{<>}')));

          insertText(editorView, '```', sel);

          expect(editorView.state.doc).to.deep.equal(doc(p('```')));
        });
      });

    });

  });

});
