import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { browser } from '../../../src';
import { blockquote, br, chaiPlugin, code_block, doc, h1, h2, h3, h4, h5, hr, li, img, makeEditor, mention, p, ul } from '../../../src/test-helper';

import BlockTypePlugin from '../../../src/plugins/block-type';

chai.use(chaiPlugin);

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

  context('when rendering a block quote', () => {
    it('should not be selectable', () => {
      const { pm } = editor(doc(blockquote(p('{<>}text'))));
      const node = pm.doc.nodeAt(0);
      if (node) {
        expect(node.type.selectable).to.be.false;
      }
    });
  });

  describe('code block', () => {
    it('should be able to change to code block', () => {
      const { pm, plugin } = editor(doc(p('te{<>}xt')));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('text')));
    });

    it('should merge paragraphs while creating code blocks code block', () => {
      const { pm, plugin } = editor(doc(p('text'), p('text'), p('text')));
      pm.setTextSelection(1, 14);
      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('text\ntext\ntext')));
    });

    it('should be able to change to code block with multilines', () => {
      const { pm, plugin } = editor(
        doc(p(
          'line1{<>}',
          img({ src: 'url', alt: 'text', title: 'text' }),
          ' ',
          br,
          'line2 ',
          br)));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('line1 \nline2 \n')));
    });

    it('should be able to change to code block with image and multiple blocks', () => {
      const { pm, plugin } = editor(
        doc(p(
          'line1',
          img({ src: 'url', alt: 'text', title: 'text' })
          ), p('line2')));

      pm.setTextSelection(1, 10);
      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('line1\nline2')));
    });

    it('should be able to preserve mention text', () => {
      const { pm, plugin } = editor(
        doc(p(
          'hello ',
          mention({ id: 'foo1', displayName: '@bar1' }),
          img({ src: 'url', alt: 'text', title: 'text' }),
          ' & ',
          mention({ id: 'foo2', displayName: '@bar2' }),
          ' & ',
          mention({ id: 'foo3', displayName: '@bar3' }),
        )));

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('hello @bar1 & @bar2 & @bar3')));
    });

    it('should be able to preserve mention text when converting multiple blocks to code block', () => {
      const { pm, plugin } = editor(
        doc(p(
          'hello ',
          mention({ id: 'foo1', displayName: '@bar1' })
        ), p('text')));

      pm.setTextSelection(1, 14);
      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('hello @bar1\ntext')));
    });

    it('should collaps nested block and convert to code block', () => {
      const {pm, plugin} = editor(
        doc(blockquote(
          h1('h1')
        ))
      );

      plugin.changeBlockType('codeblock');
      expect(pm.doc).to.deep.equal(doc(code_block()('h1')));
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

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(plugin)).to.equal(true);
  });

  it('should be able to subscribe the changes', () => {
    const { plugin } = editor(doc(p('te{<>}xt')));
    const spy = sinon.spy();

    plugin.subscribe(spy);
    plugin.changeBlockType('heading1');

    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith(plugin)).to.equal(true);
  });

  describe('keymap', () => {
    if (browser.mac) {
      context('when on a Mac', () => {
        context('when hits Cmd-Alt-0', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-0');
            expect(toggleBlockType.calledWith('normal')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-1', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-1');
            expect(toggleBlockType.calledWith('heading1')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-2', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-2');
            expect(toggleBlockType.calledWith('heading2')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-3', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-3');
            expect(toggleBlockType.calledWith('heading3')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-4', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-4');
            expect(toggleBlockType.calledWith('heading4')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-5', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-5');
            expect(toggleBlockType.calledWith('heading5')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-7', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-7');
            expect(toggleBlockType.calledWith('blockquote')).to.equal(true);
          });
        });

        context('when hits Cmd-Alt-8', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Cmd-Alt-8');
            expect(toggleBlockType.calledWith('codeblock')).to.equal(true);
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
            expect(toggleBlockType.calledWith('normal')).to.equal(true);
          });
        });

        context('when hits Ctrl-1', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-1');
            expect(toggleBlockType.calledWith('heading1')).to.equal(true);
          });
        });

        context('when hits Ctrl-2', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-2');
            expect(toggleBlockType.calledWith('heading2')).to.equal(true);
          });
        });

        context('when hits Ctrl-3', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-3');
            expect(toggleBlockType.calledWith('heading3')).to.equal(true);
          });
        });

        context('when hits Ctrl-4', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-4');
            expect(toggleBlockType.calledWith('heading4')).to.equal(true);
          });
        });

        context('when hits Ctrl-5', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-5');
            expect(toggleBlockType.calledWith('heading5')).to.equal(true);
          });
        });

        context('when hits Ctrl-7', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-7');
            expect(toggleBlockType.calledWith('blockquote')).to.equal(true);
          });
        });

        context('when hits Ctrl-8', () => {
          it('toggles paragraph', () => {
            const { pm, plugin } = editor(doc(p('text')));
            const toggleBlockType = sinon.spy(plugin, 'toggleBlockType');

            pm.input.dispatchKey('Ctrl-8');
            expect(toggleBlockType.calledWith('codeblock')).to.equal(true);
          });
        });
      });
    }

    context('when hits shift-enter', () => {
      it('calls insertNewLine', () => {
        const { pm, plugin } = editor(doc(code_block()('text')));
        const insertNewLine = sinon.spy(plugin, 'insertNewLine');

        pm.input.dispatchKey('Shift-Enter');

        expect(insertNewLine.callCount).to.equal(1);
      });
    });

    context('when hits enter', () => {
      context('when it matches fence format', () => {
        context('when it is already inside a code block', () => {
          it('does not create another code block', () => {
            const { pm } = editor(doc(code_block()('```{<>}')));

            pm.input.dispatchKey('Enter');

            expect(pm.doc).to.deep.equal(doc(code_block()('```'), p('')));
          });
        });

        context('when it is not inside a code block', () => {
          context('when langauge is provided', () => {
            it('returns code block with language', () => {
              const { pm } = editor(doc(p('```javascript{<>}')));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(code_block({ language: 'javascript' })('')));
            });

            it('trims the spaces', () => {
              const { pm } = editor(doc(p('```javascript    {<>}   hello ', mention({ id: 'foo1', displayName: '@bar1' }))));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(code_block({ language: 'javascript' })('   hello @bar1')));
            });
          });

          context('when langauge is not provided', () => {
            it('returns code block without language', () => {
              const { pm } = editor(doc(p('```{<>}')));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(code_block()('')));
            });

            it('trims the spaces', () => {
              const { pm } = editor(doc(p('```    {<>}   hello')));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(code_block()('   hello')));
            });

            it('does not convert to code block if it does not start with fence', () => {
              const { pm } = editor(doc(p('hello```    {<>}   hello')));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(p('hello```    '), p('   hello')));
            });
          });

          context('on a nested structure', () => {
            it('converts to code block', () => {
              const { pm } = editor(doc(blockquote(p('```{<>}'))));

              pm.input.dispatchKey('Enter');

              expect(pm.doc).to.deep.equal(doc(blockquote(code_block()(''))));
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

        const { pm } = editor(doc(p('Hello World!{<>}')));

        pm.input.dispatchKey('Shift-Backspace');
        expect(pm.doc).to.deep.equal(doc(p('Hello World')));
      });
    });

    context('when hits up', () => {
      context('when on a text block', () => {
        context('when selection is not empty', () => {
          it('does not create a new paragraph above', () => {
            const { pm } = editor(doc(code_block()('{<}te{>}xt')));

            pm.input.dispatchKey('Up');

            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is empty', () => {
          context('on a non nested structure', () => {
            context('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph above', () => {
                const { pm } = editor(doc(code_block()('te{<>}xt')));

                pm.input.dispatchKey('Up');

                expect(pm.doc).to.deep.equal(doc(code_block()('text')));
              });
            });

            context('when cursor is at the beginning of the second block node', () => {
              it('does not create a new paragraph above', () => {
                const { pm } = editor(doc(p('text'), code_block()('{<>}text')));

                pm.input.dispatchKey('Up');

                expect(pm.doc).to.deep.equal(doc(p('text'), code_block()('text')));
              });
            });

            context('when cursor is at the beginning of the whole content', () => {
              context('non list item', () => {
                it('creates a new paragraph above', () => {
                  const { pm } = editor(doc(code_block()('{<>}text')));

                  pm.input.dispatchKey('Up');

                  expect(pm.doc).to.deep.equal(doc(p(''), code_block()('text')));
                });

                it('does not ignore @mention', () => {

                  const { pm } = editor(doc(p(mention({ id: 'foo1', displayName: '@bar1' }))));

                  pm.input.dispatchKey('Up');

                  expect(pm.doc).to.deep.equal(doc(p(''), p(mention({ id: 'foo1', displayName: '@bar1' }))));
                });
              });

              context('list item', () => {
                it('creates a new paragraph below the ul', () => {
                  const { pm } = editor(doc(ul(li(p('{<>}text')))));

                  pm.input.dispatchKey('Up');

                  expect(pm.doc).to.deep.equal(doc(p(''), ul(li(p('text')))));
                });
              });
            });
          });

          context('on a nested structure', () => {
            context('when cursor is at the beginning of the nested structure', () => {
              context('when there is still content before the nested block', () => {
                it('does not create a new paragraph above', () => {
                  const { pm } = editor(doc(p('text'), blockquote(p('{<>}text'))));

                  pm.input.dispatchKey('Up');


                  expect(pm.doc).to.deep.equal(doc(p('text'), blockquote(p('text'))));
                });
              });

              context('when there is no more content before the nested block', () => {
                it('creates a new paragraph above', () => {
                  const { pm } = editor(doc(blockquote(p('{<>}text'))));

                  pm.input.dispatchKey('Up');

                  expect(pm.doc).to.deep.equal(doc(p(''), blockquote(p('text'))));
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
              const { pm, sel } = editor(doc(p('text'), hr, code_block()('{<>}text')));
              pm.setNodeSelection(sel - 1);

              pm.input.dispatchKey('Up');

              expect(pm.doc).to.deep.equal(doc(p('text'), hr, code_block()('text')));
            });
          });

          context('when selection is at the beginning of the content', () => {
            it('creates a new paragraph above', () => {
              const { pm } = editor(doc(hr, code_block()('text')));
              pm.setNodeSelection(0);

              pm.input.dispatchKey('Up');

              expect(pm.doc).to.deep.equal(doc(p(''), hr, code_block()('text')));
            });
          });
        });

        context('on a nested structure', () => {
          context('when there is more content before the nested block', () => {
            it('does not create a paragraph', () => {
              const { pm, sel } = editor(doc(p('text'), blockquote(hr, code_block()('{<>}text'))));
              pm.setNodeSelection(sel - 1);

              pm.input.dispatchKey('Up');

              expect(pm.doc).to.deep.equal(doc(p('text'), blockquote(hr, code_block()('text'))));
            });
          });

          context('when there is no more content before the nested block', () => {
            it('creates a new paragraph above', () => {
              const { pm } = editor(doc(blockquote(hr, code_block()('{<>}text'))));
              pm.setNodeSelection(1);

              pm.input.dispatchKey('Up');

              expect(pm.doc).to.deep.equal(doc(p(''), blockquote(hr, code_block()('text'))));
            });
          });
        });
      });
    });

    context('when hits down', () => {
      context('when on a text block', () => {
        context('when selection is not empty', () => {
          it('does not create a new paragraph below', () => {
            const { pm } = editor(doc(code_block()('te{<}xt{>}')));

            pm.input.dispatchKey('Down');

            expect(pm.doc).to.deep.equal(doc(code_block()('text')));
          });
        });

        context('when selection is empty', () => {
          context('on a non nested structure', () => {
            context('when cursor is in the middle of the first block node', () => {
              it('does not create a new paragraph below', () => {
                const { pm } = editor(doc(code_block()('te{<>}xt')));

                pm.input.dispatchKey('Down');

                expect(pm.doc).to.deep.equal(doc(code_block()('text')));
              });
            });

            context('when cursor is at the end of the second last block node', () => {
              it('does not create a new paragraph below', () => {
                const { pm } = editor(doc(code_block()('text{<>}'), p('text')));

                pm.input.dispatchKey('Down');

                expect(pm.doc).to.deep.equal(doc(code_block()('text'), p('text')));
              });
            });

            context('when cursor is at the end of the whole content', () => {
              context('non list item', () => {
                it('creates a new paragraph below', () => {
                  const { pm } = editor(doc(code_block()('text{<>}')));

                  pm.input.dispatchKey('Down');

                  expect(pm.doc).to.deep.equal(doc(code_block()('text'), p('')));
                });
              });

              context('list item', () => {
                it('creates a new paragraph below the ul', () => {
                  const { pm } = editor(doc(ul(li(p('text{<>}')))));

                  pm.input.dispatchKey('Down');

                  expect(pm.doc).to.deep.equal(doc(ul(li(p('text'))), p('')));
                });
              });
            });
          });

          context('on a nested structure', () => {
            context('when cursor is at the end of the nested structure', () => {
              context('when there is still content after the nested block', () => {
                it('does not create a new paragraph below', () => {
                  const { pm } = editor(doc(blockquote(p('text{<>}')), p('text')));

                  pm.input.dispatchKey('Down');


                  expect(pm.doc).to.deep.equal(doc(blockquote(p('text')), p('text')));
                });
              });

              context('when there is no more content before the nested block', () => {
                it('creates a new paragraph below', () => {
                  const { pm } = editor(doc(blockquote(p('text{<>}'))));

                  pm.input.dispatchKey('Down');

                  expect(pm.doc).to.deep.equal(doc(blockquote(p('text')), p('')));
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
              const { pm, sel } = editor(doc(p('text{<>}'), hr, code_block()('text')));
              pm.setNodeSelection(sel + 1);

              pm.input.dispatchKey('Down');

              expect(pm.doc).to.deep.equal(doc(p('text'), hr, code_block()('text')));
            });
          });

          context('when selection is at the end of the content', () => {
            it('creates a new paragraph below', () => {
              const { pm, sel } = editor(doc(code_block()('text{<>}'), hr));
              pm.setNodeSelection(sel + 1);

              pm.input.dispatchKey('Down');

              expect(pm.doc).to.deep.equal(doc(code_block()('text'), hr, p('')));
            });
          });
        });

        context('on a nested structure', () => {
          context('when there is more content after the nested block', () => {
            it('does not create a paragraph', () => {
              const { pm, sel } = editor(doc(blockquote(hr, code_block()('{<>}text')), p('text')));
              pm.setNodeSelection(sel - 1);

              pm.input.dispatchKey('Down');

              expect(pm.doc).to.deep.equal(doc(blockquote(hr, code_block()('text')), p('text')));
            });
          });

          context('when there is no more content after the nested block', () => {
            it('creates a new paragraph below', () => {
              const { pm, sel } = editor(doc(blockquote(code_block()('text{<>}'), hr)));
              pm.setNodeSelection(sel + 1);

              pm.input.dispatchKey('Down');

              expect(pm.doc).to.deep.equal(doc(blockquote(code_block()('text'), hr), p('')));
            });
          });
        });
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

        expect(plugin.insertNewLine()).to.equal(true);
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

          expect(plugin.insertNewLine()).to.equal(true);
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

        expect(changeBlockType.calledWith('heading1')).to.equal(true);
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

          expect(changeBlockType.calledWith('normal')).to.equal(true);
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
