import { default as plugin } from '../src';
import { ProseMirror } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import { SyncPlugin } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiEditor, insertText } = testing({
  schema, Node, Slice, Fragment })
const { doc, p, text, em } = builder;
chai.use(chaiEditor);

describe('ak-editor-plugin-text-formatting', () => {
  const makeEditor = () => new ProseMirror({
    schema: schema,
    plugins: [plugin, SyncPlugin]
  });

  it('should be able to toggle em', () => {
    const pm = makeEditor();
    insertText(pm, 'text');
    pm.setTextSelection(1, 2);

    expect(plugin.get(pm).toggleMark('em')).to.be.true;
    expect(pm.doc).to.equal(doc(p(em('t'), 'ext')))
    expect(plugin.get(pm).toggleMark('em')).to.be.true;
    expect(pm.doc).to.equal(doc(p('text')))
  });

  it('should expose whether an em is active', () => {
    const pm = makeEditor();
    insertText(pm, 'text');
    pm.setTextSelection(1, 2);

    expect(plugin.get(pm).getState().emActive).to.be.false;
    expect(plugin.get(pm).toggleMark('em')).to.be.true;
    expect(plugin.get(pm).getState().emActive).to.be.true;
  });
});
