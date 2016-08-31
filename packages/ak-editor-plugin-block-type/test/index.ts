import BlockTypePlugin from '../src';
import { Plugin } from 'prosemirror/dist/edit';
import { Slice, Node, Fragment } from 'prosemirror/dist/model';
import { schema } from 'prosemirror/dist/schema-basic';
import testing from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

const { builder, chaiPlugin, makeEditor } = testing({
  Fragment, Node, Plugin, Slice, schema })
const { doc, p, text, h1 } = builder;
chai.use(chaiPlugin);

describe('ak-editor-plugin-block-type', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: BlockTypePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('should be able to change to heading1', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('heading')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(h1('text')));
  });

  it('should not be able to change to the same block type', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('paragraph')).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p('text')));
  });

  it('should not be able to change block types when selecting two nodes', () => {
    const { pm, plugin } = editor(doc(p('li{<}ne1'), p('li{>}ne2')));

    expect(plugin.changeBlockType('heading')).to.be.false;
    expect(pm.doc).to.deep.equal(doc(p('line1'), p('line2')));
  });

  it('should change state when selecting different block types', () => {
    const { pm, plugin } = editor(doc(h1('te{h1Pos}xt'), p('te{pPos}xt')));
    const { h1Pos, pPos } = pm.doc.refs;

    pm.setTextSelection(h1Pos);
    expect(plugin.getState().selectedBlockType).to.equal('heading1');

    pm.setTextSelection(pPos);
    expect(plugin.getState().selectedBlockType).to.equal('paragraph');
  });
});
