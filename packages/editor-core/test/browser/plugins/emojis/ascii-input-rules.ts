import * as chai from 'chai';
import { expect } from 'chai';
import asciiEmojiPlugins from '../../../../src/plugins/emojis/ascii-input-rules';
import {
  chaiPlugin,
  fixtures,
  insertText,
  makeEditor,
  doc,
  p,
  text,
  code,
  code_block,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { emoji as emojiData } from '@atlaskit/util-data-test';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();
const plugins = asciiEmojiPlugins(defaultSchema, emojiProvider);

chai.use(chaiPlugin);

describe.only('ascii emojis - input rules', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: plugins,
    place: fixture()
  });

  const assert = (what: string, docContents: any, expectation: (state) => void) => {
    return emojiProvider.then(() => {
      const { editorView, sel } = editor(doc(docContents));
      insertText(editorView, what, sel);

      const { state } = editorView;
      expectation(state);
    });
  };

  context('when an emoticon is preceded by a whitespace character', () => {
    context('and starting with a colon character', () => {
      it('should replace a matching emoticon when followed by a space', () => {
        return assert('text :) ', p('{<>}'), (state) => {
          const emoji = emojiNode({
            id: '1f642',
            shortName: ':slight_smile:',
            text: '🙂'
          });
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), emoji, textNode(' ')));
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert('text :)', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p('text :)'));
        });
      });
    });

    context('and not starting with a colon character', () => {
      it('should replace a matching emoticon', () => {
        return assert('text 8)', p('{<>}'), (state) => {
          const emoji = emojiNode({
            id: '1f60e',
            shortName: ':sunglasses:',
            text: '😎'
          });
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), emoji));
        });
      });

      it('should replace a matching emoticon even when containing a colon', () => {
        return assert(`text ':D`, p('{<>}'), (state) => {
          const emoji = emojiNode({
            id: '1f605',
            shortName: ':sweat_smile:',
            text: '😅'
          });
          expect(state.doc.content.child(0)).to.deep.equal(p(textNode('text '), emoji));
        });
      });
    });

    context('in unsupported content', () => {
      it('should not replace a matching emoticon in an unsupported node', () => {
        return assert('text :) ', code_block()('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(code_block()('text :) '));
        });
      });

      it('should not replace an emoticon in an unsupported mark', () => {
        return assert(' :) ', p(code('code{<>}')), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(code('code :) ')));
        });
      });
    });
  });

  context('when starting at the beginning of a line',() =>  {
    context('and starting with a colon character', () => {
      it('should replace a matching emoticon if followed by a space', () => {
        return assert(':) ', p('{<>}'), (state) => {
          const emoji = emojiNode({
            id: '1f642',
            shortName: ':slight_smile:',
            text: '🙂'
          });
          expect(state.doc.content.child(0)).to.deep.equal(p(emoji, textNode(' ')));
        });
      });

      it('should not replace a matching emoticon if not followed by a space', () => {
        return assert(':)', p('{<>}'), (state) => {
          expect(state.doc.content.child(0)).to.deep.equal(p(':)'));
        });
      });
    });
  });

  context('when preceded by non-whitespace character', () => {
    it('should not replace a matching emoticon starting with a colon', () => {
      return assert('text:) ', p('{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p('text:) '));
      });
    });

    it('should not replace a matching emoticon not starting with a colon', () => {
      return assert('text8)', p('{<>}'), (state) => {
        expect(state.doc.content.child(0)).to.deep.equal(p('text8)'));
      });
    });
  });

  function emojiNode(attrs: {}) {
    return defaultSchema.nodes.emoji.create(attrs);
  }

  function textNode(value: string) {
    return text(value, defaultSchema);
  }
});
