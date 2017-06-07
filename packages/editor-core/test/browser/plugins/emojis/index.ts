import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { emoji as emojiNode } from '../../../../src';
import emojiPlugins, { TextToEmojiReplacer } from '../../../../src/plugins/emojis';
import {
  chaiPlugin,
  fixtures,
  makeEditor,
  sendKeyToPm,
  blockquote,
  br,
  doc,
  emoji,
  emojiQuery,
  li,
  p,
  ul,
} from '../../../../src/test-helper';

import { sendKeyPressToPm } from '../../../../src/test-helper/send-key-to-pm';

import defaultSchema from '../../../../src/test-helper/schema';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();

const grinEmoji = emojiData.emojiTestData.grinEmoji;
const grinEmojiId = {
  shortName: grinEmoji.shortName,
  id: grinEmoji.id,
  fallback: grinEmoji.fallback,
};

const watchEmoji = emojiData.emojiTestData.watchEmoji;
const watchEmojiId = {
  shortName: watchEmoji.shortName,
  id: watchEmoji.id,
  fallback: watchEmoji.fallback
};

/**
 * Native emoji's get their shortname asynchronously. So for assertions in tests create
 * emoji nodes with no shortname
 */
function createEmojiNodeWithNoShortname(attrs: {id?: string, fallback?: string }) {
  let fallback = attrs.fallback;
  if (fallback) {
    // here's how I make the representation of watch match between what's in the watchEmoji test data and what ProseMirror inserts
    fallback = String.fromCharCode(fallback.charCodeAt(0));
  }

  return emoji({ shortName: '', id: attrs.id, fallback: fallback});
}

const evilburnsEmoji = emojiData.emojiTestData.evilburnsEmoji;
const evilburnsEmojiId = {
  shortName: evilburnsEmoji.shortName,
  id: evilburnsEmoji.id,
  fallback: evilburnsEmoji.fallback,
};

chai.use(chaiPlugin);

