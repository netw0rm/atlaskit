import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import CodeBlockPlugin from '../../../src/plugins/code-block';
import { chaiPlugin, code_block, doc, makeEditor, p } from '../../../test-helper';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe('code-block', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: CodeBlockPlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  describe('subscribe', () => {
    it('calls subscriber with plugin', () => {
      const { plugin } = editor(doc(p('paragraph')));
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

    context('when unsubscribe', () => {
      it('does not notify the subscriber', () => {
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
      it('exits code block', () => {
        const { pm } = editor(doc(code_block()('text{<>}')));

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
            const { plugin } = editor(doc(code_block()('text\n{<>}')));

            expect(plugin.splitCodeBlock()).to.equal(false);
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt\n')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt\n')));
          });

          it('returns true', () => {
            const { plugin } = editor(doc(code_block()('te{<>}xt\n')));

            expect(plugin.splitCodeBlock()).to.equal(true);
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
            const { plugin } = editor(doc(code_block()('text{<>}')));

            expect(plugin.splitCodeBlock()).to.equal(true);
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt')));
          });

          it('returns true', () => {
            const { plugin } = editor(doc(code_block()('te{<>}xt')));

            expect(plugin.splitCodeBlock()).to.equal(true);
          });
        });
      });
    });

    context('when it is not a code block', () => {
      it('returns false', () => {
        const { plugin } = editor(doc(p('text{<>}')));

        expect(plugin.splitCodeBlock()).to.equal(false);
      });
    });
  });

  describe('element', () => {
    context('when cursor moves within the same code block', () => {
      it('returns the same element', () => {
        const { pm, plugin } = editor(doc(code_block()('code{<>}Block{cbPos}')));
        const { cbPos } = pm.doc.refs;

        const previousElement = plugin.element;
        pm.setTextSelection(cbPos);

        const currentElement = plugin.element;

        expect(previousElement).to.eq(currentElement);
      });
    });

    context('when cursor moves onto different code block', () => {
      it('returns different elements', () => {
        const { pm, plugin } = editor(doc(code_block()('one{<>} codeBlock'), code_block()('another{cbPos} codeBlock')));
        const { cbPos } = pm.doc.refs;

        const previousElement = plugin.element;
        pm.setTextSelection(cbPos);

        const currentElement = plugin.element;

        expect(previousElement).not.to.eq(currentElement);

      });
    });

    context('when cursor is within a code block', () => {
      context('when at the end of the code block', () => {
        it('returns code block element', () => {
          const { plugin } = editor(doc(p('paragraph'), code_block()('codeBlock{<>}')));

          expect(plugin.element).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the beginning of the code block', () => {
        it('returns code block element', () => {
          const { plugin } = editor(doc(p('paragraph'), code_block()('{<>}codeBlock')));

          expect(plugin.element).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the middle of the code block', () => {
        it('returns code block element', () => {
          const { plugin } = editor(doc(p('paragraph'), code_block()('code{<>}Block')));

          expect(plugin.element).to.instanceOf(HTMLPreElement);
        });
      });
    });

    context('when cursor is out of code block', () => {
      it('returns undefined', () => {
        const { plugin } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock')));

        expect(plugin.element).to.equal(undefined);
      });
    });
  });

  context('updateLanguage', () => {
    it('keeps the content', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousElement = plugin.element;

      plugin.updateLanguage('php');

      const currentElement = plugin.element;

      expect(previousElement.textContent).to.eq(currentElement.textContent);
    });

    it('can update language to be null', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      plugin.updateLanguage(null);

      expect(plugin.language).to.be.null;
    });

    it('updates language', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      plugin.updateLanguage('php');

      expect(plugin.language).to.eq('php');
    });

    it('updates the node', () => {
      const { plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousActiveCodeBlock = plugin.activeCodeBlock;

      plugin.updateLanguage('php');

      const currentActiveCodeBlock = plugin.activeCodeBlock;

      expect(previousActiveCodeBlock).to.not.eq(currentActiveCodeBlock);
    });
  });

  describe('active', () => {
    context('inside a code block', () => {
      it('is active', () => {
        const { plugin } = editor(doc(code_block()('te{<>}xt')));

        expect(plugin.active).to.equal(true);
      });
    });

    context('outside of a code block', () => {
      it('is not active', () => {
        const { plugin } = editor(doc(p('te{<>}xt')));

        expect(plugin.active).to.equal(false);
      });
    });
  });

  describe('language', () => {
    it('is the same as activeCodeBlock language', () => {
      const { plugin } = editor(doc(code_block({language: 'java'})('te{<>}xt')));

      expect(plugin.language).to.eq('java');
    });

    it('updates if activeCodeBlock updates langugae', () => {
      const { plugin } = editor(doc(code_block({language: 'java'})('te{<>}xt')));

      plugin.updateLanguage('php');

      expect(plugin.language).to.eq('php');
    });

    it('sets language to null if no activeCodeBlock', () => {
      const { plugin } = editor(doc(p('te{<>}xt')));

      expect(plugin.language).to.be.null;
    });
  });
});
