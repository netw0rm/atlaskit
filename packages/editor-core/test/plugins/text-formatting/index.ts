import { expect } from 'chai';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { browser, TextFormattingPlugin } from '../../../src';
import { chaiPlugin, makeEditor } from '../../../test-helper';
import { doc, em, code, p, plain, schema, strike, strong, sub, sup, u } from '../../_schema-builder';

chai.use(chaiPlugin);

describe('text-formatting', () => {
  const editor = (doc: any) => makeEditor({ doc, plugin: TextFormattingPlugin, schema });

  describe('keymap', () => {
    if (browser.mac) {
      context('when on a mac', () => {
        context('when hits Cmd-B', () => {
          it('toggles bold mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleStrong = sinon.spy(plugin, 'toggleStrong');

            pm.input.dispatchKey('Cmd-B');

            expect(toggleStrong.callCount).to.equal(1);
          });
        });

        context('when hits Cmd-I', () => {
          it('toggles italic mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleEm = sinon.spy(plugin, 'toggleEm');

            pm.input.dispatchKey('Cmd-I');

            expect(toggleEm.callCount).to.equal(1);
          });
        });

        context('when hits Cmd-U', () => {
          it('toggles underline mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleUnderline = sinon.spy(plugin, 'toggleUnderline');

            pm.input.dispatchKey('Cmd-U');

            expect(toggleUnderline.callCount).to.equal(1);
          });
        });

        /*
          Node: Here dispatch key 'Shift-Cmd-S' instead of 'Cmd-Shift-S',
                Because after key binding, it was normalized.
        */
        context('when hits Shift-Cmd-S', () => {
          it('toggles strikethrough mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleStrike = sinon.spy(plugin, 'toggleStrike');

            pm.input.dispatchKey('Shift-Cmd-S');

            expect(toggleStrike.callCount).to.equal(1);
          });
        });

        context('when hits Shift-Cmd-M', () => {
          it('toggles code mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleCode = sinon.spy(plugin, 'toggleCode');

            pm.input.dispatchKey('Shift-Cmd-M');

            expect(toggleCode.callCount).to.equal(1);
          });
        });
      });
    } else {
      context('when not on a mac', () => {
        context('when hits Ctrl-B', () => {
          it('toggles bold mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleStrong = sinon.spy(plugin, 'toggleStrong');

            pm.input.dispatchKey('Ctrl-B');

            expect(toggleStrong.callCount).to.equal(1);
          });
        });

        context('when hits Ctrl-B', () => {
          it('toggles italic mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleEm = sinon.spy(plugin, 'toggleEm');

            pm.input.dispatchKey('Ctrl-I');

            expect(toggleEm.callCount).to.equal(1);
          });
        });

        context('when hits Ctrl-B', () => {
          it('toggles underline mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleUnderline = sinon.spy(plugin, 'toggleUnderline');

            pm.input.dispatchKey('Ctrl-U');

            expect(toggleUnderline.callCount).to.equal(1);
          });
        });

        /*
          Node: Here dispatch key 'Shift-Ctrl-S' instead of 'Ctrl-Shift-S',
                Because after key binding, it was normalized.
        */
        context('when hits Shift-Ctrl-S', () => {
          it('toggles strikethrough mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleStrike = sinon.spy(plugin, 'toggleStrike');

            pm.input.dispatchKey('Shift-Ctrl-S');

            expect(toggleStrike.callCount).to.equal(1);
          });
        });

        context('when hits Shift-Ctrl-M', () => {
          it('toggles code mark', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleCode = sinon.spy(plugin, 'toggleCode');

            pm.input.dispatchKey('Shift-Ctrl-M');

            expect(toggleCode.callCount).to.equal(1);
          });
        });
      });
    }

  });

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = TextFormattingPlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  it('should allow a change handler to be attached', () => {
    const { plugin } = editor(doc(p('text')));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(plugin)).to.equal(true);
  });

  it('should call change handlers when em is toggled', () => {
    const { plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();
    plugin.subscribe(spy);

    plugin.toggleEm();

    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith(plugin)).to.equal(true);
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

      expect(plugin.emActive).to.equal(false);
      expect(plugin.toggleEm());
      expect(plugin.emActive).to.equal(true);
    });

    it('should expose whether em is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.emActive).to.equal(false);
      expect(plugin.toggleEm());
      expect(plugin.emActive).to.equal(true);
    });

    it('exposes em as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.emDisabled).to.equal(true);
    });

    it('exposes em as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.emDisabled).to.equal(false);
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

      expect(plugin.strongActive).to.equal(false);
      expect(plugin.toggleStrong());
      expect(plugin.strongActive).to.equal(true);
    });

    it('should expose whether strong is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.strongActive).to.equal(false);
      expect(plugin.toggleStrong());
      expect(plugin.strongActive).to.equal(true);
    });

    it('exposes strong as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.strongDisabled).to.equal(true);
    });

    it('exposes strong as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strongDisabled).to.equal(false);
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

      expect(plugin.underlineActive).to.equal(false);
      expect(plugin.toggleUnderline());
      expect(plugin.underlineActive).to.equal(true);
    });

    it('should expose whether underline is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.underlineActive).to.equal(false);
      expect(plugin.toggleUnderline());
      expect(plugin.underlineActive).to.equal(true);
    });

    it('exposes underline as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.underlineDisabled).to.equal(true);
    });

    it('exposes underline as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.underlineDisabled).to.equal(false);
    });
  });

  describe('code', () => {
    it('should be able to toggle code on a character', () => {
      const { pm, plugin } = editor(doc(p('{<}t{>}ext')));

      expect(plugin.toggleCode());
      expect(pm.doc).to.deep.equal(doc(p(code('t'), 'ext')));
      expect(plugin.toggleCode());
      expect(pm.doc).to.deep.equal(doc(p('text')));
    });

    it('should expose whether code is active on an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.codeActive).to.equal(false);
      expect(plugin.toggleCode());
      expect(plugin.codeActive).to.equal(true);
    });

    it('should expose whether code is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.codeActive).to.equal(false);
      expect(plugin.toggleCode());
      expect(plugin.codeActive).to.equal(true);
    });

    it('exposes code as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.codeDisabled).to.equal(true);
    });

    it('exposes code as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.codeDisabled).to.equal(false);
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

      expect(plugin.strikeActive).to.equal(false);
      expect(plugin.toggleStrike());
      expect(plugin.strikeActive).to.equal(true);
    });

    it('should expose whether strike is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.strikeActive).to.equal(false);
      expect(plugin.toggleStrike());
      expect(plugin.strikeActive).to.equal(true);
    });

    it('exposes strike as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.strikeDisabled).to.equal(true);
    });

    it('exposes strike as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.strikeDisabled).to.equal(false);
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

      expect(plugin.subscriptActive).to.equal(false);
      expect(plugin.toggleSubscript());
      expect(plugin.subscriptActive).to.equal(true);
    });

    it('should expose whether subcript is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.subscriptActive).to.equal(false);
      expect(plugin.toggleSubscript());
      expect(plugin.subscriptActive).to.equal(true);
    });

    it('exposes subcript as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.subscriptDisabled).to.equal(true);
    });

    it('exposes subcript as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.subscriptDisabled).to.equal(false);
    });

    it('deactives superscript after toggling subscript for an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      plugin.toggleSuperscript();
      plugin.toggleSubscript();
      expect(plugin.superscriptActive).to.equal(false);
    });

    it('deactives superscript after toggling subscript for selected text', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      plugin.toggleSuperscript();
      plugin.toggleSubscript();
      expect(plugin.superscriptActive).to.equal(false);
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

      expect(plugin.superscriptActive).to.equal(false);
      expect(plugin.toggleSuperscript());
      expect(plugin.superscriptActive).to.equal(true);
    });

    it('should expose whether superscript is active on a text selection', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      expect(plugin.superscriptActive).to.equal(false);
      expect(plugin.toggleSuperscript());
      expect(plugin.superscriptActive).to.equal(true);
    });

    it('exposes superscript as disabled when the mark cannot be applied', () => {
      const { plugin } = editor(doc(plain('te{<>}xt')));

      expect(plugin.superscriptDisabled).to.equal(true);
    });

    it('exposes superscript as not disabled when the mark can be applied', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.superscriptDisabled).to.equal(false);
    });

    it('deactives subscript after toggling superscript for an empty selection', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      plugin.toggleSubscript();
      plugin.toggleSuperscript();
      expect(plugin.subscriptActive).to.equal(false);
    });

    it('deactives subscript after toggling superscript for selected text', () => {
      const { plugin } = editor(doc(p('t{<}e{>}xt')));

      plugin.toggleSubscript();
      plugin.toggleSuperscript();
      expect(plugin.subscriptActive).to.equal(false);
    });
  });
});
