import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { browser } from '../../../src';
import { blockquote, br, chaiPlugin, code_block, doc, h1, h2, h3, h4, h5, makeEditor, mention, p } from '../../../test-helper';

import BlockTypePlugin from '../../../src/plugins/block-type';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe('block-type', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: BlockTypePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = BlockTypePlugin as any; // .State is not public API.
    expect(plugin.State.name).is.be.a('string');
  });

  it('should be able to change to normal', () => {
    const { pm, plugin } = editor(doc(h1('te{<>}xt')));

    plugin.changeBlockType('normal');
    expect(pm.doc).to.deep.equal(doc(p('text')));
  });

  it('should be able to change to heading1', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading1');
    expect(pm.doc).to.deep.equal(doc(h1('text')));
  });

  it('should be able to change to heading2', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading2');
    expect(pm.doc).to.deep.equal(doc(h2('text')));
  });

  it('should be able to change to heading3', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading3');
    expect(pm.doc).to.deep.equal(doc(h3('text')));
  });

  it('should be able to change to heading4', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading4');
    expect(pm.doc).to.deep.equal(doc(h4('text')));
  });

  it('should be able to change to heading5', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading5');
    expect(pm.doc).to.deep.equal(doc(h5('text')));
  });

  it('should be able to change to block quote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('blockquote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  describe('code block', () => {
    it('should be able to change to code block', () => {
      const { pm, plugin } = editor(doc(p('te{<>}xt')));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('text')));
    });

    it('should be able to change to code block with multilines', () => {
      const { pm, plugin } = editor(doc(p('line1{<>}', br, 'line2')));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('line1\nline2')));
    });

    it('should be able to preserve mention text', () => {
      const { pm, plugin } = editor(doc(p('hello ', mention({ id: '@bar', displayName: 'foo bar' }))));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('hello foo bar')));
    });
  });

  it('should be able to identify normal', () => {
    const { plugin } = editor(doc(p('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('normal');
  });

  it('should be able to identify heading1', () => {
    const { plugin } = editor(doc(h1('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading1');
  });

  it('should be able to identify heading2', () => {
    const { plugin } = editor(doc(h2('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading2');
  });

  it('should be able to identify heading3', () => {
    const { plugin } = editor(doc(h3('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading3');
  });

  it('should be able to identify block quote', () => {
    const { plugin } = editor(doc(blockquote(p('te{<>}xt'))));
    expect(plugin.currentBlockType.name).to.equal('blockquote');
  });

  it('should be able to identify code block', () => {
    const { plugin } = editor(doc(code_block()('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('codeblock');
  });

  it('should be able to change to back to paragraph and then change to blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading1');
    plugin.changeBlockType('blockquote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be not able to nest blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('blockquote');
    plugin.changeBlockType('blockquote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should not be able to change to the same block type', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('normal');
    expect(pm.doc).to.deep.equal(doc(p('text')));
  });

  it('should be able to change block types when selecting two nodes', () => {
    const { pm, plugin } = editor(doc(p('li{<}ne1'), p('li{>}ne2')));

    plugin.changeBlockType('heading1');
    expect(pm.doc).to.deep.equal(doc(h1('line1'), h1('line2')));
  });

  it('should be able to change multiple paragraphs into one blockquote', () => {
    const { pm, plugin } = editor(doc(p('li{<}ne1'), p('li{>}ne2'), p('li{>}ne3')));

    plugin.changeBlockType('blockquote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('li{<}ne1'), p('li{>}ne2'), p('li{>}ne3'))));
  });

  it('should change state when selecting different block types', () => {
    const { pm, plugin } = editor(doc(h1('te{h1Pos}xt'), p('te{pPos}xt')));
    const { h1Pos, pPos } = pm.doc.refs;

    pm.setTextSelection(h1Pos);
    expect(plugin.currentBlockType.name).to.equal('heading1');

    pm.setTextSelection(pPos);
    expect(plugin.currentBlockType.name).to.equal('normal');
  });

  it('should get current state immediately once subscribed', () => {
    const { plugin } = editor(doc(p('text')));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
    expect(spy).to.have.been.calledWith(plugin);
  });

  it('should be able to subscribe the changes', () => {
    const { plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);
    plugin.changeBlockType('heading1');

    expect(spy).to.have.been.callCount(2);
    expect(spy).to.have.been.calledWith(plugin);
  });

  describe('keymap', () => {
    if (browser.mac) {
      context('when on a Mac', () => {
        context('when hits Cmd-Alt-0', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-0');
            expect(toggleBlockType).to.have.been.calledWith('normal');
          });
        });

        context('when hits Cmd-Alt-1', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-1');
            expect(toggleBlockType).to.have.been.calledWith('heading1');
          });
        });

        context('when hits Cmd-Alt-2', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-2');
            expect(toggleBlockType).to.have.been.calledWith('heading2');
          });
        });

        context('when hits Cmd-Alt-3', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-3');
            expect(toggleBlockType).to.have.been.calledWith('heading3');
          });
        });

        context('when hits Cmd-Alt-4', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-4');
            expect(toggleBlockType).to.have.been.calledWith('heading4');
          });
        });

        context('when hits Cmd-Alt-5', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-5');
            expect(toggleBlockType).to.have.been.calledWith('heading5');
          });
        });

        context('when hits Cmd-Alt-7', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-7');
            expect(toggleBlockType).to.have.been.calledWith('blockquote');
          });
        });

        context('when hits Cmd-Alt-8', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-8');
            expect(toggleBlockType).to.have.been.calledWith('codeblock');
          });
        });
      });
    } else {
      context('when not on a Mac', () => {
        context('when hits Ctrl-0', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-0');
            expect(toggleBlockType).to.have.been.calledWith('normal');
          });
        });

        context('when hits Ctrl-1', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-1');
            expect(toggleBlockType).to.have.been.calledWith('heading1');
          });
        });

        context('when hits Ctrl-2', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-2');
            expect(toggleBlockType).to.have.been.calledWith('heading2');
          });
        });

        context('when hits Ctrl-3', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-3');
            expect(toggleBlockType).to.have.been.calledWith('heading3');
          });
        });

        context('when hits Ctrl-4', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-4');
            expect(toggleBlockType).to.have.been.calledWith('heading4');
          });
        });

        context('when hits Ctrl-5', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-5');
            expect(toggleBlockType).to.have.been.calledWith('heading5');
          });
        });

        context('when hits Ctrl-7', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-7');
            expect(toggleBlockType).to.have.been.calledWith('blockquote');
          });
        });

        context('when hits Ctrl-8', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-8');
            expect(toggleBlockType).to.have.been.calledWith('codeblock');
          });
        });
      });
    }

    context('when hits shift-enter', () => {
      it('calls insertNewLine', () => {
        const { pm, plugin } = editor(doc(code_block()('text')));
        const insertNewLine = sinon.spy(plugin, 'insertNewLine');

        pm.input.dispatchKey('Shift-Enter');

        expect(insertNewLine).to.have.been.callCount(1);
      });
    });
  });

  describe('insertNewLine', () => {
    context('when it is a code block', () => {
      it('inserts a new line', () => {
        const { pm, plugin } = editor(doc(code_block()('text')));

        plugin.insertNewLine();

        expect(pm.doc).to.deep.equal(doc(code_block()('\ntext')));
      });

      it('returns true', () => {
        const { plugin } = editor(doc(code_block()('text')));

        expect(plugin.insertNewLine()).to.be.true;
      });
    });

    context('when it is not a code block', () => {
      context('when hard break is available', () => {
        it('inserts a hard break', () => {
          const { pm, plugin } = editor(doc(p('text')));

          plugin.insertNewLine();

          expect(pm.doc).to.deep.equal(doc(p(br, 'text')));
        });

        it('returns true', () => {
          const { plugin } = editor(doc(p('text')));

          expect(plugin.insertNewLine()).to.be.true;
        });
      });
    });
  });

  describe('toggleBlockType', () => {
    context('when origin block type is different with target block type', () => {
      it('converts to target block type', () => {
        const { plugin } = editor(doc(p('text')));
        const changeBlockType = sinon.spy(plugin, 'changeBlockType');

        plugin.toggleBlockType('heading1');

        expect(changeBlockType).to.have.been.calledWith('heading1');
      });
    });

    context('when origin block type is the same as target block type', () => {
      context('when it is a quote', () => {
        it('lifts content out of the quote', () => {
          const { pm, plugin } = editor(doc(blockquote(p('text'))));

          plugin.toggleBlockType('heading1');
          expect(pm.doc).to.deep.equal(doc(h1('text')));
        });
      });

      context('when it is not a quote', () => {
        it('converts to a paragraph', () => {
          const { plugin } = editor(doc(h1('text')));
          const changeBlockType = sinon.spy(plugin, 'changeBlockType');

          plugin.toggleBlockType('heading1');

          expect(changeBlockType).to.have.been.calledWith('normal');
        });
      });
    });
  });

  describe('changeContext', () => {
    it('reverts to "default" in case the context is not defined', () => {
      const { plugin } = editor(doc(p('text')));
      expect(plugin.context).to.eq('default');
      plugin.changeContext('!!!%%%UNDEFINED CONTEXT%%%!!!');
      expect(plugin.context).to.eq('default');
    });
  });
});
