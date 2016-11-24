import mocha from 'mocha';
import { default as plugin } from '../src';
import { MentionQueryMarkType, Mention } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
  }),
  marks: {
    mention_query: MentionQueryMarkType
  }
});

const makeEditor = () => new ProseMirror({
  schema: schema,
  plugins: [ plugin ],
});

describe('ak-editor-plugin-mentions - input rules', () => {
  it('should replace a standalone "@" with mention-query-mark', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0,'foo @');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore.marks)).not.to.be.undefined;
  });

  it('should not replace a "@" thats part of a word', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'foo@');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore.marks)).to.be.undefined;
  });

  it('should replace "@" at the start of the content', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '@');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore.marks)).not.to.be.undefined;
  });

  it('should replace "@" if there are multiple spaces infront of it', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '  @');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore.marks)).not.to.be.undefined;
  });
});
