// import * as chai from 'chai';
// import { expect } from 'chai';
// import {
//   MentionNodeType, MentionQueryMarkType, MentionsPlugin,
//   ProseMirror, Schema, schema as schemaBasic
// } from '../../../src';
// import { chaiPlugin } from '../../../src/test-helper';

// chai.use(chaiPlugin);

// describe('mentions - input rules', () => {
//   const schema: Schema = new Schema({
//     nodes: schemaBasic.nodeSpec.append({
//       mention: { type: MentionNodeType, group: 'inline' }
//     }),
//     marks: {
//       mention_query: MentionQueryMarkType
//     }
//   });

//   const makeEditor = () => new ProseMirror({
//     schema: schema,
//     plugins: [MentionsPlugin],
//   });

//   it('should replace a standalone "@" with mention-query-mark', () => {
//     const pm = makeEditor();
//     pm.input.insertText(0, 0, 'foo @');

//     const cursorFocus = pm.selection.$to;
//     expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
//   });

//   it('should not replace a "@" thats part of a word', () => {
//     const pm = makeEditor();
//     pm.input.insertText(0, 0, 'foo@');

//     const cursorFocus = pm.selection.$to;
//     expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.equal(undefined);
//   });

//   it('should not replace a "@" after the "`"', () => {
//     const pm = makeEditor();
//     pm.input.insertText(0, 0, '`@');

//     const cursorFocus = pm.selection.$to;
//     expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.equal(undefined);
//   });

//   it('should replace "@" at the start of the content', () => {
//     const pm = makeEditor();
//     pm.input.insertText(0, 0, '@');

//     const cursorFocus = pm.selection.$to;
//     expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
//   });

//   it('should replace "@" if there are multiple spaces infront of it', () => {
//     const pm = makeEditor();
//     pm.input.insertText(0, 0, '  @');

//     const cursorFocus = pm.selection.$to;
//     expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
//   });
// });
