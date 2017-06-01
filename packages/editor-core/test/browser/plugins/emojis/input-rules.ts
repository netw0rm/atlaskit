import * as chai from 'chai';
import { expect } from 'chai';
import emojiPlugins from '../../../../src/plugins/emojis';
import {
  chaiPlugin,
  fixtures,
  insertText,
  makeEditor,
  doc,
  p,
  code,
  code_block,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { emoji as emojiData } from '@atlaskit/util-data-test';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();

chai.use(chaiPlugin);

describe('emojis - input rules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: emojiPlugins(defaultSchema),
    place: fixture()
  });

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel } = editor(doc(docContents || p('{<>}')));
    return pluginState
      .setEmojiProvider(emojiProvider)
      .then(() => {
        insertText(editorView, what, sel);

        const { state } = editorView;
        const { emojiQuery } = state.schema.marks;
        const cursorFocus = state.selection.$to.nodeBefore!;

        if (expected) {
          expect(emojiQuery.isInSet(cursorFocus.marks)).to.not.equal(undefined);
        } else {
          expect(emojiQuery.isInSet(cursorFocus.marks)).to.equal(undefined);
        }
      });
  };

  it('should replace a standalone ":" with emoji-query-mark', () => {
    assert('foo :', true);
  });

  it('should not replace a ":" thats part of a word', () => {
    assert('foo:', false);
  });

  it('should not replace a ":" after the "`"', () => {
    assert('`:', false);
  });

  it('should replace ":" at the start of the content', () => {
    assert(':', true);
  });

  it('should replace ":" if there are multiple spaces in front of it', () => {
    assert('  :', true);
  });

  it('should not replace ":" when in an unsupported node', () => {
    assert(':', false, code_block()('{<>}'));
  });

  it('should not replace ": when there is an unsupported stored mark', () => {
    assert(':', false, p(code('{<>}')));
  });
});
