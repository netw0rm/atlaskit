import TextFormattingPlugin from '../src';
import { Plugin } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiPlugin, makeEditor } = testing({
  Fragment, Node, Plugin, schema, Slice })
const { doc, p, text, em } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-text-formatting', () => {
  const editor = (...content: any[]) => makeEditor({
    doc: doc(p(...content)),
    plugin: TextFormattingPlugin
  });

  it('should be able to toggle em', () => {
    const { pm, plugin } = editor('{<}t{>}ext');

    expect(plugin.toggleMark('em')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(em('t'), 'ext')))
    expect(plugin.toggleMark('em')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p('text')))
  });

  it('should expose whether an em is active', () => {
    const { plugin } = editor('te{a}xt');

    expect(plugin.getState().emActive).to.be.false;
    expect(plugin.toggleMark('em')).to.be.true;
    expect(plugin.getState().emActive).to.be.true;
  });
});
