import { commands } from 'ak-editor-prosemirror';
import mocha from 'mocha';
import { chaiPlugin, makeEditor, RewireMock , doc, p, h1, h2, h3, h4, h5, blockquote, code_block, br } from 'ak-editor-test';
import { default as chai, expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import BlockTypePlugin from '../src';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('ak-editor-plugin-block-type', () => {
  const editor = (doc: any) => {
    const { pm, plugin } = makeEditor({ doc, plugin: BlockTypePlugin });
    return { pm, plugin, sel: pm.doc.refs['<>'] };
  };
  const rewireMock = RewireMock();

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const Plugin = BlockTypePlugin as any; // .State is not public API.
    expect(Plugin.State.name).is.be.a('string');
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

    plugin.changeBlockType('quote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be able to change to code block', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('code');
    expect(pm.doc).to.deep.equal(doc(code_block()('text')));
  });

  it('should be able to change to code block with multilines', () => {
    const { pm, plugin } = editor(doc(p('line1{<>}', br, 'line2')));

    plugin.changeBlockType('code');
    expect(pm.doc).to.deep.equal(doc(code_block()('line1\nline2')));
  });

  it('should be able to identify normal', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('normal');
  });

  it('should be able to identify heading1', () => {
    const { pm, plugin } = editor(doc(h1('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading1');
  });

  it('should be able to identify heading2', () => {
    const { pm, plugin } = editor(doc(h2('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading2');
  });

  it('should be able to identify heading3', () => {
    const { pm, plugin } = editor(doc(h3('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('heading3');
  });

  it('should be able to identify block quote', () => {
    const { pm, plugin } = editor(doc(blockquote(p('te{<>}xt'))));
    expect(plugin.currentBlockType.name).to.equal('quote');
  });

  it('should be able to identify code block', () => {
    const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));
    expect(plugin.currentBlockType.name).to.equal('code');
  });

  it('should be able to change to back to paragraph and then change to blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('heading1');
    plugin.changeBlockType('quote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be not able to nest blockquote', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('quote');
    plugin.changeBlockType('quote');
    expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should not be able to change to the same block type', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));

    plugin.changeBlockType('normal');
    expect(pm.doc).to.deep.equal(doc(p('text')));
  });

  it('should not be able to change block types when selecting two nodes', () => {
    const { pm, plugin } = editor(doc(p('li{<}ne1'), p('li{>}ne2')));

    plugin.changeBlockType('heading1');
    expect(pm.doc).to.deep.equal(doc(p('line1'), p('line2')));
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
    const { pm, plugin } = editor(doc(p('text')));
    const spy = sinon.spy();

    plugin.subscribe(spy);

    expect(spy).to.have.been.callCount(1);
    expect(spy).to.have.been.calledWith(plugin);
  });

  it('should be able to subscribe the changes', () => {
    const { pm, plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);
    plugin.changeBlockType('heading1');

    expect(spy).to.have.been.callCount(2);
    expect(spy).to.have.been.calledWith(plugin);
  });

  describe('keymap', () => {
    context('when on a Mac', () => {
      beforeEach(() => {
        rewireMock(BlockTypePlugin, 'browser', {mac: true});
      });

      context('when hits Cmd-Alt-0', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-0");
          expect(toggleBlockType).to.have.been.calledWith('normal');
        });
      });

      context('when hits Cmd-Alt-1', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-1");
          expect(toggleBlockType).to.have.been.calledWith('heading1');
        });
      });

      context('when hits Cmd-Alt-2', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-2");
          expect(toggleBlockType).to.have.been.calledWith('heading2');
        });
      });

      context('when hits Cmd-Alt-3', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-3");
          expect(toggleBlockType).to.have.been.calledWith('heading3');
        });
      });

      context('when hits Cmd-Alt-4', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-4");
          expect(toggleBlockType).to.have.been.calledWith('heading4');
        });
      });

      context('when hits Cmd-Alt-5', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-5");
          expect(toggleBlockType).to.have.been.calledWith('heading5');
        });
      });

      context('when hits Cmd-Alt-7', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-7");
          expect(toggleBlockType).to.have.been.calledWith('quote');
        });
      });

      context('when hits Cmd-Alt-8', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Cmd-Alt-8");
          expect(toggleBlockType).to.have.been.calledWith('code');
        });
      });
    });

    context('when not on a Mac', () => {
      beforeEach(() => {
        rewireMock(BlockTypePlugin, 'browser', {mac: false});
      });

      context('when hits Ctrl-0', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-0");
          expect(toggleBlockType).to.have.been.calledWith('normal');
        });
      });

      context('when hits Ctrl-1', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-1");
          expect(toggleBlockType).to.have.been.calledWith('heading1');
        });
      });

      context('when hits Ctrl-2', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-2");
          expect(toggleBlockType).to.have.been.calledWith('heading2');
        });
      });

      context('when hits Ctrl-3', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-3");
          expect(toggleBlockType).to.have.been.calledWith('heading3');
        });
      });

      context('when hits Ctrl-4', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-4");
          expect(toggleBlockType).to.have.been.calledWith('heading4');
        });
      });

      context('when hits Ctrl-5', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-5");
          expect(toggleBlockType).to.have.been.calledWith('heading5');
        });
      });

      context('when hits Ctrl-7', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-7");
          expect(toggleBlockType).to.have.been.calledWith('quote');
        });
      });

      context('when hits Ctrl-8', () => {
        it('toggles paragraph', () => {
          const { pm, plugin } = editor(doc(p('text')));
          const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

          pm.input.dispatchKey("Ctrl-8");
          expect(toggleBlockType).to.have.been.calledWith('code');
        });
      });

      context('when hits enter', () => {
        it('calls splitCodeBlock', () => {
          const { pm, plugin } = editor(doc(code_block()('text')));
          const splitCodeBlock = sinon.spy(plugin, 'splitCodeBlock');

          pm.input.dispatchKey("Enter");

          expect(splitCodeBlock).to.have.been.callCount(1);
        });
      });

      context('when hits double enter', () => {
        it.skip('exits code block', ()=> {
          const { pm, plugin } = editor(doc(code_block()('text{endPos}')));
          const { endPos } = pm.doc.refs;
          pm.setTextSelection(endPos);

          pm.input.dispatchKey("Enter");
          pm.input.dispatchKey("Enter");

          expect(pm.doc).to.deep.equal(doc(code_block()('text'), p('')));
        });
      });

      context('when hits shift-enter', () => {
        it('calls insertNewLine', () => {
          const { pm, plugin } = editor(doc(code_block()('text')));
          const insertNewLine = sinon.spy(plugin, 'insertNewLine');

          pm.input.dispatchKey("Shift-Enter");

          expect(insertNewLine).to.have.been.callCount(1);
        });
      });
    });
  });

  describe('splitCodeBlock', () => {
    context('when it is a code block', () => {
      context('when last char is a new line', () => {
        context('when cursor is at the end of code block', () => {
          it.skip('removes the last new line char in code block', () => {
            const { pm, plugin } = editor(doc(code_block()('text\n{endPos}')));
            const { endPos } = pm.doc.refs;
            pm.setTextSelection(endPos);

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });

          it('returns false', () => {
            const { pm, plugin } = editor(doc(code_block()('text\n{endPos}')));
            const { endPos } = pm.doc.refs;
            pm.setTextSelection(endPos);

            expect(plugin.splitCodeBlock()).to.be.false;
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{midPos}xt\n')));
            const { midPos } = pm.doc.refs;
            pm.setTextSelection(midPos);

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt\n')));
          });
          
          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('te{midPos}xt\n')));
            const { midPos } = pm.doc.refs;
            pm.setTextSelection(midPos);

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });
      });

      context('when last char is not a new line', () => {
        context('when cursor is at the end of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('text{endPos}')));
            const { endPos } = pm.doc.refs;
            pm.setTextSelection(endPos);

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('text\n')));
          });
          
          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('text{endPos}')));
            const { endPos } = pm.doc.refs;
            pm.setTextSelection(endPos);

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });

        context('when cursor is in the middle of code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('te{midPos}xt')));
            const { midPos } = pm.doc.refs;
            pm.setTextSelection(midPos);

            plugin.splitCodeBlock();

            expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt')));
          });

          it('returns true', () => {
            const { pm, plugin } = editor(doc(code_block()('te{midPos}xt')));
            const { midPos } = pm.doc.refs;
            pm.setTextSelection(midPos);

            expect(plugin.splitCodeBlock()).to.be.true;
          });
        });
      });
    });

    context('when it is not a code block', () => {
      it('returns false', () => {
        const { pm, plugin } = editor(doc(p('text{endPos}')));
        const { endPos } = pm.doc.refs;
        pm.setTextSelection(endPos);

        expect(plugin.splitCodeBlock()).to.be.false;
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
        const { pm, plugin } = editor(doc(code_block()('text')));

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
          const { pm, plugin } = editor(doc(p('text')));

          expect(plugin.insertNewLine()).to.be.true;
        });
      });
    });
  });

  describe('toggleBlockType', () => {
    context('when origin block type is different with target block type', () => {
      it('converts to target block type', () => {
        const { pm, plugin } = editor(doc(p('text')));
        const changeBlockType = sinon.spy(plugin, 'changeBlockType');

        plugin.toggleBlockType('heading1');

        expect(changeBlockType).to.have.been.calledWith('heading1');
      });
    });

    context('when origin block type is the same as target block type', () => {
      context('when it is a quote', () => {
        it('lifts content out of the quote', () => {
          const { pm, plugin } = editor(doc(blockquote(p('text'))));
          const lift = sinon.spy(commands, 'lift');

          plugin.toggleBlockType('heading1');

          expect(lift).to.have.been.calledWith(pm);
        });
      });

      context('when it is not a quote', () => {
        it('converts to a paragraph', () => {
          const { pm, plugin } = editor(doc(h1('text')));
          const changeBlockType = sinon.spy(plugin, 'changeBlockType');

          plugin.toggleBlockType('heading1');

          expect(changeBlockType).to.have.been.calledWith('normal');
        });
      });
    });
  });
});
