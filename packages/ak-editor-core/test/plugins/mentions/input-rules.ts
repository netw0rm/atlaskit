import * as chai from 'chai';
import { expect } from 'chai';
import { MentionNodeType, MentionQueryMarkType, MentionsPlugin,
          ProseMirror, Schema, schema as schemaBasic } from '../../../src';
import { chaiPlugin } from '../../../test-helper';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: MentionNodeType, group: 'inline' }
  }),
  marks: {
    mention_query: MentionQueryMarkType
  }
});

const makeEditor = () => new ProseMirror({
  schema: schema,
  plugins: [ MentionsPlugin ],
});

describe('mentions - input rules', () => {
  it('should replace a standalone "@" with mention-query-mark', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0,'foo @');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).not.to.be.undefined;
  });

  it('should not replace a "@" thats part of a word', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'foo@');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).to.be.undefined;
  });

  it('should replace "@" at the start of the content', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '@');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).not.to.be.undefined;
  });

  it('should replace "@" if there are multiple spaces infront of it', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '  @');

    const cursorFocus = pm.selection.$to;
    expect(pm.schema.marks['mention_query'].isInSet(cursorFocus.nodeBefore!.marks)).not.to.be.undefined;
  });
});
