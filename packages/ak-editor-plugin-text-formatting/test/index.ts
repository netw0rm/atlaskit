import TextFormattingPlugin from '../src';
import { chaiPlugin, makeEditor } from 'ak-editor-test';
import { doc, em, mono, p, plain, schema, strike, strong, sub, sup, u } from './_schema-builder';
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
    it('should be able to toggle em on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleEm());
      expect(pm.doc).to.deep.equal(doc(p(em('t'), 'ext')));
      expect(plugin.toggleEm());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether em is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.emActive).to.be.false;
      expect(plugin.toggleEm());
      expect(plugin.emActive).to.be.true;
    });

    it('should expose whether em is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.emActive).to.be.false;
      expect(plugin.toggleEm());
      expect(plugin.emActive).to.be.true;
    });

    it('exposes em as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.emDisabled).to.be.true;
    });

    it('exposes em as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.emDisabled).to.be.false;
    });
  });

  describe('strong', () => {
    it('should be able to toggle strong on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleStrong());
      expect(pm.doc).to.deep.equal(doc(p(strong('t'), 'ext')));
      expect(plugin.toggleStrong());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether strong is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strongActive).to.be.false;
      expect(plugin.toggleStrong());
      expect(plugin.strongActive).to.be.true;
    });

    it('should expose whether strong is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.strongActive).to.be.false;
      expect(plugin.toggleStrong());
      expect(plugin.strongActive).to.be.true;
    });

    it('exposes strong as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.strongDisabled).to.be.true;
    });

    it('exposes strong as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strongDisabled).to.be.false;
    });
  });

  describe('underline', () => {
    it('should be able to toggle underline on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleUnderline());
      expect(pm.doc).to.deep.equal(doc(p(u('t'), 'ext')));
      expect(plugin.toggleUnderline());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether underline is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.underlineActive).to.be.false;
      expect(plugin.toggleUnderline());
      expect(plugin.underlineActive).to.be.true;
    });

    it('should expose whether underline is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.underlineActive).to.be.false;
      expect(plugin.toggleUnderline());
      expect(plugin.underlineActive).to.be.true;
    });

    it('exposes underline as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.underlineDisabled).to.be.true;
    });

    it('exposes underline as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.underlineDisabled).to.be.false;
    });
  });

  describe('monospace', () => {
    it('should be able to toggle monospace on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleMono());
      expect(pm.doc).to.deep.equal(doc(p(mono('t'), 'ext')));
      expect(plugin.toggleMono());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether mono is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.monoActive).to.be.false;
      expect(plugin.toggleMono());
      expect(plugin.monoActive).to.be.true;
    });

    it('should expose whether mono is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.monoActive).to.be.false;
      expect(plugin.toggleMono());
      expect(plugin.monoActive).to.be.true;
    });

    it('exposes mono as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.monoDisabled).to.be.true;
    });

    it('exposes mono as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.monoDisabled).to.be.false;
    });
  });

  describe('strike', () => {
    it('should be able to toggle strike on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleStrike());
      expect(pm.doc).to.deep.equal(doc(p(strike('t'), 'ext')));
      expect(plugin.toggleStrike());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether strike is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strikeActive).to.be.false;
      expect(plugin.toggleStrike());
      expect(plugin.strikeActive).to.be.true;
    });

    it('should expose whether strike is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.strikeActive).to.be.false;
      expect(plugin.toggleStrike());
      expect(plugin.strikeActive).to.be.true;
    });

    it('exposes strike as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.strikeDisabled).to.be.true;
    });

    it('exposes strike as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strikeDisabled).to.be.false;
    });
  });

  describe('subscript', () => {
    it('should be able to toggle subscript on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleSubscript());
      expect(pm.doc).to.deep.equal(doc(p(sub('t'), 'ext')));
      expect(plugin.toggleSubscript());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether subcript is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.subscriptActive).to.be.false;
      expect(plugin.toggleSubscript());
      expect(plugin.subscriptActive).to.be.true;
    });

    it('should expose whether subcript is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.subscriptActive).to.be.false;
      expect(plugin.toggleSubscript());
      expect(plugin.subscriptActive).to.be.true;
    });

    it('exposes subcript as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.subscriptDisabled).to.be.true;
    });

    it('exposes subcript as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.subscriptDisabled).to.be.false;
    });

    it('deactives superscript after toggling subscript for an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      plugin.toggleSuperscript();
      plugin.toggleSubscript();
      expect(plugin.superscriptActive).to.be.false;
    });

    it('deactives superscript after toggling subscript for selected text', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      plugin.toggleSuperscript();
      plugin.toggleSubscript();
      expect(plugin.superscriptActive).to.be.false;
    });
  });

  describe('superscript', () => {
    it('should be able to toggle superscript on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleSuperscript());
      expect(pm.doc).to.deep.equal(doc(p(sup('t'), 'ext')));
      expect(plugin.toggleSuperscript());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether superscript is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.superscriptActive).to.be.false;
      expect(plugin.toggleSuperscript());
      expect(plugin.superscriptActive).to.be.true;
    });

    it('should expose whether superscript is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.superscriptActive).to.be.false;
      expect(plugin.toggleSuperscript());
      expect(plugin.superscriptActive).to.be.true;
    });

    it('exposes superscript as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.superscriptDisabled).to.be.true;
    });

    it('exposes superscript as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.superscriptDisabled).to.be.false;
    });

    it('deactives subscript after toggling superscript for an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      plugin.toggleSubscript();
      plugin.toggleSuperscript();
      expect(plugin.subscriptActive).to.be.false;
    });

    it('deactives subscript after toggling superscript for selected text', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      plugin.toggleSubscript();
      plugin.toggleSuperscript();
      expect(plugin.subscriptActive).to.be.false;
    });
  });
});