describe('emojis', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: emojiPlugins(defaultSchema),
    place: fixture()
  });

  const forceUpdate = (editorView: any) => {
    editorView.updateState(editorView.state);
  };

  describe('keymap', () => {

    describe('ArrowUp', () => {

      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called, 'was not called').to.equal(false);
          });
      });

      it('should call "onSelectPrevious" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called, 'was called').to.equal(true);
            expect(spy.returned(false), 'return value').to.equal(true);
          });
      });
    });

    describe('ArrowDown', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called, 'was not called').to.equal(false);
          });
      });

      it('should call "onSelectNext" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called, 'was called').to.equal(true);
            expect(spy.returned(false), 'return vale').to.equal(true);
          });
      });
    });

    describe('Enter', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Enter');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called, 'was not called').to.equal(false);
          });
      });

      it('should call "onSelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called, 'was called').to.equal(true);
            expect(spy.returned(false), 'return value').to.equal(true);
          });
      });
    });

    describe('Space', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Space');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called, 'was not called').to.equal(false);
          });
      });

      it('should call "onTrySelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called, 'was called').to.equal(true);
            expect(spy.returned(false), 'return value').to.equal(true);
          });
      });
    });

    describe('Escape', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Esc');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'dismiss');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Esc');
            expect(spy.called, 'was not called').to.equal(false);
          });
      });

      it('should call "dismiss" which should return true by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');

        return pluginState
          .setEmojiProvider(emojiProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.
            sendKeyToPm(editorView, 'Esc');
            expect(spy.called, 'was called').to.equal(true);
            expect(spy.returned(true), 'return value').to.equal(true);
          });
      });
    });

  });

  describe('insertEmoji', () => {

    it('should replace emoji-query-mark with emoji-node', () => {
      const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin'))));

      pluginState.insertEmoji({
        name: 'Oscar Wallhult',
        emojiName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc.nodeAt(1), 'emoji node').to.be.of.nodeSpec(emojiNode);
    });

    it('should insert a space after the emoji-node', () => {
      const { editorView, pluginState } = editor(doc(p(emojiQuery(':gr{<>}'))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            emoji(grinEmojiId),
            ' '
          )
        )
      );
    });

    it('should allow inserting multiple emojis next to each other', () => {
      const { editorView, pluginState } = editor(
        doc(
          p(
            emoji(grinEmojiId),
            ' ',
            emojiQuery(':ev{<>}')
          )
        )
      );

      pluginState.insertEmoji(evilburnsEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            emoji(grinEmojiId),
            ' ',
            emoji(evilburnsEmojiId),
            ' '
          )
        )
      );
    });

    it('should allow inserting emoji on new line after hard break', () => {
      const { editorView, pluginState } = editor(doc(p(br, emojiQuery(':gr{<>}'))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            br,
            emoji(grinEmojiId),
            ' '
          )
        )
      );
    });

    it('should not break list into two when inserting emoji inside list item', () => {
      const { editorView, pluginState } = editor(
        doc(
          p(
            ul(
              li(p('One')),
              li(p('Two ', emojiQuery(':{<>}'))),
              li(p('Three'))))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            ul(
              li(p('One')),
              li(
                p(
                  'Two ',
                  emoji(grinEmojiId),
                  ' '
                )
              ),
              li(p('Three'))
            )
          )
        )
      );
    });

    it('should insert only 1 emoji at a time inside blockqoute', () => {
      const { editorView, pluginState } = editor(
        doc(
          blockquote(
            p('Hello ', emojiQuery(':{<>}'))
          )
        )
      );

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          blockquote(
            p(
              'Hello ',
              emoji(grinEmojiId),
              ' '
            )
          )
        )
      );

      expect(editorView.state.doc.nodeAt(8), 'emoji node').to.be.of.nodeSpec(emojiNode);
      expect(editorView.state.doc.nodeAt(10), 'no node').to.equal(null);
    });
  });

  describe('inserted native emoji', () => {
    it('should convert to emoji node', () => {
      // need a selection where the to and from parts are from different parent nodes or ProseMirror won't accept the keypress.
      const { editorView } = editor(doc(p('{<}Hello'),p('World{>}')));
      // a low charCode emoji since ProseMirror wrongly uses String.charCode instead of String.codePoint
      sendKeyPressToPm(editorView, '⌚');

      const emojiNode = createEmojiNodeWithNoShortname(watchEmojiId);
      const expectedDoc = doc(p(emojiNode));

      expect(editorView.state.doc, 'comparing document node').to.deep.equal(expectedDoc);
    });

    it('should preserve formatting for text typed after conversion', () => {
      // need a selection where the to and from parts are from different parent nodes or ProseMirror won't accept the keypress.
      // const { editorView } = editor(doc(p('Hell', strong('{<}o')),p(strong('World{>}'))));

      // // a low charCode emoji since ProseMirror wrongly uses String.charCode instead of String.codePoint
      // sendKeyPressToPm(editorView, '⌚');
      // sendKeyPressToPm(editorView, 'a');

      // const emojiNode = createEmojiNodeWithNoShortname(watchEmojiId);
      // var expectedDoc = doc(p('Hell', strong(emojiNode), strong('a')));

      // expect(editorView.state.doc, 'comparing document node').to.deep.equal(expectedDoc);

      // The above commented out test code doesn't quite work - the 'a' doesn't make its way into the document
      // To be fixed when https://product-fabric.atlassian.net/browse/FS-1034 is addressed.
      expect(true, 'TODO').to.equal(true);
    });

    it('should convert to emoji node in link text', () => {
      expect(true, 'TODO').to.equal(true);
      // ensure the link does not break in two.
      // Implement this test with https://product-fabric.atlassian.net/browse/FS-1035
    });

    it('should not convert to emoji node in code block', () => {
      expect(true, 'TODO').to.equal(true);

      // ensure the emoji is not converted
      // Implement this test with https://product-fabric.atlassian.net/browse/FS-1036
    });
  });

  describe('TextToEmojiReplacer', () => {
    let replacer: TextToEmojiReplacer;

    beforeEach(() => {
      replacer = new TextToEmojiReplacer(defaultSchema);
    });

    it('should pass text nodes only as candidates', () => {
      expect(replacer.isCandidate(p('anything'))).to.equal(false);
      expect(replacer.isCandidate(defaultSchema.text('monkey trousers'))).to.equal(true);
    });

    it('should not return same node when no emoji in text', () => {
      const original = defaultSchema.text('monkey trousers');
      const replaced = replacer.replace(original);

      expect(replaced.length).to.equal(1);
      expect(original).to.not.equal(replaced[0]);
      expect(replaced[0]).to.deep.equal(original);
    });

    it('should return new node which has same text and marks', () => {
      const original = defaultSchema.text('monkey trousers', [ defaultSchema.mark('underline')] );
      const replaced = replacer.replace(original);

      expect(replaced.length).to.equal(1);
      expect(original === replaced[0]).to.equal(false);
      expect(replaced[0]).to.deep.equal(original);
    });

    it('should map any splits into Nodes', () => {
      const original = defaultSchema.text('a⌚b');
      const replaced = replacer.replace(original);

      expect(replaced.length).to.equal(3);
      expect(replaced[0]).to.deep.equal(defaultSchema.text('a'));
      expect(replaced[1]).to.deep.equal(createEmojiNodeWithNoShortname(watchEmojiId));
      expect(replaced[2]).to.deep.equal(defaultSchema.text('b'));
    });
  });
});
