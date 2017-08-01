import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import {
  blockquote,
  br,
  chaiPlugin,
  code_block,
  panel,
  doc,
  h1,
  h2,
  h3,
  h4,
  h5,
  img,
  makeEditor,
  mention,
  p,
  ul,
  li,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import blockTypePlugins, { BlockTypeState } from '../../../../src/plugins/block-type';
import { setTextSelection } from '../../../../src/utils';

chai.use(chaiPlugin);

describe('block-type', () => {
  const editor = (doc: any) => makeEditor<BlockTypeState>({
    doc,
    plugins: blockTypePlugins(defaultSchema),
  });

  it('should be able to change to normal', () => {
    const { editorView, pluginState } = editor(doc(h1('te{<>}xt')));

    pluginState.toggleBlockType('normal', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(p('text')));
  });

  it('should be able to change to heading1', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('heading1', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h1('text')));
  });

  it('should be able to change to heading2', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('heading2', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h2('text')));
  });

  it('should be able to change to heading3', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('heading3', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h3('text')));
  });

  it('should be able to change to heading4', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('heading4', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h4('text')));
  });

  it('should be able to change to heading5', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('heading5', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h5('text')));
  });

  it('should be able to change to block quote', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  context('when rendering a block quote', () => {
    it('should not be selectable', () => {
      const { editorView } = editor(doc(blockquote(p('{<>}text'))));
      const node = editorView.state.doc.nodeAt(0);

      if (node) {
        expect(node.type.spec.selectable).to.equal(false);
      }
    });
  });

  describe('code block', () => {
    it('should be able to change to code block', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

      pluginState.toggleBlockType('codeblock', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
    });

    it('should merge paragraphs while creating code blocks code block', () => {
      const { editorView, pluginState } = editor(doc(p('{<}text'), p('text'), p('text{>}')));

      pluginState.toggleBlockType('codeblock', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('text\ntext\ntext')));
    });

    it('should be able to change to code block with multilines', () => {
      const { editorView, pluginState } = editor(
        doc(p(
          'line1{<>}',
          img({ src: 'url', alt: 'text', title: 'text' }),
          ' ',
          br,
          'line2 ',
          br)));

      pluginState.toggleBlockType('codeblock', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('line1 \nline2 \n')));
    });

    it('should be able to change to code block with image and multiple blocks', () => {
      const { editorView, pluginState } = editor(
        doc(p(
          '{<}line1',
          img({ src: 'url', alt: 'text', title: 'text' })
        ), p('line2{>}')));

      pluginState.toggleBlockType('codeblock', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('line1\nline2')));
    });


    it('should be able to preserve mention text', () => {
      const { editorView, pluginState } = editor(
        doc(p(
          'hello ',
          mention({ id: 'foo1', text: '@bar1' }),
          img({ src: 'url', alt: 'text', title: 'text' }),
          ' & ',
          mention({ id: 'foo2', text: '@bar2' }),
          ' & ',
          mention({ id: 'foo3', text: '@bar3' }),
        )));

      pluginState.toggleBlockType('codeblock', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello @bar1 & @bar2 & @bar3')));
    });

    it('should be able to preserve mention text when converting multiple blocks to code block', () => {
      const { editorView, pluginState } = editor(
        doc(p(
          '{<}hello ',
          mention({ id: 'foo1', text: '@bar1' })
        ), p('text{>}')));

      pluginState.toggleBlockType('codeblock', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello @bar1\ntext')));
    });

    it('should collaps nested block and convert to code block', () => {
      const { editorView, pluginState } = editor(
        doc(blockquote(
          h1('h1')
        ))
      );

      pluginState.toggleBlockType('codeblock', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('h1')));
    });

    it('should split code block when converting to normal text with partial selection', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}test\ntest{>}\ntest\ntest')));

      pluginState.toggleBlockType('normal', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('test\ntest'), code_block()('test\ntest')));
    });

    it('should split code block when converting to normal text with collapsed selection in starting of code block', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<>}test\ntest\ntest\ntest')));

      pluginState.toggleBlockType('normal', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('test'), code_block()('test\ntest\ntest')));
    });

    it('should split code block when converting to normal text with collapsed selection in end of code block', () => {
      const { editorView, pluginState } = editor(doc(code_block()('test\ntest\ntest\ntest{<>}')));

      pluginState.toggleBlockType('normal', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('test\ntest\ntest'), p('test')));
    });

    it('should split code block when converting to heading1 with partial selection', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}test\ntest{>}\ntest\ntest')));

      pluginState.toggleBlockType('heading1', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(h1('test\ntest'), code_block()('test\ntest')));
    });

    it('should split code block when converting to heading1 with partial selection in middle of code block', () => {
      const { editorView, pluginState } = editor(doc(code_block()('test\n{<}test\ntest{>}\ntest')));

      pluginState.toggleBlockType('heading1', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('test'), h1('test\ntest'), code_block()('test')));
    });

    it('should split code block when converting to block-quote with partial selection', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}test\ntest{>}\ntest\ntest')));

      pluginState.toggleBlockType('blockquote', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('test\ntest')), code_block()('test\ntest')));
    });

    it('should split code block when converting to block-quote with collapsed selection', () => {
      const { editorView, pluginState } = editor(doc(code_block()('test\nt{<>}est\ntest\ntest')));

      pluginState.toggleBlockType('blockquote', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('test'), blockquote(p('test')), code_block()('test\ntest')));
    });

    it('should split code block when converting to panel with partial selection', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}test\ntest{>}\ntest\ntest')));

      pluginState.toggleBlockType('panel', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(panel(p('test\ntest')), code_block()('test\ntest')));
    });

    it('should split code block when converting to panel with partial selection at end of code block', () => {
      const { editorView, pluginState } = editor(doc(code_block()('test\ntest\n{<}test\ntest{>}')));

      pluginState.toggleBlockType('panel', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('test\ntest'), panel(p('test\ntest'))));
    });
  });

  it('should be able to identify normal', () => {
    const { pluginState } = editor(doc(p('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('normal');
  });

  it('should set isCodeBlock true for codeBlock', () => {
    const { pluginState } = editor(doc(code_block()('te{<>}xt')));
    expect(pluginState.isCodeBlock).to.equal(true);
  });

  it('should have all of the present blocks type panel, blockQuote, codeBlock in availableWrapperBlockTypes', () => {
    const { pluginState } = editor(doc(panel(blockquote(code_block()('te{<>}xt')))));
    expect(pluginState.availableWrapperBlockTypes.length).to.equal(3);
    expect(pluginState.availableWrapperBlockTypes.some(blockType => blockType.name === 'panel')).to.equal(true);
    expect(pluginState.availableWrapperBlockTypes.some(blockType => blockType.name === 'codeblock')).to.equal(true);
    expect(pluginState.availableWrapperBlockTypes.some(blockType => blockType.name === 'blockquote')).to.equal(true);
  });

  it('should be able to identify normal even if there are multiple blocks', () => {
    const { pluginState } = editor(doc(p('te{<}xt'), p('text'), p('te{>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('normal');
  });

  it('should set currentBlockType to Other if there are blocks of multiple types', () => {
    const { pluginState } = editor(doc(p('te{<}xt'), h1('text'), p('te{>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('other');
  });

  it('should be able to identify heading1', () => {
    const { pluginState } = editor(doc(h1('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('heading1');
  });

  it('should be able to identify heading2', () => {
    const { pluginState } = editor(doc(h2('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('heading2');
  });

  it('should be able to identify heading3', () => {
    const { pluginState } = editor(doc(h3('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('heading3');
  });

  it('should be able to identify code block', () => {
    const { pluginState } = editor(doc(code_block()('te{<>}xt')));
    expect(pluginState.isCodeBlock).to.equal(true);
  });

  it('should be able to change to back to paragraph and then change to blockquote', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
    pluginState.toggleBlockType('heading1', editorView);
    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be able to deactivate blockquote after applying two times', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
    pluginState.toggleBlockType('blockquote', editorView);
    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(p('text')));
  });

  it('should not be able to change to the same block type', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('normal', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(p('text')));
  });

  it('should be able to change block types when selecting two nodes', () => {
    const { editorView, pluginState } = editor(doc(p('li{<}ne1'), p('li{>}ne2')));

    pluginState.toggleBlockType('heading1', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(h1('line1'), h1('line2')));
  });

  it('should be able to change multiple paragraphs into one blockquote', () => {
    const { editorView, pluginState } = editor(doc(p('li{<}ne1'), p('li{>}ne2'), p('li{>}ne3')));

    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('li{<}ne1'), p('li{>}ne2'), p('li{>}ne3'))));
  });

  it('should nest blocks when calling insertBlocktype multiple times', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}st')));

    pluginState.insertBlockType('blockquote', editorView);
    pluginState.insertBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(blockquote(p('test')))));
  });

  it('should change state when selecting different block types', () => {
    const { editorView, refs, pluginState } = editor(doc(h1('te{h1Pos}xt'), p('te{pPos}xt')));
    const { h1Pos, pPos } = refs;

    setTextSelection(editorView, h1Pos);
    expect(pluginState.currentBlockType.name).to.equal('heading1');

    setTextSelection(editorView, pPos);
    expect(pluginState.currentBlockType.name).to.equal('normal');
  });

  it('should get current state immediately once subscribed', () => {
    const { pluginState } = editor(doc(p('text')));
    const spy = sinon.spy();

    pluginState.subscribe(spy);

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(pluginState)).to.equal(true);
  });

  it('should be able to subscribe the changes', () => {
    const { pluginState, editorView } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    pluginState.subscribe(spy);
    pluginState.toggleBlockType('heading1', editorView);

    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith(pluginState)).to.equal(true);
  });

  describe('toggleBlockType', () => {
    context('when origin block type is different with target block type', () => {
      it('converts to target block type', () => {
        const { pluginState, editorView } = editor(doc(p('text')));
        const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

        pluginState.toggleBlockType('heading1', editorView);

        expect(toggleBlockType.calledWith('heading1', editorView)).to.equal(true);
      });
    });

    context('when parent item is a list', () => {
      it('wraps paragraph to heading', () => {
        const { editorView, pluginState } = editor(doc(ul(li(p('t{<}ex{>}t')))));
        pluginState.toggleBlockType('heading1', editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ul(li(h1('t{<}ex{>}t')))));
      });

      it('wraps paragraph in block-quote', () => {
        const { editorView, pluginState } = editor(doc(ul(li(p('t{<}ex{>}t')))));
        pluginState.toggleBlockType('blockquote', editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ul(li(blockquote(p('t{<}ex{>}t'))))));
      });

      it('wraps paragraph in panel', () => {
        const { editorView, pluginState } = editor(doc(ul(li(p('t{<}ex{>}t')))));
        pluginState.toggleBlockType('panel', editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ul(li(panel(p('t{<}ex{>}t'))))));
      });
    });

    context('when origin block type is the same as target block type', () => {
      context('when it is a quote', () => {
        it('lifts content out of the quote', () => {
          const { editorView, pluginState } = editor(doc(blockquote(p('text'))));

          pluginState.toggleBlockType('heading1', editorView);
          expect(editorView.state.doc).to.deep.equal(doc(h1('text')));
        });
      });

      context('when it is not a quote', () => {
        it('converts to a paragraph', () => {
          const { pluginState, editorView } = editor(doc(h1('text')));

          pluginState.toggleBlockType('heading1', editorView);
          expect(editorView.state.doc).to.deep.equal(doc(p('text')));
        });
      });
    });
  });
});
