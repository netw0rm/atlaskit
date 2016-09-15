import TextFormattingPlugin from '../src';
import { doc, p, em, chaiPlugin, makeEditor } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-text-formatting', () => {
  const editor = (doc: any) => makeEditor({ doc, plugin: TextFormattingPlugin });

  it('should be able to toggle em', () => {
    const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

    expect(plugin.toggleMark('em')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p(em('t'), 'ext')))
    expect(plugin.toggleMark('em')).to.be.true;
    expect(pm.doc).to.deep.equal(doc(p('text')))
  });

  it('should expose whether an em is active', () => {
    const { plugin } = editor(doc(p('te{a}xt')));

    expect(plugin.getState().emActive).to.be.false;
    expect(plugin.toggleMark('em')).to.be.true;
    expect(plugin.getState().emActive).to.be.true;
  });

  it('should allow a change handler to be attached', () => {
    const { plugin } = editor(doc(p('te{a}xt')));
    const spy = sinon.spy()
    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);

    expect(spy).to.have.been.calledWith({
      disabled: false,
      emActive: false,
      strongActive: false,
      underlineActive: false
    });
  });

  it('should allow a change handler to be attached', () => {
    const { plugin } = editor(doc(p('te{a}xt')));
    const spy = sinon.spy()
    plugin.subscribe(spy);

    plugin.toggleMark('em')

    expect(spy).to.have.been.callCount(2);

    expect(spy).to.have.been.calledWith({
      disabled: false,
      emActive: true,
      strongActive: false,
      underlineActive: false
    });
  });
});
