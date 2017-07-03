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
  NodeSelection,
} from '../../../../src';
import { undo, history } from '../../../../src/prosemirror';
import {
  blockquote,
  chaiPlugin,
  code_block,
  doc,
  h1,
  hr,
  makeEditor,
  mediaGroup,
  media,
  fixtures,
  p,
  storyMediaProviderFactory,
  randomId,
  sleep,
  setNodeSelection,
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

    return makeEditor({
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

  const insertFile = (editorView: any, pluginState: MediaPluginState, id = testFileId) => {
    const [node, transaction] = pluginState.insertFile({ id, status: 'uploading' }, testCollectionName);
    editorView.dispatch(transaction);

    return node;
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
    const pluginState = editor(doc(p(''))).pluginState as MediaPluginState;
    pluginState.subscribe(sinon.spy());
  });

  it(`should insert media node into the document after current paragraph node`, () => {
    const { editorView, pluginState } = editor(doc(p('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })
        )
      ));
  });

  it(`should insert media node into the document after current heading node`, () => {
    const { editorView, pluginState } = editor(doc(h1('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        h1('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })
        )
      ));
  });

  it(`should insert media node into the document after current blockquote node`, () => {
    const { editorView, pluginState } = editor(doc(blockquote(p('text{<>}'))));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(blockquote(
        p('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName }))
      ))
    );
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView, pluginState } = editor(doc(code_block()('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        code_block()('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })
        )
      ));
  });

  it('should prepend media node to existing media group', () => {
    const { editorView, pluginState } = editor(doc(
      p('text{<>}'),
      mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
    ));

    insertFile(editorView, pluginState, 'mock2');

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p('text{<>}'),
        mediaGroup(
          media({ id: 'mock2', type: 'file', collection: testCollectionName }),
          media({ id: testFileId, type: 'file', collection: testCollectionName }),
        )
      )
    );
  });

  it('should prepend media group to empty paragraph in an empty document', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        p(),
      )
    );
  });

  it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}'), p()));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        p()
      )
    );
  });

  it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
      )
    );
  });

  it('should insert all media nodes on the same line', async () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));

    await resolvedProvider;
    pluginState.handleNewMediaPicked({ id: 'mock2' });
    pluginState.handleNewMediaPicked({ id: 'mock1' });

    expect(editorView.state.doc).to.deep.equal(doc(
      mediaGroup(
        media({ id: 'mock1', type: 'file', collection: testCollectionName }),
        media({ id: 'mock2', type: 'file', collection: testCollectionName }),
      ),
      p(),
    ));
  });

  it('should invoke binary picker when calling insertFileFromDataUrl', async () => {
    const { pluginState } = editor(doc(p('{<>}')));
    const provider = await resolvedProvider;
    await provider.uploadContext;

    expect(pluginState.binaryPicker!).to.be.an('object');

    pluginState.binaryPicker!.upload = sinon.spy();

    pluginState.insertFileFromDataUrl(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'test.gif'
    );

    expect(pluginState.binaryPicker!.upload.calledOnce).to.equal(true);
  });

  it('should call uploadErrorHandler on upload error', async () => {
    const handler = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);

    await resolvedProvider;

    insertFile(editorView, pluginState);

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
  });

  it('should remove failed uploads from the document', async () => {
    const handler = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);

    const provider = await resolvedProvider;
    await provider.uploadContext;

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
      )
    );

    stateManager.updateState(testFileId, {
      id: testFileId,
      status: 'error'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p()
      )
    );
  });

  it('should cancel in-flight uploads after media item is removed from document', async () => {
    const spy = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), spy);
    const firstTemporaryFileId = `temporary:first`;
    const secondTemporaryFileId = `temporary:second`;
    const thirdTemporaryFileId = `temporary:third`;

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    insertFile(editorView, pluginState, firstTemporaryFileId);
    insertFile(editorView, pluginState, secondTemporaryFileId);
    insertFile(editorView, pluginState, thirdTemporaryFileId);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: secondTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: firstTemporaryFileId, type: 'file', collection: testCollectionName }),
        ),
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
  });

  it('should not revert to temporary media nodes after upload finished and we undo', async () => {
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')));
    const tempFileId = `temporary:${randomId()}`;
    const publicFileId = `${randomId()}`;

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    insertFile(editorView, pluginState, tempFileId);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: tempFileId, type: 'file', collection: testCollectionName }),
        ),
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
  });

  it('should set new pickers exactly when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider1);
    const mediaProvider2 = getFreshResolvedProvider();
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider2);

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
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;
    const pickersAfterMediaProvider1 = pluginState.pickers;
    expect(pickersAfterMediaProvider1).to.have.length(4);

    const mediaProvider2 = getFreshResolvedProvider();
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider2);
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
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;

    pluginState.pickers.forEach(picker => {
      picker.setUploadParams = sinon.spy();
    });

    const mediaProvider2 = getFreshResolvedProvider();
    (pluginState as MediaPluginState).setMediaProvider(mediaProvider2);
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider2.uploadContext;

    pluginState.pickers.forEach(picker => {
      expect(picker.setUploadParams.calledOnce).to.equal(true);
    });
  });

  describe('handleMediaNodeRemove', () => {
    [
      'unfinalized',
      'unknown',
      'ready',
      'error',
      'cancelled',
    ].forEach((status: MediaStateStatus) => {
      it(`should remove ${status} media nodes`, () => {
        const deletingMediaNodeId = 'foo';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(
          doc(
            mediaGroup(deletingMediaNode),
            mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })),
          ),
        );

        stateManager.updateState(deletingMediaNode.attrs.id, {
          status,
          id: deletingMediaNodeId,
        });

        const pos = getNodePos(pluginState, deletingMediaNodeId);
        (pluginState as MediaPluginState).handleMediaNodeRemove(deletingMediaNode, () => pos);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })
            )
          ));
      });

      context('when there is a media node before', () => {
        it(`set selection to the previous media node after removing ${status} media node`, () => {
          const deletingMediaNodeId = 'media2';
          const deletingMediaNode = media({ id: 'media2', type: 'file', collection: testCollectionName });
          const { editorView, pluginState } = editor(
            doc(
              p('hello'),
              mediaGroup(
                media({ id: 'media1', type: 'file', collection: testCollectionName }),
                deletingMediaNode,
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
            ),
          );

          stateManager.updateState(deletingMediaNodeId, {
            status,
            id: deletingMediaNodeId,
          });

          const pos = getNodePos(pluginState, deletingMediaNodeId);
          (pluginState as MediaPluginState).handleMediaNodeRemove(deletingMediaNode, () => pos);

          const selection = editorView.state.selection as NodeSelection;
          expect(selection.node.attrs.id).to.equal('media1');
        });
      });

      context.skip('when there is no media node before, but media node after', () => {
        it(`set selection to the next media node after removing ${status} media node`, () => {
          const deletingMediaNodeId = 'media2';
          const deletingMediaNode = media({ id: 'media2', type: 'file', collection: testCollectionName });
          const { editorView, pluginState } = editor(
            doc(
              p('hello'),
              mediaGroup(
                deletingMediaNode,
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
            ),
          );

          stateManager.updateState(deletingMediaNodeId, {
            status,
            id: deletingMediaNodeId,
          });

          const pos = getNodePos(pluginState, deletingMediaNodeId);
          (pluginState as MediaPluginState).handleMediaNodeRemove(deletingMediaNode, () => pos);

          const selection = editorView.state.selection as NodeSelection;
          expect(selection.node.attrs.id).to.equal('media3');
        });
      });
    });
  });

  describe('removeMediaNode', () => {
    context('when selection is a media node', () => {
      it('calls handleMediaNodeRemove', () => {
        const deletingMediaNodeId = 'media';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(doc(mediaGroup(deletingMediaNode)));
        setNodeSelection(editorView, 1);

        const setSelectionAfterRemovalSpy = sinon.spy(pluginState, 'handleMediaNodeRemove');

        pluginState.removeMediaNode();

        expect(setSelectionAfterRemovalSpy.calledOnce).to.equal(true);
      });

      it('removes node', () => {
        const deletingMediaNodeId = 'media';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(doc(mediaGroup(deletingMediaNode)));
        setNodeSelection(editorView, 1);

        const setSelectionAfterRemovalSpy = sinon.spy(pluginState, 'handleMediaNodeRemove');

        pluginState.removeMediaNode();

        expect(editorView.state.doc).to.deep.equal(doc(p()));
      });

      it('returns true', () => {
        const deletingMediaNodeId = 'media2';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(doc(mediaGroup(deletingMediaNode)));
        setNodeSelection(editorView, 1);

        expect(pluginState.removeMediaNode()).to.equal(true);
      });
    });

    context('when selection is a non media node', () => {
      it('does not remove media node', () => {
        const deletingMediaNodeId = 'media2';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(doc(hr, mediaGroup(deletingMediaNode)));
        setNodeSelection(editorView, 1);

        const setSelectionAfterRemovalSpy = sinon.spy(pluginState, 'handleMediaNodeRemove');

        pluginState.removeMediaNode();

        expect(setSelectionAfterRemovalSpy.called).to.equal(false);
      });

      it('returns false', () => {
        const deletingMediaNodeId = 'media2';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { editorView, pluginState } = editor(doc(hr, mediaGroup(deletingMediaNode)));
        setNodeSelection(editorView, 1);

        expect(pluginState.removeMediaNode()).to.equal(false);
      });
    });

    context('when selection is text', () => {
      it('does not remove media node', () => {
        const deletingMediaNodeId = 'media2';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { pluginState } = editor(doc('hello{<>}', mediaGroup(deletingMediaNode)));

        const setSelectionAfterRemovalSpy = sinon.spy(pluginState, 'handleMediaNodeRemove');

        pluginState.removeMediaNode();

        expect(setSelectionAfterRemovalSpy.called).to.equal(false);
      });

      it('returns false', () => {
        const deletingMediaNodeId = 'media2';
        const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });
        const { pluginState } = editor(doc('hello{<>}', mediaGroup(deletingMediaNode)));

        expect(pluginState.removeMediaNode()).to.equal(false);
      });
    });
  });

  it('should focus the editor after files are added to the document', async () => {
    const { editorView, pluginState } = editor(doc(p('')));
    await resolvedProvider;

    pluginState.handleNewMediaPicked({ id: 'foo' });
    expect(editorView.hasFocus()).to.be.equal(true);

    pluginState.handleNewMediaPicked({ id: 'bar' });
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

    const [node, transaction] = pluginState.insertFile({
      id: testFileId, status: 'uploading', fileName: 'foo.png', fileSize: 1234, fileMimeType: 'image/png'
    }, testCollectionName);
    editorView.dispatch(transaction);

    expect(node.attrs.__fileName).to.equal('foo.png');
    expect(node.attrs.__fileSize).to.equal(1234);
    expect(node.attrs.__fileMimeType).to.equal('image/png');
  });
});
