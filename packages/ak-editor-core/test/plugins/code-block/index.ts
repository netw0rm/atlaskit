import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as mocha from 'mocha';

import CodeBlockPlugin from '../../../src/plugins/code-block';
import { chaiPlugin, makeEditor, doc, p, h1, h2, h3, h4, h5, blockquote, code_block, br } from '../../../test-helper';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe.only('code-block', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: CodeBlockPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('subscribe', () => {
    it('calls subscriber with plugin', () => {
      const { pm, plugin } = editor(doc(p('paragraph')));
      const spy = sinon.spy();
      plugin.subscribe(spy);

      expect(spy).to.have.been.calledWith(plugin);
    });

    context('when leaving code block', () => {
      it('notifies subscriber', () => {
        const { pm, plugin } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
        const spy = sinon.spy();
        const { pPos } = pm.doc.refs;

        plugin.subscribe(spy);
        pm.setTextSelection(pPos);

        expect(spy).to.have.been.calledTwice;
      });
    });

    context('when entering code block', () => {
      it('notifies subscriber', () => {
        const { pm, plugin } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = pm.doc.refs;

        plugin.subscribe(spy);
        pm.setTextSelection(cbPos);

        expect(spy).to.have.been.calledTwice;
      });
    });

    context('when moving to a different code block', () => {
      it('notifies subscriber', () => {
        const { pm, plugin } = editor(doc(code_block()('codeBlock{<>}'), code_block()('codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = pm.doc.refs;

        plugin.subscribe(spy);
        pm.setTextSelection(cbPos);

        expect(spy).to.have.been.calledTwice;
      });
    });

    context('when moving within the same code block', () => {
      it('does not notify subscriber', () => {
        const { pm, plugin } = editor(doc(code_block()('{<>}codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = pm.doc.refs;

        plugin.subscribe(spy);
        pm.setTextSelection(cbPos);

        expect(spy).to.not.have.been.calledTwice;
      });
    });

    context('when unsuscribe', () => {
      const { pm, plugin } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock{cbPos}')));
      const spy = sinon.spy();
      const { cbPos } = pm.doc.refs;
      plugin.subscribe(spy);

      plugin.unsubscribe(spy);
      pm.setTextSelection(cbPos);

      expect(spy).to.not.have.been.calledTwice;
    });
  });
});
