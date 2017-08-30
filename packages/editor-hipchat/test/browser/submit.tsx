import * as chai from 'chai';
import { expect } from 'chai';

import {
  sendKeyToPm,
  chaiPlugin,
  doc,
  p,
  makeEditor,
  code_block,
  blockquote
} from '@atlaskit/editor-core/dist/es5/test-helper';

import {
  hipchatSchema as schema,
  codeBlockPlugins,
  blockTypePlugins
} from '@atlaskit/editor-core';

chai.use(chaiPlugin);

describe('@atlaskit/hipchat', () => {
  describe('Enter keypress', () => {
    context('when cursor is inside codeBlock', () => {
      const editor = (doc: any) => makeEditor({
        doc,
        plugins: codeBlockPlugins(schema)
      });

      context('when enter key is pressed 2 times', () => {
        it('it should not exit code block', () => {
          const { editorView } = editor(doc(code_block()('codeBlock{<>}')));

          sendKeyToPm(editorView, 'Enter');
          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(code_block()('codeBlock\n\n')));
        });
      });

      context('when enter key is pressed 3 times', () => {
        it('it should exit code block', () => {
          const { editorView } = editor(doc(code_block()('codeBlock{<>}')));

          sendKeyToPm(editorView, 'Enter');
          sendKeyToPm(editorView, 'Enter');
          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(code_block()('codeBlock'), p('{<>}')));
        });
      });
    });

    context('when cursor is inside blockquote', () => {
      const editor = (doc: any) => makeEditor({
        doc,
        plugins: blockTypePlugins(schema)
      });

      context('when enter key is pressed 1 time', () => {
        it('it should not exit blockquote', () => {
          const { editorView } = editor(doc(blockquote(p('text{<>}'))));

          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'), p(''))));
        });
      });

      context('when enter key is pressed 2 times', () => {
        it('it should exit blockquote', () => {
          const { editorView } = editor(doc(blockquote(p('text{<>}'))));

          sendKeyToPm(editorView, 'Enter');
          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text')), p('{<>}')));
        });
      });
    });
  });
});
