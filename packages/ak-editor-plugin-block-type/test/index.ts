import BlockTypePlugin from '../src';
import { chaiPlugin, makeEditor, doc, p, text, h1, blockquote } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

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

  it('should get current state immediately', (done) => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    setTimeout(() => {
      expect(spy.calledWith({
        selectedBlockType: 'paragraph',
        enabled: true
      })).to.be.true;

      done();
    }, 500);
  });

  it('should be able to subscribe the changes', (done) => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);
    plugin.changeBlockType('heading');

    setTimeout(() => {
      expect(spy.calledWith({
        selectedBlockType: 'heading1',
        enabled: true
      })).to.be.true;

      done();
    }, 500);
  });
});
