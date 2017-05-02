import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  mediaNodeView,
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,
  DefaultMediaStateManager,
} from '../../../src';
import {
  blockquote,
  chaiPlugin,
  code_block,
  doc,
  h1,
  makeEditor,
  mediaGroup,
  media,
  fixtures,
  p,
  storyMediaProviderFactory,
  randomId,
  sleep,
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { PositionedNode } from '../../../src/plugins/media';

chai.use(chaiPlugin);

describe('Media plugin', () => {
  const fixture = fixtures();
  const stateManager = new DefaultMediaStateManager();
  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const resolvedProvider = storyMediaProviderFactory(testCollectionName, stateManager);
  const testFileId = `temporary:${randomId()}`;

  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('mediaProvider', resolvedProvider);

  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor({
    doc,
    plugins: mediaPluginFactory(defaultSchema, { providerFactory, behavior: 'default', uploadErrorHandler }),
    nodeViews: {
      media: mediaNodeView(providerFactory)
    },
    place: fixture()
  });

  const insertFile = (editorView: any, pluginState: MediaPluginState, id = testFileId) => {
    const [node, transaction] = pluginState.insertFile({ id, status: 'uploading' }, testCollectionName);
    editorView.dispatch(transaction);

    return node as PositionedNode;
  };

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
    const firstTemporaryFileId = `temporary:${randomId()}`;
    const secondTemporaryFileId = `temporary:${randomId()}`;
    const thirdTemporaryFileId = `temporary:${randomId()}`;
    const fourthTemporaryFileId = `temporary:${randomId()}`;

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    const firstMediaNode = insertFile(editorView, pluginState, firstTemporaryFileId);
    const secondMediaNode = insertFile(editorView, pluginState, secondTemporaryFileId);
    const thirdMediaNode = insertFile(editorView, pluginState, thirdTemporaryFileId);
    insertFile(editorView, pluginState, fourthTemporaryFileId);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: fourthTemporaryFileId, type: 'file', collection: testCollectionName }),
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

    stateManager.updateState(thirdTemporaryFileId, {
      id: thirdTemporaryFileId,
      status: 'unfinalized'
    });

    stateManager.subscribe(firstTemporaryFileId, spy);
    stateManager.subscribe(secondTemporaryFileId, spy);
    stateManager.subscribe(thirdTemporaryFileId, spy);
    stateManager.subscribe(fourthTemporaryFileId, spy);

    let pos: number;
    pos = firstMediaNode.getPos();
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    // When removing multiple nodes with node view, ProseMirror performs the DOM update
    // asynchronously after a 20ms timeout. In order for the operations to succeed, we
    // must wait for the DOM reconciliation to conclude before proceeding.
    await sleep(100);

    pos = secondMediaNode.getPos();
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    await sleep(100);

    pos = thirdMediaNode.getPos();
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    await sleep(100);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: fourthTemporaryFileId, type: 'file', collection: testCollectionName }),
        ),
      )
    );

    expect(spy.callCount).to.eq(3, 'State Manager should receive "cancelled" status');

    expect(spy.calledWithExactly({
      id: firstTemporaryFileId,
      status: 'cancelled'
    })).to.eq(true, 'State Manager should emit "cancelled" status');

    expect(spy.calledWithExactly({
      id: secondTemporaryFileId,
      status: 'cancelled'
    })).to.eq(true, 'State Manager should emit "cancelled" status');

    expect(spy.calledWithExactly({
      id: thirdTemporaryFileId,
      status: 'cancelled'
    })).to.eq(true, 'State Manager should emit "cancelled" status');
  });
});
