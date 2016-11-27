import { TextFormattingPlugin } from '../src';
import { chaiPlugin, makeEditor } from 'ak-editor-test';
import { doc, p, em, strong, u, schema } from './_schema-builder';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-text-formatting', () => {
  const editor = (doc: any) => makeEditor({ doc, plugin: TextFormattingPlugin, schema });

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = TextFormattingPlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
  });

  it('should allow a change handler to be attached', () => {
    const { plugin } = editor(doc(p('text')));
    const spy = sinon.spy()
    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
    expect(spy).to.have.been.calledWith(plugin);
  });

  it('should call change handlers when em is toggled', () => {
    const { plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy()
    plugin.subscribe(spy);

    plugin.toggleEm()

    expect(spy).to.have.been.callCount(2);
    expect(spy).to.have.been.calledWith(plugin);
  });

  describe('em', () => {
    it('should be able to toggle em', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleEm());
      expect(pm.doc).to.deep.equal(doc(p(em('t'), 'ext')));
      expect(plugin.toggleEm());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether em is active', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.emActive).to.be.false;
      expect(plugin.toggleEm());
      expect(plugin.emActive).to.be.true;
    });

    it('should expose whether em is disabled', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.emDisabled).to.be.false;
      expect(plugin.toggleEm());
      expect(plugin.emDisabled).to.be.false;
    });
  });

  describe('strong', () => {
    it('should be able to toggle strong', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleStrong());
      expect(pm.doc).to.deep.equal(doc(p(strong('t'), 'ext')));
      expect(plugin.toggleStrong());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether strong is active', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.strongActive).to.be.false;
      expect(plugin.toggleStrong());
      expect(plugin.strongActive).to.be.true;
    });

    it('should expose whether strong is disabled', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.strongDisabled).to.be.false;
      expect(plugin.toggleStrong());
      expect(plugin.strongDisabled).to.be.false;
    });
  });

  describe('underline', () => {
    it('should be able to toggle underline', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleUnderline());
      expect(pm.doc).to.deep.equal(doc(p(u('t'), 'ext')));
      expect(plugin.toggleUnderline());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether underline is active', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.underlineActive).to.be.false;
      expect(plugin.toggleUnderline());
      expect(plugin.underlineActive).to.be.true;
    });

    it('should expose whether underline is disabled', () => {
      const { plugin } = editor(doc(p('te{a}xt')));

      expect(plugin.underlineDisabled).to.be.false;
      expect(plugin.toggleUnderline());
      expect(plugin.underlineDisabled).to.be.false;
    });
  });
});
