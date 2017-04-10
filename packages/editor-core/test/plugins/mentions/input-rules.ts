import * as chai from 'chai';
import { expect } from 'chai';
import MentionsPlugin from '../../../src/plugins/mentions';
import {
  chaiPlugin,
  fixtures,
  insertText,
  makeEditor,
  doc,
  p,
} from '../../../src/test-helper';
import { resourceProvider } from '../../../stories/mentions/story-data';

chai.use(chaiPlugin);

describe('mentions - input rules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: MentionsPlugin,
    place: fixture()
  });

  const assert = (what: string, expected: boolean) => {
    const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
    return pluginState
      .setMentionProvider(Promise.resolve(resourceProvider))
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

  it('should replace "@" if there are multiple spaces infront of it', () => {
    assert('  @', true);
  });
});
