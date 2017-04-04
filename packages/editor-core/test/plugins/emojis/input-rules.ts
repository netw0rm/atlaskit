// import * as chai from 'chai';
// import { expect } from 'chai';
// import EmojiPlugin from '../../../src/plugins/emojis';
// import {
//   chaiPlugin,
//   fixtures,
//   insertText,
//   makeEditor,
//   doc,
//   p,
// } from '../../../src/test-helper';
// import { emoji as emojiData } from '@atlaskit/util-data-test';

// const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();

// chai.use(chaiPlugin);

// describe('emojis - input rules', () => {
//   const fixture = fixtures();
//   const editor = (doc: any) => makeEditor({
//     doc,
//     plugin: EmojiPlugin,
//     place: fixture()
//   });

//   const assert = (what: string, expected: boolean) => {
//     const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
//     return pluginState
//       .setEmojiProvider(emojiProvider)
//       .then(() => {
//         insertText(editorView, what, sel);

//         const { state } = editorView;
//         const { emojiQuery } = state.schema.marks;
//         const cursorFocus = state.selection.$to.nodeBefore!;

//         if (expected) {
//           expect(emojiQuery.isInSet(cursorFocus.marks)).to.not.equal(undefined);
//         } else {
//           expect(emojiQuery.isInSet(cursorFocus.marks)).to.equal(undefined);
//         }
//       });
//   };

//   it('should replace a standalone ":" with emoji-query-mark', () => {
//     assert('foo :', true);
//   });

//   it('should not replace a ":" thats part of a word', () => {
//     assert('foo:', false);
//   });

//   it('should not replace a ":" after the "`"', () => {
//     assert('`:', false);
//   });

//   it('should replace ":" at the start of the content', () => {
//     assert(':', true);
//   });

//   it('should replace ":" if there are multiple spaces infront of it', () => {
//     assert('  :', true);
//   });
// });
