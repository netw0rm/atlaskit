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

  describe('activeCodeBlockElement', () => {
    context('when cursor moves winthin the same code block', () => {
      it('returns the same element', () => {
        const { pm, plugin } = editor(doc(code_block()('code{<>}Block{cbPos}')));
        const { cbPos } = pm.doc.refs;

        const previous_element = plugin.targetElement;
        pm.setTextSelection(cbPos);

        const current_element = plugin.targetElement;

        expect(previous_element).to.eq(current_element);
      });
    });

    context('when cursor moves onto different code block', () => {
      it('returns different elements', () => {
        const { pm, plugin } = editor(doc(code_block()('one{<>} codeBlock'), code_block()('another{cbPos} codeBlock')));
        const { cbPos } = pm.doc.refs;

        const previous_element = plugin.targetElement;
        pm.setTextSelection(cbPos);

        const current_element = plugin.targetElement;

        expect(previous_element).not.to.eq(current_element);

      });
    });

    context('when cursor is within a code block', () => {
      context('when at the end of the code block', () => {
        it('returns code block element', () => {
          const { pm, plugin } = editor(doc(p('paragraph'), code_block()('codeBlock{<>}')));

          expect(plugin.targetElement).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the begining of the code block', () => {
        it('returns code block element', () => {
          const { pm, plugin } = editor(doc(p('paragraph'), code_block()('{<>}codeBlock')));

          expect(plugin.targetElement).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the middle of the code block', () => {
        it('returns code block element', () => {
          const { pm, plugin } = editor(doc(p('paragraph'), code_block()('code{<>}Block')));

          expect(plugin.targetElement).to.instanceOf(HTMLPreElement);
        });
      });
    });

    context('when cursor is out of code block', () => {
      it('returns undefined', () => {
        const { pm, plugin } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock')));

        expect(plugin.targetElement).to.be.undefined;
      });
    });
  });

  context('updateLanguage', () => {
    it('keeps the content', () => {
      const { pm, plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousTargetNode = plugin.targetNode;

      plugin.updateLanguage('php');

      const currentTargetNode = plugin.targetNode;

      expect(previousTargetNode.textContent).to.eq(currentTargetNode.textContent);
    });

    it('can update language to be undefined', () => {
      const { pm, plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      plugin.updateLanguage(null);

      expect(plugin.targetNode.attrs.language).to.be.null;
    });

    it('updates language', () => {
      const { pm, plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      plugin.updateLanguage('php');

      expect(plugin.targetNode.attrs.language).to.eq('php');
    });

    it('updates the node', () => {
      const { pm, plugin } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousTargetNode = plugin.targetNode;

      plugin.updateLanguage('php');

      const currentTargetNode = plugin.targetNode;

      expect(previousTargetNode).to.not.eq(currentTargetNode);
    });
  });
});
