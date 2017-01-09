import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import * as mocha from 'mocha';

import CodeBlockPlugin from '../../../src/plugins/code-block';
import { chaiPlugin, makeEditor, doc, p, h1, h2, h3, h4, h5, blockquote, code_block, br } from '../../../test-helper';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe('code-block', () => {
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

  describe('keymap', () => {
    context('when hits enter', () => {
      it('calls splitCodeBlock', () => {
        const { pm, plugin } = editor(doc(code_block()('text')));
        const splitCodeBlock = sinon.spy(plugin, 'splitCodeBlock');

        pm.input.dispatchKey('Enter');

        expect(splitCodeBlock).to.have.been.callCount(1);
      });
    });

    context('when hits double enter', () => {
      it('exits code block', ()=> {
        const { pm, plugin } = editor(doc(code_block()('text{<>}')));

        pm.input.dispatchKey('Enter');
        pm.input.dispatchKey('Enter');

        expect(pm.doc).to.deep.equal(doc(code_block()('text'), p('')));
      });
    });
  });

  describe('splitCodeBlock', () => {
    context('when it is a code block', () => {
      context('when last char is a new line', () => {
        context('when cursor is at the end of code block', () => {
          it('removes the last new line char in code block', () => {
            const { pm, plugin } = editor(doc(code_block()('text\n{<>}')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });

          it('returns false', () => {
            const { pm, plugin } = editor(doc(code_block()('text\n{<>}')));

            expect(plugin.splitCodeBlock()).to.be.false;
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt\n')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt\n')));
          });

          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt\n')));

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });
      });

      context('when last char is not a new line', () => {
        context('when cursor is at the end of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('text{<>}')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('text\n')));
          });

          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('text{<>}')));

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt')));
          });

          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });
      });
    });

    context('when it is not a code block', () => {
      it('returns false', () => {
        const { pm, plugin } = editor(doc(p('text{<>}')));

        expect(plugin.splitCodeBlock()).to.be.false;
      });
    });
  });
});
