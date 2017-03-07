import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import CodeBlockPlugin from '../../../src/plugins/code-block';
import { fixtures, createEvent, chaiPlugin, code_block, doc, makeEditor, p } from '../../../test-helper';

chai.use(chaiPlugin);
const click = createEvent('click');

describe('code-block', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: CodeBlockPlugin,
    place: fixture()
  });

  describe('subscribe', () => {
    it('calls subscriber with plugin', () => {
      const { pluginState } = editor(doc(p('paragraph')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      expect(spy.calledWith(pluginState)).to.equal(true);
    });

    context('when leaving code block', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(p('paragraph{pPos}'), code_block()('codeBlock{<>}')));
        const spy = sinon.spy();
        const { pPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(pPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when entering code block', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(cbPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving to a different code block', () => {
      it('notifies subscriber', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(code_block()('codeBlock{<>}'), code_block()('codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(cbPos);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when moving within the same code block', () => {
      it('does not notify subscriber', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(code_block()('{<>}codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = refs;

        pluginState.subscribe(spy);
        setTextSelection(cbPos);

        expect(spy.callCount).to.not.equal(2);
      });
    });

    context('when click inside code_block', () => {
      it('notify the subscriber', () => {
        const { plugin, sel, pluginState, editorView } = editor(doc(p('paragraph'), code_block()('codeBlock{<>}')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        plugin.props.handleClick(editorView, sel, click);

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when click outside of code_block', () => {
      it('does not notify the subscriber', () => {
        const { plugin, editorView, sel, pluginState } = editor(doc(p('paragraph{<>}')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        plugin.props.handleClick(editorView, sel, click);

        expect(spy.callCount).to.equal(1);
      });
    });

    context('when unsubscribe', () => {
      it('does not notify the subscriber', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock{cbPos}')));
        const spy = sinon.spy();
        const { cbPos } = refs;
        pluginState.subscribe(spy);

        pluginState.unsubscribe(spy);
        setTextSelection(cbPos);

        expect(spy.callCount).to.not.equal(2);
      });
    });
  });

  describe('element', () => {
    context('when cursor moves within the same code block', () => {
      it('returns the same element', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(code_block()('code{<>}Block{cbPos}')));
        const { cbPos } = refs;

        const previousElement = pluginState.element;
        setTextSelection(cbPos);

        const currentElement = pluginState.element;

        expect(previousElement).to.eq(currentElement);
      });
    });

    context('when cursor moves onto different code block', () => {
      it('returns different elements', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(code_block()('one{<>} codeBlock'), code_block()('another{cbPos} codeBlock')));
        const { cbPos } = refs;

        const previousElement = pluginState.element;
        setTextSelection(cbPos);

        const currentElement = pluginState.element;

        expect(previousElement).not.to.eq(currentElement);

      });
    });

    context('when cursor is within a code block', () => {
      context('when at the end of the code block', () => {
        it('returns code block element', () => {
          const { pluginState } = editor(doc(p('paragraph'), code_block()('codeBlock{<>}')));

          expect(pluginState.element).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the beginning of the code block', () => {
        it('returns code block element', () => {
          const { pluginState } = editor(doc(p('paragraph'), code_block()('{<>}codeBlock')));

          expect(pluginState.element).to.instanceOf(HTMLPreElement);
        });
      });

      context('when at the middle of the code block', () => {
        it('returns code block element', () => {
          const { pluginState } = editor(doc(p('paragraph'), code_block()('code{<>}Block')));

          expect(pluginState.element).to.instanceOf(HTMLPreElement);
        });
      });
    });

    context('when cursor is out of code block', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock')));

        expect(pluginState.element).to.equal(undefined);
      });
    });
  });

  context('clicked', () => {
    context('when click inside code block', () => {
      it('returns true', () => {
        const { plugin, editorView, sel, pluginState } = editor(doc(p('paragraph'), code_block()('code{<>}Block')));

        plugin.props.handleClick(editorView, sel, click);

        expect(pluginState.clicked).to.be.true;
      });
    });

    context('when click outside of code block', () => {
      it('returns false', () => {
        const { plugin, editorView, sel, pluginState } = editor(doc(p('paragraph{<>}'), code_block()('codeBlock')));

        plugin.props.handleClick(editorView, sel, click);

        expect(pluginState.clicked).to.be.false;
      });
    });

    context('when has not been clicked', () => {
      it('returns false', () => {
        const { refs, pluginState, setTextSelection } = editor(doc(p('paragraph'), code_block()('codeB{cbPos}lock')));
        const { cbPos } = refs;

        setTextSelection(cbPos);

        expect(pluginState.clicked).to.be.false;
      });
    });
  });

  context('updateLanguage', () => {
    it('keeps the content', () => {
      const { pluginState, editorView } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousElement = pluginState.element;

      pluginState.updateLanguage('php', editorView);

      const currentElement = pluginState.element;

      expect(previousElement.textContent).to.eq(currentElement.textContent);
    });

    it('can update language to be undefined', () => {
      const { pluginState, editorView } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      pluginState.updateLanguage(undefined, editorView);

      expect(pluginState.language).to.be.undefined;
    });

    it('updates language', () => {
      const { pluginState, editorView } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));

      pluginState.updateLanguage('php', editorView);

      expect(pluginState.language).to.eq('php');
    });

    it('updates the node', () => {
      const { pluginState, editorView } = editor(doc(p('paragraph'), code_block({language: 'java'})('{<>}codeBlock')));
      const previousActiveCodeBlock = pluginState.activeCodeBlock;

      pluginState.updateLanguage('php', editorView);

      const currentActiveCodeBlock = pluginState.activeCodeBlock;

      expect(previousActiveCodeBlock).to.not.eq(currentActiveCodeBlock);
    });
  });

  describe('language', () => {
    it('is the same as activeCodeBlock language', () => {
      const { pluginState } = editor(doc(code_block({language: 'java'})('te{<>}xt')));

      expect(pluginState.language).to.eq('java');
    });

    it('updates if activeCodeBlock updates langugae', () => {
      const { pluginState, editorView } = editor(doc(code_block({language: 'java'})('te{<>}xt')));

      pluginState.updateLanguage('php', editorView);

      expect(pluginState.language).to.eq('php');
    });

    it('sets language to null if no activeCodeBlock', () => {
      const { pluginState } = editor(doc(p('te{<>}xt')));

      expect(pluginState.language).to.be.undefined;
    });
  });
});
