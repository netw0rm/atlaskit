import { default as plugin } from '../src';
import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiEditor, insertText, SyncPlugin } = testing({
  Fragment, Node, Plugin, Slice, schema })
const { doc, p, text, h1 } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-block-type', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin, SyncPlugin]
  });

  it('should be able to change to heading1', () => {
    const pm = makeEditor();
    insertText(pm, 'text');
    pm.setTextSelection(2);

    expect(plugin.get(pm).changeBlockType('heading')).to.be.true;
    expect(pm.doc).to.equal(doc(h1('text')));
  });

  it('should not be able to change to the same block type', () => {
    const pm = makeEditor();
    insertText(pm, 'text');
    pm.setTextSelection(2);

    expect(plugin.get(pm).changeBlockType('paragraph')).to.be.false;
    expect(pm.doc).to.equal(doc(p('text')));
  });

  it('should not be able to change block types when selecting two nodes', () => {
    const pm = makeEditor();
    pm.setDocInner(doc(p('line1'), p('line2')));
    pm.setTextSelection(1, 10);

    expect(plugin.get(pm).changeBlockType('heading')).to.be.false;
  });

  it('should change state when selecting different block types', () => {
    const pm = makeEditor();
    pm.setDocInner(doc(h1('text'), p('text')));

    pm.setTextSelection(2);
    expect(plugin.get(pm).getState().selectedBlockType).to.equal('heading1');

    pm.setTextSelection(10);
    expect(plugin.get(pm).getState().selectedBlockType).to.equal('paragraph');
  });
});
