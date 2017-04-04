import * as chai from 'chai';
import { expect } from 'chai';
import {
  EmojiNodeType,
  EmojiQueryMarkType,
  EmojisPlugin,
  ProseMirror,
  Schema,
  schema as schemaBasic
} from '../../../src';
import { chaiPlugin } from '../../../src/test-helper';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    emoji: { type: EmojiNodeType, group: 'inline' }
  }),
  marks: {
    emoji_query: EmojiQueryMarkType
  }
});

const makeEditor = () => new ProseMirror({
  schema: schema,
  plugins: [EmojisPlugin],
});

describe('emojis - input rules', () => {
  it('should replace a standalone ":" with emoji-query-mark', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'foo :');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['emoji_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
  });

  it('should not replace a ":" thats part of a word', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'foo:');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['emoji_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.equal(undefined);
  });

  it('should replace ":" at the start of the content', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, ':');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['emoji_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
  });

  it('should replace ":" if there are multiple spaces infront of it', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '  :');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['emoji_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.not.equal(undefined);
  });
});
