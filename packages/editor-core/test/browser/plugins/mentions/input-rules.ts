import * as chai from 'chai';
import { expect } from 'chai';
import mentionsPlugins from '../../../../src/plugins/mentions';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  fixtures,
  insertText,
  makeEditor,
  doc,
  p,
  code_block,
  code,
} from '../../../../src/test-helper';
import { mention as mentionData } from '@atlaskit/util-data-test';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('mentions - input rules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: mentionsPlugins(defaultSchema, new ProviderFactory()),
    place: fixture()
  });

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel } = editor(doc(docContents || p('{<>}')));
    return pluginState
      .setMentionProvider(Promise.resolve(mentionData.mentionStoryData.resourceProvider))
      .then(() => {
        insertText(editorView, what, sel);

        const { state } = editorView;
        const { mentionQuery } = state.schema.marks;
        const cursorFocus = state.selection.$to.nodeBefore!;

        if (expected) {
          expect(mentionQuery.isInSet(cursorFocus.marks)).to.not.equal(undefined);
        } else {
          expect(mentionQuery.isInSet(cursorFocus.marks)).to.equal(undefined);
        }
      });
  };

  it('should replace a standalone "@" with mention-query-mark', () => {
    assert('foo @', true);
  });

  it('should not replace a "@" thats part of a word', () => {
    assert('foo@', false);
  });

  it('should not replace a "@" after the "`"', () => {
    assert('`@', false);
  });

  it('should replace "@" at the start of the content', () => {
    assert('@', true);
  });

  it('should replace "@" if there are multiple spaces in front of it', () => {
    assert('  @', true);
  });

  it('should not replace "@" when in an unsupported node', () => {
    assert('@', false, code_block()('{<>}'));
  });

  it('should not replace "@" when there is an unsupported stored mark', () => {
    assert('@', false, p(code('{<>}')));
  });

  it('should replace non empty selection with mentionQuery mark', () => {
    assert('@', true, p('{<text>}'));
  });

  it('should not replace non empty selection with mentionQuery mark if selection starts with an excluding mark', () => {
    assert('@', false, p(code('{<text>}')));
  });
});
