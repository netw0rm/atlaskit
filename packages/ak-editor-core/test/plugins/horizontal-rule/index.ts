import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import mocha from 'mocha';
import HorizontalPlugin from '../../../src/plugins/horizontal-rule';
import { commands, browser, chaiPlugin, makeEditor, hr, doc, p } from '../../../src';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('horizontal-rule', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: HorizontalPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('keymap', () => {
    if(browser.mac) {
      context('when hits Cmd-Shift--', () => {
        const { pm, plugin } = editor(p('text<>'));

        pm.input.dispatchKey('Cmd-Shift--');

        expect(pm.doc).to.deep.equal(doc(p('text'), hr));
      });
    } else {
      context('when hits Ctrl-Shift--', () => {
        const { pm, plugin } = editor(p('text<>'));

        pm.input.dispatchKey('Ctrl-Shift--');

        expect(pm.doc).to.deep.equal(doc(p('text'), hr));
      });
    }
  });

  

  it('calls subscriber immediately when it subscribes', () => {
    const { pm, plugin } = editor(doc(hr));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.calledWith(plugin);
  });
});

