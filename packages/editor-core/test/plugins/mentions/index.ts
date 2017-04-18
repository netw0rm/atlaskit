import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mention as mentionNode } from '../../../src';
import mentionsPlugins from '../../../src/plugins/mentions';
import {
  chaiPlugin,
  fixtures,
  makeEditor,
  sendKeyToPm,
  blockquote,
  br,
  doc,
  mention,
  mentionQuery,
  li,
  p,
  ul,
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { resourceProvider } from '../../../stories/mentions/story-data';

const mentionProvider = new Promise<any>(resolve => {
  resolve(resourceProvider);
});

chai.use(chaiPlugin);

describe('mentions', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: mentionsPlugins(defaultSchema),
    place: fixture()
  });

  const forceUpdate = (editorView: any) => {
    editorView.updateState(editorView.state);
  };

  describe('keymap', () => {

    describe('ArrowUp', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called).to.equal(false);
          });
      });

      it('should call "onSelectPrevious" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
          });
      });
    });

    describe('ArrowDown', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called).to.equal(false);
          });
      });

      it('should call "onSelectNext" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
          });
      });
    });

    describe('Enter', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Enter');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called).to.equal(false);
          });
      });

      it('should call "onSelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
          });
      });
    });

    describe('Space', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Space');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called).to.equal(false);
          });
      });

      it('should call "onTrySelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@kai{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
          });
      });
    });

    describe('Escape', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@o{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Esc');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'dismiss');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Esc');
            expect(spy.called).to.equal(false);
          });
      });

      it('should call "dismiss" which should return true by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery('@kai{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(editorView); // Force update to ensure active query.
            sendKeyToPm(editorView, 'Esc');
            expect(spy.called).to.equal(true);
            expect(spy.returned(true)).to.equal(true);
          });
      });
    });

  });

  describe('insertMention', () => {

    it('should replace mention-query-mark with mention-node', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery('@os'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc.nodeAt(1)).to.be.of.nodeSpec(mentionNode);
    });

    it('should insert a space after the mention-node', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery('@os{<>}'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' '
          )
        )
      );
    });

    it('should render the mention-node using a nickname if present', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery('@ta'))));

      pluginState.insertMention({
        name: 'Tara Tjandra',
        mentionName: 'ttjandra',
        nickname: 'tara',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@tara',
              id: '1234'
            }),
            ' '
          )
        )
      );
    });

    it('should allow inserting multiple @-mentions next to eachother', () => {
      const { editorView, pluginState } = editor(doc(p(mention({ id: '1234', text: '@Oscar Wallhult' }), ' ', mentionQuery('@{<>}'))));

      pluginState.insertMention({
        name: 'Bradley Ayers',
        mentionName: 'brad',
        id: '5678'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' ',
            mention({
              text: '@Bradley Ayers',
              id: '5678'
            }),
            ' '
          )
        )
      );

    });

    it('should allow inserting @-mention on new line after hard break', () => {
      const { editorView, pluginState } = editor(doc(p(br, mentionQuery('@{<>}'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            br,
            mention({
              id: '1234',
              text: '@Oscar Wallhult'
            }),
            ' '
          )
        )
      );
    });

    it('should not break list into two when inserting mention inside list item', () => {
      const { editorView, pluginState } = editor(doc(p(ul(li(p('One')), li(p('Two ', mentionQuery('@{<>}'))), li(p('Three'))))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            ul(
              li(p('One')),
              li(
                p(
                  'Two ',
                  mention({
                    id: '1234',
                    text: '@Oscar Wallhult'
                  }),
                  ' '
                )
              ),
              li(p('Three'))
            )
          )
        )
      );
    });

    it('should insert only 1 mention at a time inside blockqoute', () => {
      const { editorView, pluginState } = editor(doc(blockquote(p('Hello ', mentionQuery('@{<>}')))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          blockquote(
            p(
              'Hello ',
              mention({
                id: '1234',
                text: '@Oscar Wallhult'
              }),
              ' '
            )
          )
        )
      );

      expect(editorView.state.doc.nodeAt(8)).to.be.of.nodeSpec(mentionNode);
      expect(editorView.state.doc.nodeAt(10)).to.equal(null);
    });
  });
});
