import BlockTypePlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, text, h1, blockquote } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-block-type (legacy)', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: BlockTypePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = BlockTypePlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  it('should be able to change to heading1', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('heading')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(h1('text')));
  });

  it('should be able to change to blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('blockquote')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be able to change to back to paragraph and then change to blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('heading')).to.be.true;
    expect(plugin.changeBlockType('blockquote')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be not able to nest blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    expect(plugin.changeBlockType('blockquote')).to.be.true;
    expect(plugin.changeBlockType('blockquote')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
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

  it('should get current state immediately once subscribed', () => {
    const { pm, plugin } = editor(doc(p('text')));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);

    expect(spy).to.have.been.calledWith({
      selectedBlockType: 'paragraph',
      enabled: true
    });
  });

  it('should be able to subscribe the changes', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);
    plugin.changeBlockType('heading');

    expect(spy).to.have.been.callCount(2);

    expect(spy).to.have.been.calledWith({
      selectedBlockType: 'heading1',
      enabled: true
    });
  });
});
