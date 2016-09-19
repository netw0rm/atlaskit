import { default as plugin } from '../src';
import { Mention } from 'ak-editor-schema';
import { ProseMirror, Schema, ResolvedPos,
         schema as schemaBasic } from 'ak-editor-prosemirror';
import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from 'ak-editor-test';

chai.use(chaiPlugin);

const schema: Schema = new Schema({
  nodes: schemaBasic.nodeSpec.append({
    mention: { type: Mention, group: 'inline' }
  }),
  marks: schemaBasic.markSpec
});

const makeEditor = () => new ProseMirror({
  schema: schema,
  plugins: [ plugin ],
});

describe('ak-editor-plugin-mentions - input rules', () => {
  it('should replace a standalone "@" with mention node', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0,'foo @');

    const cursorFocus: ResolvedPos = pm.selection.$to;
    expect(cursorFocus.nodeBefore).to.be.of.nodeType(Mention);
  });

  it('should not replace a "@" thats part of a word', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'foo@');

    const cursorFocus: ResolvedPos = pm.selection.$to;
    expect(cursorFocus.nodeBefore).not.to.be.of.nodeType(Mention);
  });
});
