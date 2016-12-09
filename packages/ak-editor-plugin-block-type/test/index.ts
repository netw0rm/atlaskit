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

      describe('when hits Cmd-Alt-0', () => {
        context('when selection is not a paragraph', () => {
          it('transforms to a paragraph', () => {
            const { pm, plugin } = editor(doc(h1('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-0");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });

        context('when selection is a paragraph', () => {
          it('keeps it as a paragraph', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-0");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-1', () => {
        context('when selection is not a h1', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-1");
            expect(pm.doc).to.deep.equal(doc(h1('text')));
          });
        });

        context('when selection is a h1', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h1('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-1");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-2', () => {
        context('when selection is not a h2', () => {
          it('transforms to a h2', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-2");
            expect(pm.doc).to.deep.equal(doc(h2('text')));
          });
        });

        context('when selection is a h2', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h2('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-2");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-3', () => {
        context('when selection is not a h3', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-3");
            expect(pm.doc).to.deep.equal(doc(h3('text')));
          });
        });

        context('when selection is a h3', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h3('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-3");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-4', () => {
        context('when selection is not a h4', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-4");
            expect(pm.doc).to.deep.equal(doc(h4('text')));
          });
        });

        context('when selection is a h4', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h4('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-4");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-5', () => {
        context('when selection is not a h5', () => {
          it('transforms to a h5', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-5");
            expect(pm.doc).to.deep.equal(doc(h5('text')));
          });
        });

        context('when selection is a h5', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h5('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-5");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-7', () => {
        context('when selection is not a blockquote', () => {
          it('transforms to a blockquote', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-7");
            expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
          });
        });

        context('when selection is a blockquote', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(blockquote(p('te{<>}xt'))));
            pm.input.dispatchKey("Cmd-Alt-7");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Cmd-Alt-8', () => {
        context('when selection is not a code_block', () => {
          it('transforms to a code_block', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-8");
            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is a code_block', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));
            pm.input.dispatchKey("Cmd-Alt-8");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });
    });

    context('when not on a Mac', () => {
      beforeEach(() => {
        rewireMock(BlockTypePlugin, 'browser', {mac: false});
      });

      describe('Ctrl-0', () => {
        context('when selection is not a paragraph', () => {
          it('transforms to a paragraph', () => {
            const { pm, plugin } = editor(doc(h1('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-0");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });

        context('when selection is a paragraph', () => {
          it('keeps it as a paragraph', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-0");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-1', () => {
        context('when selection is not a h1', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-1");
            expect(pm.doc).to.deep.equal(doc(h1('text')));
          });
        });

        context('when selection is a h1', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h1('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-1");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-2', () => {
        context('when selection is not a h2', () => {
          it('transforms to a h2', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-2");
            expect(pm.doc).to.deep.equal(doc(h2('text')));
          });
        });

        context('when selection is a h2', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h2('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-2");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-3', () => {
        context('when selection is not a h3', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-3");
            expect(pm.doc).to.deep.equal(doc(h3('text')));
          });
        });

        context('when selection is a h3', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h3('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-3");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-4', () => {
        context('when selection is not a h4', () => {
          it('transforms to a h1', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-4");
            expect(pm.doc).to.deep.equal(doc(h4('text')));
          });
        });

        context('when selection is a h4', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h4('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-4");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-5', () => {
        context('when selection is not a h5', () => {
          it('transforms to a h5', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-5");
            expect(pm.doc).to.deep.equal(doc(h5('text')));
          });
        });

        context('when selection is a h5', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(h5('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-5");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      describe('when hits Ctrl-7', () => {
        context('when selection is not a blockquote', () => {
          context('when inside blockquote is a h1', () => {
            it('converts h1 to paragraph and wraps in a blockquote', () => {
              const { pm, plugin } = editor(doc(h1('te{<>}xt')));
              pm.input.dispatchKey("Ctrl-7");
              expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
            });
          });
          
          context('when inside blockquote is a paragraph', () => {
            it('wraps paragraph in a blockquote', () => {
              const { pm, plugin } = editor(doc(p('te{<>}xt')));
              pm.input.dispatchKey("Ctrl-7");
              expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
            });
          });
        });

        context('when selection is a blockquote', () => {
          it('removes blockquote', () => {
            const { pm, plugin } = editor(doc(blockquote(h1('te{h1Pos}xt'), p('he{pPos}llo'))));
            const { h1Pos, pPos } = pm.doc.refs;

            pm.setTextSelection(h1Pos, pPos);
            pm.input.dispatchKey("Ctrl-7");
            expect(pm.doc).to.deep.equal(doc(h1('text'), p('hello')));
          });
        });

        context('when selection is a nested blockquotes', () => {
          it('tranforms outer blockquotes back to a paragraph', () => {
            const { pm, plugin } = editor(doc(blockquote(blockquote(p('te{<>}xt')))));
            pm.input.dispatchKey("Ctrl-7");
            expect(pm.doc).to.deep.equal(doc(blockquote(p('text'))));
          });
        });
      });

      context('when hits Ctrl-8', () => {
        context('when selection is not a code_block', () => {
          it('transforms to a code_block', () => {
            const { pm, plugin } = editor(doc(p('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-8");
            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is a code_block', () => {
          it('tranforms back to a paragraph', () => {
            const { pm, plugin } = editor(doc(code_block()('te{<>}xt')));
            pm.input.dispatchKey("Ctrl-8");
            expect(pm.doc).to.deep.equal(doc(p('text')));
          });
        });
      });

      context('when hits double enter', () => {
        context('when cursor is in the middle of code block', () => {
          it('does not exit code block', () => {
            const { pm, plugin } = editor(doc(code_block()('te{middlePos}xt')));
            const { middlePos } = pm.doc.refs;

            pm.setTextSelection(middlePos);

            pm.input.dispatchKey("Enter");
            pm.input.dispatchKey("Enter");

            expect(pm.doc).to.deep.equal(doc(code_block()('te\n\nxt')));
          });
        });
      });

      context('when hits enter', () => {
        context('when at the end is a new line', () => {
          context('when cursor is at the end', () => {
            it('exits code block', () => {
              const { pm, plugin } = editor(doc(code_block()('text\n{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('text'), p('')));
            });
          });

          context('when selection is in the middle', () => {
            it('inserts a new line', () => {
              const { pm, plugin } = editor(doc(code_block()('te{middlePos}xt\n')));
              const { middlePos } = pm.doc.refs;

              pm.setTextSelection(middlePos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt\n')));
            });
          });

          context('when selection is not empty', () => {
            it('inserts a new line', () => {
              const { pm, plugin } = editor(doc(code_block()('text\nY{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos-1, endPos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('text\n\n')));
            });
          });
        });

        context('when at the end is not a new line', ()=> {
          context('when cursor is at the end', () => {
            it('inserts a new line', () => {
              const { pm, plugin } = editor(doc(code_block()('text{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('text\n')));
            });
          });

          context('when selection is in the middle', () => {
            it('inserts a new line', () => {
              const { pm, plugin } = editor(doc(code_block()('te{middlePos}xt')));
              const { middlePos } = pm.doc.refs;

              pm.setTextSelection(middlePos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('te\nxt')));
            });
          });

          context('when selection is not empty', () => {
            it('inserts a new line', () => {
              const { pm, plugin } = editor(doc(code_block()('textY{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos-1, endPos);

              pm.input.dispatchKey("Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('text\n')));
            });
          });
        });
      })

      context('when hits shift-enter', () => {
        context('when cursor is within a code block', () => {
          it('inserts a new line', () => {
            const { pm, plugin } = editor(doc(code_block()('text{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Shift-Enter");

              expect(pm.doc).to.deep.equal(doc(code_block()('text\n')));
          });
        });

        context('when cursor is within a heading', () => {
          it('inserts a hard break', () => {
            const { pm, plugin } = editor(doc(h1('text{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Shift-Enter");

              expect(pm.doc).to.deep.equal(doc(h1('text', br)));
          });
        });

        context('when cursor is within a paragraph', () => {
          it('inserts a hard break', () => {
            const { pm, plugin } = editor(doc(p('text{endPos}')));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Shift-Enter");

              expect(pm.doc).to.deep.equal(doc(p('text', br)));
          });
        });

        context('when cursor is within a blockquote', () => {
          it('inserts a hard break', () => {
            const { pm, plugin } = editor(doc(blockquote(p('text{endPos}'))));
              const { endPos } = pm.doc.refs;

              pm.setTextSelection(endPos);

              pm.input.dispatchKey("Shift-Enter");

              expect(pm.doc).to.deep.equal(doc(blockquote(p('text', br))));
          });
        });
      })
    });
  });
});
