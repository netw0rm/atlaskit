import * as chai from 'chai';
import { expect } from 'chai';
import emojiPlugins, { EmojiState } from '../../../../src/plugins/emojis';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  fixtures,
  insertText,
  makeEditor,
  doc,
  p,
  code,
  hardBreak,
  emoji,
  mention,
  code_block,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { EditorState } from '../../../../src/prosemirror';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();

chai.use(chaiPlugin);

describe('emojis - input rules', () => {
  const providerFactory = new ProviderFactory();
  const fixture = fixtures();
  const editor = (doc: any) => {
    const ed = makeEditor<EmojiState>({
      doc,
      plugins: emojiPlugins(defaultSchema, providerFactory),
      place: fixture()
    });

    afterEach(() => {
      ed.editorView.destroy();
    });

    return ed;
  };

  providerFactory.setProvider('emojiProvider', emojiProvider);

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel, refs } = editor(doc(docContents || p('{<>}')));

    return new Promise(resolve => {
      const providerChangeHandler = () => {
        insertText(editorView, what, sel || refs['<']);
        pluginState.unsubscribeFromProviderUpdates(providerChangeHandler);
        resolve(editorView.state);
      };

      pluginState.subscribeToProviderUpdates(providerChangeHandler);
    }).then((state: EditorState<any>) => {
      const { emojiQuery } = state.schema.marks;
      const cursorFocus = state.selection.$to.nodeBefore!;
      expect(!!emojiQuery.isInSet(cursorFocus.marks)).to.equal(expected);
    });
  };

  it('should replace a standalone ":" with emoji-query-mark', () => {
    return assert('foo :', true);
  });

  it('should not replace a ":" when part of a word', () => {
    return assert('foo:', false);
  });

  it('should not replace a ":" after the "`"', () => {
    return assert('`:', false);
  });

  it('should replace ":" at the start of the content', () => {
    return assert(':', true);
  });

  it('should replace ":" if there are multiple spaces in front of it', () => {
    return assert('  :', true);
  });

  it('should replace ":" if there is a hardbreak node in front of it', () => {
    return assert(':', true, p(hardBreak(), '{<>}'));
  });

  it('should replace ":" if there is another emoji node in front of it', () => {
    return assert(':', true, p(emoji({ shortName: ':smiley:'}), '{<>}'));
  });

  it('should replace ":" if there is a mention node in front of it', () => {
    return assert(':', true, p(mention({ id: '1234', text: '@SpongeBob' }), '{<>}'));
  });

  it('should not replace ":" when in an unsupported node', () => {
    return assert(':', false, code_block()('{<>}'));
  });

  it('should not replace ":" when there is an unsupported stored mark', () => {
    return assert(':', false, p(code('var {<>}')));
  });

  it('should replace non empty selection with emojiQuery mark', () => {
    return assert(':', true, p('{<}text{>}'));
  });

  it('should not replace non empty selection with emojiQuery mark if selection starts with an excluding mark', () => {
    return assert(':', false, p(code('{<}var{>}')));
  });

  it('should replace selection in supported node', () => {
    return assert(':', true, p('{<}text{>}'));
  });

  it('should not replace a ":" preceded by a special character', () => {
    return assert('>:', false);
  });
});
