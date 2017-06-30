import * as assert from 'assert';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  DefaultMediaStateManager,
  MediaStateStatus,
} from '@atlaskit/media-core';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import {
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,

  // nodeviews
  nodeViewFactory,
  ReactMediaGroupNode,
  ReactMediaNode,
} from '../../../../src';
import { undo, history } from '../../../../src/prosemirror';
import {
  blockquote,
  chaiPlugin,
  code_block,
  doc,
  h1,
  hr,
  mention,
  makeEditor,
  mediaGroup,
  media,
  fixtures,
  p,
  a,
  storyMediaProviderFactory,
  randomId,
  sleep,
  setNodeSelection,
  sendKeyToPm,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

const stateManager = new DefaultMediaStateManager();
const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

const getFreshResolvedProvider = () => {
  return storyMediaProviderFactory(mediaTestHelpers, testCollectionName, stateManager);
};

describe('Media plugin', () => {
  const fixture = fixtures();
  const resolvedProvider = getFreshResolvedProvider();
  const testFileId = `temporary:${randomId()}`;

  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('mediaProvider', resolvedProvider);

  const editor = (doc: any, uploadErrorHandler?: () => void) => {
    const plugins = [
      ...mediaPluginFactory(defaultSchema, { providerFactory, uploadErrorHandler }),
      history(),
    ];

    return makeEditor<MediaPluginState>({
      doc,
      plugins,
      schema: defaultSchema,
      nodeViews: {
        mediaGroup: nodeViewFactory(providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
      },
      place: fixture(),
    });
  };

  const getNodePos = (pluginState: MediaPluginState, id: string) => {
    const mediaNodeWithPos = pluginState.findMediaNode(id);
    assert(mediaNodeWithPos, `Media node with id "${id}" has not been mounted yet`);

    return mediaNodeWithPos!.getPos();
  };

  after(() => {
    providerFactory.destroy();
  });

  it('allows change handler to be registered', () => {
    const pluginState = editor(doc(p(''))).pluginState;
    pluginState.subscribe(sinon.spy());
  });

  context('when cursor is at the end of a text block', () => {
    it('inserts media node into the document after current paragraph node', () => {
      const { editorView, pluginState } = editor(doc(p('text{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p('text'),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
      collectionFromProvider.restore();
    });

    it('puts cursor to the next paragraph after inserting media node', () => {
      const { editorView, pluginState } = editor(doc(p('text{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });
      const paragraphNodeSize = p('text').nodeSize;
      const mediaGroupNodeSize = mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })).nodeSize;

      expect(editorView.state.selection.from).to.eq(paragraphNodeSize + mediaGroupNodeSize + 1);
      collectionFromProvider.restore();
    });

    it('should prepend media node to existing media group after it', () => {
      const { editorView, pluginState } = editor(doc(
        p('text{<>}'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
      ));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: 'mock2', status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p('text{<>}'),
          mediaGroup(
            media({ id: 'mock2', type: 'file', collection: testCollectionName }),
            media({ id: testFileId, type: 'file', collection: testCollectionName }),
          )
        )
      );
      collectionFromProvider.restore();
    });
  });

  context('when cursor is at the beginning of a text block', () => {
    it('should prepend media node to existing media group before it', () => {
      const { editorView, pluginState } = editor(doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        p('{<>}text'),
      ));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: 'mock2', status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(
            media({ id: 'mock2', type: 'file', collection: testCollectionName }),
            media({ id: testFileId, type: 'file', collection: testCollectionName }),
          ),
          p('text'),
        )
      );
      collectionFromProvider.restore();
    });
  });

  context('when cursor is in the middle of a text block', () => {
    context('when inside a paragraph', () => {
      it('splits text', () => {
        const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertFile({ id: testFileId, status: 'uploading' });

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p('te'),
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            p('xt'),
          )
        );
        collectionFromProvider.restore();
      });

      it('moves cursor to the front of later part of the text', () => {
        const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertFile({ id: testFileId, status: 'uploading' });
        const paragraphNodeSize = p('te').nodeSize;
        const mediaGroupNodeSize = mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })).nodeSize;

        expect(editorView.state.selection.from).to.eq(paragraphNodeSize + mediaGroupNodeSize + 1);
        collectionFromProvider.restore();
      });
    });

    context('when inside a heading', () => {
      it('preserves heading', () => {
        const { editorView, pluginState } = editor(doc(h1('te{<>}xt')));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertFile({ id: testFileId, status: 'uploading' });

        expect(editorView.state.doc).to.deep.equal(
          doc(
            h1('te'),
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            h1('xt'),
          )
        );
        collectionFromProvider.restore();
      });
    });
  });

  context('when selection is not empty', () => {
    context('when selection is a text', () => {
      context('when selection is in the middle of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView, pluginState } = editor(doc(p('te{<}x{>}t')));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          pluginState.insertFile({ id: testFileId, status: 'uploading' });

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              p('t'),
            )
          );
          collectionFromProvider.restore();
        });
      });

      context('when selection covers the whole text block', () => {
        context('when there is no existing media group nearby', () => {
          context('when inside a paragraph', () => {
            it('replaces selection with a media node', () => {
              const { editorView, pluginState } = editor(doc(p('{<}text{>}')));
              const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

              pluginState.insertFile({ id: testFileId, status: 'uploading' });

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                  p(),
                )
              );
              collectionFromProvider.restore();
            });
          });

          context('when inside a heading', () => {
            it('replaces selection with a media node', () => {
              const { editorView, pluginState } = editor(doc(h1('{<}text{>}')));
              const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

              pluginState.insertFile({ id: testFileId, status: 'uploading' });

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  h1(),
                  mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                  p(),
                )
              );
              collectionFromProvider.restore();
            });
          });
        });

        context('when there is an existing media group nearby', () => {
          it('prepand media to the media group after parent', () => {
            const { editorView, pluginState } = editor(doc(
              mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              p('{<}text{>}'),
              mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            ));
            const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

            pluginState.insertFile({ id: 'new one', status: 'uploading' });

            expect(editorView.state.doc).to.deep.equal(
              doc(
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                p(),
                mediaGroup(
                  media({ id: 'new one', type: 'file', collection: testCollectionName }),
                  media({ id: testFileId, type: 'file', collection: testCollectionName })
                ),
              )
            );
            collectionFromProvider.restore();
          });
        });
      });

      context('when selection is at the end of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView, pluginState } = editor(doc(p('te{<}xt{>}')));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          pluginState.insertFile({ id: testFileId, status: 'uploading' });

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              p(),
            )
          );
          collectionFromProvider.restore();
        });

        it('prepends to exisiting media group after parent', () => {
          const { editorView, pluginState } = editor(doc(
            p('te{<}xt{>}'),
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          ));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          pluginState.insertFile({ id: 'new one', status: 'uploading' });

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(
                media({ id: 'new one', type: 'file', collection: testCollectionName }),
                media({ id: testFileId, type: 'file', collection: testCollectionName })
              )
            )
          );
          collectionFromProvider.restore();
        });
      });
    });

    context('when selection is a node', () => {
      context('when selection is an inline node', () => {
        it('replaces selection with a media node', () => {
          const { editorView, pluginState, sel } = editor(doc(p('text{<>}', mention({ id: 'foo1', text: '@bar1' }))));
          setNodeSelection(editorView, sel);
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          pluginState.insertFile({ id: testFileId, status: 'uploading' });

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('text'),
              mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              p(),
            )
          );
          collectionFromProvider.restore();
        });
      });

      context('when selection is a media node', () => {
        it('prepends to the existsing media group', () => {
          const { editorView, pluginState } = editor(doc(
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            p('text'),
          ));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
          setNodeSelection(editorView, 1);

          pluginState.insertFile({ id: 'new one', status: 'uploading' });

          expect(editorView.state.doc).to.deep.equal(
            doc(
              mediaGroup(
                media({ id: 'new one', type: 'file', collection: testCollectionName }),
                media({ id: testFileId, type: 'file', collection: testCollectionName })
              ),
              p('text'),
            )
          );
          collectionFromProvider.restore();
        });

        it('sets cursor to the paragraph after', () => {
          const { editorView, pluginState } = editor(doc(
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            p('text'),
          ));
          setNodeSelection(editorView, 0);
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          pluginState.insertFile({ id: 'new one', status: 'uploading' });
          const mediaGroupNodeSize = mediaGroup(
            media({ id: 'new one', type: 'file', collection: testCollectionName }),
            media({ id: testFileId, type: 'file', collection: testCollectionName })
          ).nodeSize;

          expect(editorView.state.selection.from).to.deep.equal(mediaGroupNodeSize);
          collectionFromProvider.restore();
        });
      });

      context('when selection is a non media block node', () => {
        context('when no exisiting media group', () => {
          it('replaces selection with a media node', () => {
            const { editorView, pluginState } = editor(doc(hr));
            setNodeSelection(editorView, 0);
            const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

            pluginState.insertFile({ id: testFileId, status: 'uploading' });

            expect(editorView.state.doc).to.deep.equal(
              doc(
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                p(),
              )
            );
            collectionFromProvider.restore();
          });
        });

        context('when there are exisiting media group', () => {
          context('when media group is in the front', () => {
            it('prepend media to the exisiting media group before', () => {
              const { editorView, pluginState } = editor(doc(
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                hr,
              ));
              const mediaGroupNodeSize = mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);
              const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

              pluginState.insertFile({ id: 'new one', status: 'uploading' });

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: testFileId, type: 'file', collection: testCollectionName }),
                  ),
                  p(),
                )
              );
              collectionFromProvider.restore();
            });
          });

          context('when media group is at the end', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView, pluginState } = editor(doc(
                hr,
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              ));
              setNodeSelection(editorView, 0);
              const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

              pluginState.insertFile({ id: 'new one', status: 'uploading' });

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: testFileId, type: 'file', collection: testCollectionName }),
                  )
                )
              );
              collectionFromProvider.restore();
            });
          });

          context('when both sides have media groups', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView, pluginState } = editor(doc(
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                hr,
                mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
              ));
              const mediaGroupNodeSize = mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);
              const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

              pluginState.insertFile({ id: 'new one', status: 'uploading' });

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: testFileId, type: 'file', collection: testCollectionName }),
                  ),
                )
              );
              collectionFromProvider.restore();
            });
          });
        });
      });
    });

    context('when selection is at the beginning of the text block', () => {
      it('replaces selection with a media node', () => {
        const { editorView, pluginState } = editor(doc(p('{<}te{>}xt')));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertFile({ id: testFileId, status: 'uploading' });

        expect(editorView.state.doc).to.deep.equal(
          doc(
            mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
            p('xt'),
          )
        );
        collectionFromProvider.restore();
      });

      it('prepends to exisiting media group before parent', () => {
        const { editorView, pluginState } = editor(doc(
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p('{<}te{>}xt'),
        ));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertFile({ id: 'new one', status: 'uploading' });

        expect(editorView.state.doc).to.deep.equal(
          doc(
            mediaGroup(
              media({ id: 'new one', type: 'file', collection: testCollectionName }),
              media({ id: testFileId, type: 'file', collection: testCollectionName })
            ),
            p('xt'),
          )
        );
        collectionFromProvider.restore();
      });
    });
  });

  it(`should insert media node into the document after current heading node`, () => {
    const { editorView, pluginState } = editor(doc(h1('text{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    pluginState.insertFile({ id: testFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        h1('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })
        ),
        p(),
      ));
    collectionFromProvider.restore();
  });

  it(`should insert media node into the document after current blockquote node`, () => {
    const { editorView, pluginState } = editor(doc(blockquote(p('text{<>}'))));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    pluginState.insertFile({ id: testFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(blockquote(
        p('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        p(),
      ))
    );
    collectionFromProvider.restore();
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView, pluginState } = editor(doc(code_block()('text{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    pluginState.insertFile({ id: testFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        code_block()('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })
        ),
        p(),
      ));
    collectionFromProvider.restore();
  });

  context('inside empty block', () => {
    it('replaces empty paragraph with the media grroup in an empty document', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
      collectionFromProvider.restore();
    });

    it('apends media group to empty paragraph in an empty code block', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          code_block()('{<>}'),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
      collectionFromProvider.restore();
    });

    it('apends media group to empty paragraph in an empty heading', () => {
      const { editorView, pluginState } = editor(doc(h1('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          h1('{<>}'),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
      collectionFromProvider.restore();
    });

    it('prepends media to existing media group before the empty paragraph', () => {
      const { editorView, pluginState } = editor(doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        p('{<>}'),
      ));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: 'another one', status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(
            media({ id: 'another one', type: 'file', collection: testCollectionName }),
            media({ id: testFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );
      collectionFromProvider.restore();
    });

    it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}'), p()));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p()
        )
      );
      collectionFromProvider.restore();
    });

    it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
      const { editorView, pluginState } = editor(doc(p(), p('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p()
        )
      );
      collectionFromProvider.restore();
    });

    it('should insert all media nodes on the same line', async () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      await resolvedProvider;
      pluginState.insertFile({ id: 'mock2' });
      pluginState.insertFile({ id: 'mock1' });

      expect(editorView.state.doc).to.deep.equal(doc(
        mediaGroup(
          media({ id: 'mock1', type: 'file', collection: testCollectionName }),
          media({ id: 'mock2', type: 'file', collection: testCollectionName }),
        ),
        p(),
      ));
      collectionFromProvider.restore();
    });

    it('should invoke binary picker when calling insertFileFromDataUrl', async () => {
      const { pluginState } = editor(doc(p('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
      const provider = await resolvedProvider;
      await provider.uploadContext;

      expect(pluginState.binaryPicker!).to.be.an('object');

      pluginState.binaryPicker!.upload = sinon.spy();

      pluginState.insertFileFromDataUrl(
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        'test.gif'
      );

      expect((pluginState.binaryPicker!.upload as any).calledOnce).to.equal(true);
      collectionFromProvider.restore();
    });

    it('should call uploadErrorHandler on upload error', async () => {
      const handler = sinon.spy();
      const { pluginState } = editor(doc(p(), p('{<>}')), handler);
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      await resolvedProvider;

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      stateManager.updateState(testFileId, {
        id: testFileId,
        status: 'error',
        error: {
          name: 'some-error',
          description: 'something went wrong'
        }
      });

      expect(handler.calledOnce).to.eq(true, 'uploadErrorHandler should be called once per failed upload');
      expect(handler.calledWithExactly({
        id: testFileId,
        status: 'error',
        error: {
          name: 'some-error',
          description: 'something went wrong'
        }
      })).to.eq(true, 'uploadErrorHandler should be called with MediaState containing \'error\' status');
      collectionFromProvider.restore();
    });

    it('should remove failed uploads from the document', async () => {
      const handler = sinon.spy();
      const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      const provider = await resolvedProvider;
      await provider.uploadContext;

      pluginState.insertFile({ id: testFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );

      stateManager.updateState(testFileId, {
        id: testFileId,
        status: 'error'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          p()
        )
      );
      collectionFromProvider.restore();
    });

    it('should cancel in-flight uploads after media item is removed from document', async () => {
      const spy = sinon.spy();
      const { editorView, pluginState } = editor(doc(p(), p('{<>}')), spy);
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
      const firstTemporaryFileId = `temporary:first`;
      const secondTemporaryFileId = `temporary:second`;
      const thirdTemporaryFileId = `temporary:third`;

      // wait until mediaProvider has been set
      const provider = await resolvedProvider;
      // wait until mediaProvider's uploadContext has been set
      await provider.uploadContext;

      pluginState.insertFile({ id: firstTemporaryFileId, status: 'uploading' });
      pluginState.insertFile({ id: secondTemporaryFileId, status: 'uploading' });
      pluginState.insertFile({ id: thirdTemporaryFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(
            media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
            media({ id: secondTemporaryFileId, type: 'file', collection: testCollectionName }),
            media({ id: firstTemporaryFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );

      stateManager.updateState(firstTemporaryFileId, {
        id: firstTemporaryFileId,
        status: 'uploading'
      });

      stateManager.updateState(secondTemporaryFileId, {
        id: secondTemporaryFileId,
        status: 'processing'
      });

      stateManager.subscribe(firstTemporaryFileId, spy);
      stateManager.subscribe(secondTemporaryFileId, spy);
      stateManager.subscribe(thirdTemporaryFileId, spy);

      let pos: number;
      pos = getNodePos(pluginState, firstTemporaryFileId);
      editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
      // When removing multiple nodes with node view, ProseMirror performs the DOM update
      // asynchronously after a 20ms timeout. In order for the operations to succeed, we
      // must wait for the DOM reconciliation to conclude before proceeding.
      await sleep(100);

      pos = getNodePos(pluginState, secondTemporaryFileId);
      editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
      await sleep(100);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(
            media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );

      expect(spy.callCount).to.eq(2, 'State Manager should receive "cancelled" status');

      expect(spy.calledWithExactly({
        id: firstTemporaryFileId,
        status: 'cancelled'
      })).to.eq(true, 'State Manager should emit "cancelled" status');

      expect(spy.calledWithExactly({
        id: secondTemporaryFileId,
        status: 'cancelled'
      })).to.eq(true, 'State Manager should emit "cancelled" status');
      collectionFromProvider.restore();
    });

    it('should not revert to temporary media nodes after upload finished and we undo', async () => {
      const { editorView, pluginState } = editor(doc(p(), p('{<>}')));
      const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
      const tempFileId = `temporary:${randomId()}`;
      const publicFileId = `${randomId()}`;

      // wait until mediaProvider has been set
      const provider = await resolvedProvider;
      // wait until mediaProvider's uploadContext has been set
      await provider.uploadContext;

      pluginState.insertFile({ id: tempFileId, status: 'uploading' });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(
            media({ id: tempFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );

      stateManager.updateState(tempFileId, {
        id: tempFileId,
        status: 'uploading'
      });

      // mark the upload as finished, triggering replacement of media node
      stateManager.updateState(tempFileId, {
        id: tempFileId,
        publicId: publicFileId,
        status: 'ready'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(
            media({ id: publicFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );

      // undo last change
      expect(undo(editorView.state, editorView.dispatch)).to.equal(true);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          // the second paragraph is a side effect of PM history snapshots merging
          p(),
        )
      );
      collectionFromProvider.restore();
    });
  });

  it('should set new pickers exactly when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);

    const resolvedMediaProvider1 = await mediaProvider1;
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider1.uploadContext;
    await resolvedMediaProvider2.uploadContext;

    expect(pluginState.pickers).to.have.length(4);
  });

  it('should re-use old pickers when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;
    const pickersAfterMediaProvider1 = pluginState.pickers;
    expect(pickersAfterMediaProvider1).to.have.length(4);

    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider2.uploadContext;
    const pickersAfterMediaProvider2 = pluginState.pickers;

    expect(pickersAfterMediaProvider1).to.have.length(pickersAfterMediaProvider2.length);
    for (let i = 0; i < pickersAfterMediaProvider1.length; i++) {
      expect(pickersAfterMediaProvider1[i]).to.equal(pickersAfterMediaProvider2[i]);
    }
  });

  it('should set new upload params for existing pickers when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;

    pluginState.pickers.forEach(picker => {
      picker.setUploadParams = sinon.spy();
    });

    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider2.uploadContext;

    pluginState.pickers.forEach(picker => {
      expect((picker.setUploadParams as any).calledOnce).to.equal(true);
    });
  });

  [
    'unfinalized',
    'unknown',
    'ready',
    'error',
    'cancelled',
  ].forEach((status: MediaStateStatus) => {
    it(`should remove ${status} media nodes`, async () => {
      const mediaNode = media({ id: 'foo', type: 'file', collection: testCollectionName });
      const { editorView, pluginState } = editor(
        doc(
          mediaGroup(mediaNode),
          mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })),
        ),
      );

      await resolvedProvider;

      stateManager.updateState('foo', {
        status,
        id: 'foo',
      });

      const pos = getNodePos(pluginState, 'foo');
      pluginState.handleMediaNodeRemove(mediaNode, () => pos);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })
          )
        ));
    });
  });

  it('should focus the editor after files are added to the document', async () => {
    const { editorView, pluginState } = editor(doc(p('')));
    await resolvedProvider;

    pluginState.insertFile({ id: 'foo' });
    expect(editorView.hasFocus()).to.be.equal(true);

    pluginState.insertFile({ id: 'bar' });
    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(
          media({ id: 'bar', type: 'file', collection: testCollectionName }),
          media({ id: 'foo', type: 'file', collection: testCollectionName }),
        ),
        p(),
      ),
    );
  });

  it(`should copy optional attributes from MediaState to Node attrs`, () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    pluginState.insertFile({
      id: testFileId, status: 'uploading', fileName: 'foo.png', fileSize: 1234, fileMimeType: 'image/png'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(
          media({
            id: testFileId,
            type: 'file',
            collection: testCollectionName,
            __fileName: 'foo.png',
            __fileSize: 1234,
            __fileMimeType: 'image/png'
          }),
        ),
        p(),
      ),
    );
    collectionFromProvider.restore();
  });

  describe('detectLinkRangesInSteps', () => {
    context('when includes replace step with links', () => {
      it('returns ranges with links', () => {
        const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const tr = state.tr.replaceWith(sel, sel, link1.concat(link2));

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([
          { start: sel, end: sel, urls: ['www.google.com', 'www.baidu.com'] }
        ]);
      });

      it('detects links inside nested content', () => {
        const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const blockQuote = blockquote(p(link1, link2));
        const tr = state.tr.replaceWith(sel - 1, sel + 1, blockQuote);

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([
          { start: sel - 1, end: sel + 1, urls: ['www.google.com', 'www.baidu.com'] }
        ]);
      });

      context('when step is triggered by undo', () => {
        it('does not detect links', () => {
          const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
          const { state } = editorView;
          const link1 = a({ href: 'www.google.com' })('google');
          const link2 = a({ href: 'www.baidu.com' })('baidu');
          const tr = state.tr.replaceWith(sel, sel, link1.concat(link2));

          pluginState.allowsLinks = true;
          sendKeyToPm(editorView, 'Mod-z');

          const linksRanges = pluginState.detectLinkRangesInSteps(tr);

          expect(linksRanges).to.deep.equal([]);
        });
      });
    });

    context('when includes add mark step with links', () => {
      it('returns ranges with links', () => {
        const text = 'hello';
        const { editorView, pluginState, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const linkMark = state.schema.marks.link.create({ href: 'www.atlassian.com' });
        const tr = state.tr.addMark(sel - text.length, sel, linkMark);

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([
          { start: sel - text.length, end: sel, urls: ['www.atlassian.com'] },
        ]);
      });
    });

    context('when both replace step and add mark step have links', () => {
      it('returns ranges with links', () => {
        const text = 'hello';
        const { editorView, pluginState, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const linkMark = state.schema.marks.link.create({ href: 'www.atlassian.com' });
        const tr = state.tr
          .replaceWith(sel, sel, link1.concat(link2))
          .addMark(sel - text.length, sel, linkMark);

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([
          { start: sel, end: sel, urls: ['www.google.com', 'www.baidu.com'] },
          { start: sel - text.length, end: sel, urls: ['www.atlassian.com'] },
        ]);
      });
    });

    context('when remove step with links', () => {
      it('returns empty ranges', () => {
        const text = 'hello';
        const href = 'www.google.com';
        const link = a({ href })(`${text}{<>}`);
        const { editorView, pluginState, sel } = editor(doc(p(link)));
        const { state } = editorView;
        const tr = state.tr
          .removeMark(sel - text.length, sel, state.schema.marks.link.create({ href }));

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([]);
      });
    });

    context('when neither replace step nor add mark step have links', () => {
      it('returns empty ranges', () => {
        const text = 'hello';
        const { editorView, pluginState, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const newText = state.schema.text('yay');
        const strongMark = state.schema.marks.strong.create();
        const tr = state.tr
          .replaceWith(sel, sel, newText)
          .addMark(sel - text.length, sel, strongMark);

        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([]);
      });
    });
  });

  describe('insertLinks', () => {
    context('when no links are stored in link ranges', () => {
      it('does nothing', () => {
        const text = 'www.google.com';
        const { editorView, pluginState } = editor(doc(p(`${text} {<>}`)));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        pluginState.insertLinks([]);

        expect(editorView.state.doc).to.deep.equal(doc(p(`${text} `)));
        collectionFromProvider.restore();
      });
    });

    context('when there is a link stored in link ranges', () => {
      context('there is no existing media group below', () => {
        it('creates a link card below where is the link created', () => {
          const link = 'www.google.com';
          const { editorView, pluginState, sel } = editor(doc(p(`${link} {<>}`)));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          // -1 for space, simulate the scenario of autoformatting link
          pluginState.insertLinks([
            { start: sel - link.length - 1, end: sel, urls: [link] }
          ]);

          expect(editorView.state.doc).to.deep.equal(doc(
            p(`${link} `),
            mediaGroup(media({ id: link, type: 'link', collection: testCollectionName })),
            p(),
          ));
          collectionFromProvider.restore();
        });

        context('lastest pos in range is out of doc range', () => {
          it('creates a link card at the end of doc', () => {
            const link = 'www.google.com';
            const { editorView, pluginState, sel } = editor(doc(p(`${link} {<>}`)));
            const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

            // -1 for space, simulate the scenario of autoformatting link
            pluginState.insertLinks([
              { start: sel - link.length - 1, end: 1000, urls: [link] }
            ]);

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link} `),
              mediaGroup(media({ id: link, type: 'link', collection: testCollectionName })),
              p(),
            ));
            collectionFromProvider.restore();
          });
        });

        context('not at the end of the doc', () => {
          it('does not create a new p at the end of doc', () => {
            const link = 'www.google.com';
            const { editorView, pluginState, sel } = editor(doc(
              p(`${link} {<>}`),
              p('hello'),
            ));
            const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

            // -1 for space, simulate the scenario of autoformatting link
            pluginState.insertLinks([
              { start: sel - link.length - 1, end: sel, urls: [link] }
            ]);

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link} `),
              mediaGroup(media({ id: link, type: 'link', collection: testCollectionName })),
              p('hello'),
            ));
            collectionFromProvider.restore();
          });
        });
      });

      context('there is an existing media group below', () => {
        it('creates a link card to join the existing media group below', () => {
          const link1 = 'www.google.com';
          const link2 = 'www.baidu.com';
          const { editorView, pluginState, sel } = editor(doc(
            p(`${link1} ${link2} {<>}`),
            mediaGroup(media({ id: link1, type: 'link', collection: testCollectionName })),
          ));
          const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

          // -1 for space, simulate the scenario of autoformatting link
          pluginState.insertLinks([
            { start: sel - link2.length - 1, end: sel, urls: [link2] }
          ]);

          expect(editorView.state.doc).to.deep.equal(doc(
            p(`${link1} ${link2} `),
            mediaGroup(
              media({ id: link1, type: 'link', collection: testCollectionName }),
              media({ id: link2, type: 'link', collection: testCollectionName }),
            )
          ));
          collectionFromProvider.restore();
        });

        context('lastest pos in range is out of doc range', () => {
          it('creates a link card to join the existing media group below', () => {
            const link1 = 'www.google.com';
            const link2 = 'www.baidu.com';
            const { editorView, pluginState, sel } = editor(doc(
              p(`${link1} ${link2} {<>}`),
              mediaGroup(media({ id: link1, type: 'link', collection: testCollectionName })),
            ));
            const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

            // -1 for space, simulate the scenario of autoformatting link
            pluginState.insertLinks([
              { start: sel - link2.length - 1, end: 1000, urls: [link2] }
            ]);

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link1} ${link2} `),
              mediaGroup(
                media({ id: link1, type: 'link', collection: testCollectionName }),
                media({ id: link2, type: 'link', collection: testCollectionName }),
              )
            ));
            collectionFromProvider.restore();
          });
        });
      });
    });

    context('when there are multiple links in link ranges', () => {
      it('creates the same number of link cards below where the link created', () => {
        const link1 = 'www.google.com';
        const link2 = 'www.baidu.com';
        const link3 = 'www.atlassian.com';
        const { editorView, pluginState } = editor(doc(
          p(`${link1}`),
          p(`${link2} ${link3}`),
          p('hello')
        ));
        const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

        const startOfLink1 = 1;
        const endOfLink1 = startOfLink1 + link1.length;
        const startOfLink2 = endOfLink1 + 2;
        const endOfLink2 = startOfLink2 + link2.length;

        // -1 for space, simulate the scenario of autoformatting link
        pluginState.insertLinks([
          { start: startOfLink1, end: endOfLink1, urls: [link1] },
          { start: startOfLink2, end: endOfLink2, urls: [link2, link3] },
        ]);

        expect(editorView.state.doc).to.deep.equal(doc(
          p(`${link1}`),
          p(`${link2} ${link3}`),
          mediaGroup(
            media({ id: link1, type: 'link', collection: testCollectionName }),
            media({ id: link2, type: 'link', collection: testCollectionName }),
            media({ id: link3, type: 'link', collection: testCollectionName }),
          ),
          p('hello'),
        ));
        collectionFromProvider.restore();
      });
    });
  });
});
