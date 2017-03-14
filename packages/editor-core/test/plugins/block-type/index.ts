import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { browser } from '../../../src';
import { setTextSelection, setNodeSelection, sendKeyToPm, fixtures, blockquote, br, chaiPlugin, code_block, doc, h1, h2, h3, h4, h5, img, makeEditor, mention, p, hr } from '../../../test-helper';

import BlockTypePlugin from '../../../src/plugins/block-type';

chai.use(chaiPlugin);

describe('block-type', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: BlockTypePlugin,
    place: fixture()
  });

  it('defines a name for use by the ProseMirror plugin registry ', () => {
    const plugin = BlockTypePlugin as any; // .State is not public API.
    expect(plugin.key).is.be.a('string');
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
        expect(node.type.spec.selectable).to.be.false;
      }
    });
  });

  describe('code block', () => {
    it('should be able to change to code block', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

      pluginState.toggleBlockType('codeblock', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
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

    it('should be able to preserve mention text', () => {
      const { editorView, pluginState } = editor(
        doc(p(
          'hello ',
          mention({ id: 'foo1', displayName: '@bar1' }),
          img({ src: 'url', alt: 'text', title: 'text' }),
          ' & ',
          mention({ id: 'foo2', displayName: '@bar2' }),
          ' & ',
          mention({ id: 'foo3', displayName: '@bar3' }),
        )));

      pluginState.toggleBlockType('codeblock', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello @bar1 & @bar2 & @bar3')));
    });

    it('should collaps nested block and convert to code block', () => {
      const {editorView, pluginState} = editor(
        doc(blockquote(
          h1('h1')
        ))
      );

      pluginState.toggleBlockType('codeblock', editorView);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('h1')));
    });
  });

  it('should be able to identify normal', () => {
    const { pluginState } = editor(doc(p('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('normal');
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

  it('should be able to identify block quote', () => {
    const { pluginState } = editor(doc(blockquote(p('te{<>}xt'))));
    expect(pluginState.currentBlockType.name).to.equal('blockquote');
  });

  it('should be able to identify code block', () => {
    const { pluginState } = editor(doc(code_block()('te{<>}xt')));
    expect(pluginState.currentBlockType.name).to.equal('codeblock');
  });

  it('should be able to change to back to paragraph and then change to blockquote', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
    pluginState.toggleBlockType('heading1', editorView);
    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be not able to nest blockquote', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    pluginState.toggleBlockType('blockquote', editorView);
    pluginState.toggleBlockType('blockquote', editorView);
    expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'))));
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

  describe('keymap', () => {
    if (browser.mac) {
      context('when on a Mac', () => {
        context('when hits Cmd-Alt-0', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-0');
            expect(toggleBlockType.calledWith('normal')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-1', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-1');
            expect(toggleBlockType.calledWith('heading1')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-2', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-2');
            expect(toggleBlockType.calledWith('heading2')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-3', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-3');
            expect(toggleBlockType.calledWith('heading3')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-4', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-4');
            expect(toggleBlockType.calledWith('heading4')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-5', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-5');
            expect(toggleBlockType.calledWith('heading5')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-7', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-7');
            expect(toggleBlockType.calledWith('blockquote')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-8', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Cmd-Alt-8');
            expect(toggleBlockType.calledWith('codeblock')).to.equal(true);
          });
        });
      });
    } else {
      context('when not on a Mac', () => {
        context('when hits Ctrl-0', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-0');
            expect(toggleBlockType.calledWith('normal')).to.equal(true);
          });
        });

        context('when hits Ctrl-1', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-1');
            expect(toggleBlockType.calledWith('heading1')).to.equal(true);
          });
        });

        context('when hits Ctrl-2', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-2');
            expect(toggleBlockType.calledWith('heading2')).to.equal(true);
          });
        });

        context('when hits Ctrl-3', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-3');
            expect(toggleBlockType.calledWith('heading3')).to.equal(true);
          });
        });

        context('when hits Ctrl-4', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-4');
            expect(toggleBlockType.calledWith('heading4')).to.equal(true);
          });
        });

        context('when hits Ctrl-5', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-5');
            expect(toggleBlockType.calledWith('heading5')).to.equal(true);
          });
        });

        context('when hits Ctrl-7', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-7');
            expect(toggleBlockType.calledWith('blockquote')).to.equal(true);
          });
        });

        context('when hits Ctrl-8', () => {
          it('toggles paragraph', () => {
            const { editorView, pluginState } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

            sendKeyToPm(editorView, 'Ctrl-8');
            expect(toggleBlockType.calledWith('codeblock')).to.equal(true);
          });
        });
      });
    }

    context('when hits enter', () => {
      context('when it matches fence format', () => {
        context('when it is already inside a code block', () => {
          it('does not create another code block', () => {
            const { editorView } = editor(doc(code_block()('```{<>}')));

            sendKeyToPm(editorView, 'Enter');

            expect(editorView.state.doc).to.deep.equal(doc(code_block()('```'), p('')));
          });
        });

        context('when it is not inside a code block', () => {
          context('when langauge is provided', () => {
            it('returns code block with language', () => {
              const { editorView } = editor(doc(p('```javascript{<>}')));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(code_block({language: 'javascript'})('')));
            });

            it('trims the spaces', () => {
              const { editorView } = editor(doc(p('```javascript    {<>}   hello ', mention({ id: 'foo1', displayName: '@bar1' }))));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(code_block({language: 'javascript'})('   hello @bar1')));
            });
          });

          context('when langauge is not provided', () => {
            it('returns code block without language', () => {
              const { editorView } = editor(doc(p('```{<>}')));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(code_block()('')));
            });

            it('trims the spaces', () => {
              const { editorView } = editor(doc(p('```    {<>}   hello')));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(code_block()('   hello')));
            });

            it('does not convert to code block if it does not start with fence', () => {
              const { editorView } = editor(doc(p('hello```    {<>}   hello')));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(p('hello```    '), p('   hello')));
            });
          });

          context('on a nested structure', () => {
            it('converts to code block', () => {
              const { editorView } = editor(doc(blockquote(p('```{<>}'))));

              sendKeyToPm(editorView, 'Enter');

              expect(editorView.state.doc).to.deep.equal(doc(blockquote(code_block()(''))));
            });
          });
        });
      });
    });

    context('Shift-Backspace', () => {
      it('should call delete last character', function () {
        if (browser.ios) {
          // Shift-Backspace doesn't work on Safari 9.
          return this.skip();
        }

        const { editorView } = editor(doc(p('Hello World!{<>}')));

        sendKeyToPm(editorView, 'Shift-Backspace');
        expect(editorView.state.doc).to.deep.equal(doc(p('Hello World')));
      });
    });

    context('when hits up', () => {
      context('when on a text block', () => {
        context('when selection is not empty', () => {
          it('does not create a new paragraph above', () => {
            const { editorView } = editor(doc(code_block()('{<}te{>}xt')));

            sendKeyToPm(editorView, 'Up');

            expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is empty', () => {
          context('on a non nested structure', () => {
            context('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph above', () => {
                const { editorView } = editor(doc(code_block()('te{<>}xt')));

                sendKeyToPm(editorView, 'Up');

                expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
              });
            });

            context('when cursor is at the beginning of the second block node', () => {
              it('does not create a new paragraph above', () => {
                const { editorView } = editor(doc(p('text'), code_block()('{<>}text')));

                sendKeyToPm(editorView, 'Up');

                expect(editorView.state.doc).to.deep.equal(doc(p('text'), code_block()('text')));
              });
            });

            context('when cursor is at the beginning of the whole content', () => {
              it('creates a new paragraph above', () => {
                const { editorView } = editor(doc(code_block()('{<>}text')));

                sendKeyToPm(editorView, 'Up');

                expect(editorView.state.doc).to.deep.equal(doc(p(''), code_block()('text')));
              });

              it('does not ignore @mention', () => {

                const { editorView } = editor(doc(p(mention({ id: 'foo1', displayName: '@bar1' }))));

                sendKeyToPm(editorView, 'Up');

                expect(editorView.state.doc).to.deep.equal(doc(p(''), p(mention({ id: 'foo1', displayName: '@bar1' }))));
              });
            });
          });

          context('on a nested structure', () => {
            context('when cursor is at the beginning of the nested structure', () => {
              context('when there is still content before the nested block', () => {
                it('does not create a new paragraph above', () => {
                  const { editorView } = editor(doc(p('text'), blockquote(p('{<>}text'))));

                  sendKeyToPm(editorView, 'Up');


                  expect(editorView.state.doc).to.deep.equal(doc(p('text'), blockquote(p('text'))));
                });
              });

              context('when there is no more content before the nested block', () => {
                it('creates a new paragraph above', () => {
                  const { editorView } = editor(doc(blockquote(p('{<>}text'))));

                  sendKeyToPm(editorView, 'Up');

                  expect(editorView.state.doc).to.deep.equal(doc(p(''), blockquote(p('text'))));
                });
              });
            });
          });
        });
      });

      context('when on a node selection', () => {
        context('on a non nested structure', () => {
          context('when selection is in the middle of the content', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(doc(p('text'), hr, code_block()('{<>}text')));
              setNodeSelection(editorView, sel - 1);

              sendKeyToPm(editorView, 'Up');

              expect(editorView.state.doc).to.deep.equal(doc(p('text'), hr, code_block()('text')));
            });
          });

          context('when selection is at the beginning of the content', () => {
            it('creates a new paragraph above', () => {
              const { editorView } = editor(doc(hr, code_block()('text')));
              setNodeSelection(editorView, 0);

              sendKeyToPm(editorView, 'Up');

              expect(editorView.state.doc).to.deep.equal(doc(p(''), hr, code_block()('text')));
            });
          });
        });

        context('on a nested structure', () => {
          context('when there is more content before the nested block', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(doc(p('text'), blockquote(hr, code_block()('{<>}text'))));
              setNodeSelection(editorView, sel - 1);

              sendKeyToPm(editorView, 'Up');

              expect(editorView.state.doc).to.deep.equal(doc(p('text'), blockquote(hr, code_block()('text'))));
            });
          });

          context('when there is no more content before the nested block', () => {
            it('creates a new paragraph above', () => {
              const { editorView } = editor(doc(blockquote(hr, code_block()('{<>}text'))));
              setNodeSelection(editorView, 1);

              sendKeyToPm(editorView, 'Up');

              expect(editorView.state.doc).to.deep.equal(doc(p(''), blockquote(hr, code_block()('text'))));
            });
          });
        });
      });
    });

    context('when hits down', () => {
      context('when on a text block', () => {
        context('when selection is not empty', () => {
          it('does not create a new paragraph below', () => {
            const { editorView } = editor(doc(code_block()('te{<}xt{>}')));

            sendKeyToPm(editorView, 'Down');

            expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is empty', () => {
          context('on a non nested structure', () => {
            context('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph below', () => {
                const { editorView } = editor(doc(code_block()('te{<>}xt')));

                sendKeyToPm(editorView, 'Down');

                expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
              });
            });

            context('when cursor is at the end of the second last block node', () => {
              it('does not create a new paragraph below', () => {
                const { editorView } = editor(doc(code_block()('text{<>}'), p('text')));

                sendKeyToPm(editorView, 'Down');

                expect(editorView.state.doc).to.deep.equal(doc(code_block()('text'), p('text')));
              });
            });

            context('when cursor is at the end of the whole content', () => {
              it('creates a new paragraph below', () => {
                const { editorView } = editor(doc(code_block()('text{<>}')));

                sendKeyToPm(editorView, 'Down');

                expect(editorView.state.doc).to.deep.equal(doc(code_block()('text'), p('')));
              });
            });
          });

          context('on a nested structure', () => {
            context('when cursor is at the end of the nested structure', () => {
              context('when there is still content after the nested block', () => {
                it('does not create a new paragraph below', () => {
                  const { editorView } = editor(doc(blockquote(p('text{<>}')), p('text')));

                  sendKeyToPm(editorView, 'Down');


                  expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text')), p('text')));
                });
              });

              context('when there is no more content before the nested block', () => {
                it('creates a new paragraph below', () => {
                  const { editorView } = editor(doc(blockquote(p('text{<>}'))));

                  sendKeyToPm(editorView, 'Down');

                  expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text')), p('')));
                });
              });
            });
          });
        });
      });

      context('when on a node selection', () => {
        context('on a non nested structure', () => {
          context('when selection is in the middle of the content', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(doc(p('text{<>}'), hr, code_block()('text')));
              setNodeSelection(editorView, sel + 1);

              sendKeyToPm(editorView, 'Down');

              expect(editorView.state.doc).to.deep.equal(doc(p('text'), hr, code_block()('text')));
            });
          });

          context('when selection is at the end of the content', () => {
            it('creates a new paragraph below', () => {
              const { editorView, sel } = editor(doc(code_block()('text{<>}'), hr));
              setNodeSelection(editorView, sel + 1);

              sendKeyToPm(editorView, 'Down');

              expect(editorView.state.doc).to.deep.equal(doc(code_block()('text'), hr, p('')));
            });
          });
        });

        context('on a nested structure', () => {
          context('when there is more content after the nested block', () => {
            it('does not create a paragraph', () => {
              const { editorView, sel } = editor(doc(blockquote(hr, code_block()('{<>}text')), p('text')));
              setNodeSelection(editorView, sel - 1);

              sendKeyToPm(editorView, 'Down');

              expect(editorView.state.doc).to.deep.equal(doc(blockquote(hr, code_block()('text')), p('text')));
            });
          });

          context('when there is no more content after the nested block', () => {
            it('creates a new paragraph below', () => {
              const { editorView, sel } = editor(doc(blockquote(code_block()('text{<>}'), hr)));
              setNodeSelection(editorView, sel + 1);

              sendKeyToPm(editorView, 'Down');

              expect(editorView.state.doc).to.deep.equal(doc(blockquote(code_block()('text'), hr), p('')));
            });
          });
        });
      });
    });
  });

  describe('toggleBlockType', () => {
    context('when origin block type is different with target block type', () => {
      it('converts to target block type', () => {
        const { pluginState } = editor(doc(p('text')));
        const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

        pluginState.toggleBlockType('heading1');

        expect(toggleBlockType.calledWith('heading1')).to.equal(true);
      });
    });

    context('when origin block type is the same as target block type', () => {
      context('when it is a quote', () => {
        it('lifts content out of the quote', () => {
          const { editorView, pluginState } = editor(doc(blockquote(p('text'))));

          pluginState.toggleBlockType('heading1');
          expect(editorView.state.doc).to.deep.equal(doc(h1('text')));
        });
      });

      context('when it is not a quote', () => {
        it('converts to a paragraph', () => {
          const { pluginState } = editor(doc(h1('text')));
          const toggleBlockType = sinon.spy(pluginState, 'toggleBlockType');

          pluginState.toggleBlockType('heading1');

          expect(toggleBlockType.calledWith('normal')).to.equal(true);
        });
      });
    });
  });

  describe('changeContext', () => {
    it('reverts to "default" in case the context is not defined', () => {
      const { pluginState } = editor(doc(p('text')));
      expect(pluginState.context).to.eq('default');
      pluginState.changeContext('!!!%%%UNDEFINED CONTEXT%%%!!!');
      expect(pluginState.context).to.eq('default');
    });
  });
});
