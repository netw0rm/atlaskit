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
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { PositionedNode } from '../../../src/plugins/media';

chai.use(chaiPlugin);

describe('Media plugin', () => {
  const fixture = fixtures();
  const stateManager = new DefaultMediaStateManager();
  const defaultCollectionName = 'media-plugin-mock-collection';
  const resolvedProvider = storyMediaProviderFactory(defaultCollectionName, stateManager);
  const testFileId = `temporary:${Math.round(Math.random() * 1000)}`;

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
    const [node, transaction ] = pluginState.insertFile({ id }, 'mock-collection');
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
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it(`should insert media node into the document after current heading node`, () => {
    const { editorView, pluginState } = editor(doc(h1('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        h1('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it(`should insert media node into the document after current blockquote node`, () => {
    const { editorView, pluginState } = editor(doc(blockquote(p('text{<>}'))));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(blockquote(
        p('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' }))
      ))
    );
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView, pluginState } = editor(doc(code_block()('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        code_block()('text'),
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it('should prepend media node to existing media group', () => {
    const { editorView, pluginState } = editor(doc(
      p('text{<>}'),
      mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })),
    ));

    insertFile(editorView, pluginState, 'mock2');

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p('text{<>}'),
        mediaGroup(
          media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
          media({ id: testFileId, type: 'file', collection: 'mock-collection' }),
        )
      )
    );
  });

  it('should prepend media group to empty paragraph in an empty document', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })),
        p(),
      )
    );
  });

  it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}'), p()));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })),
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
        mediaGroup(media({ id: testFileId, type: 'file', collection: 'mock-collection' })),
      )
    );
  });

  it('should delete empty media group', () => {
    const { editorView } = editor(doc(
      mediaGroup(
        media({ id: 'mock', type: 'file', collection: 'mock-collection' }),
      ),
      p('text'),
    ));

    const { doc: document, tr } = editorView.state;
    const mediaGroupNode = document.firstChild!;
    editorView.dispatch(tr.delete(0, mediaGroupNode.nodeSize));

    expect(editorView.state.doc).to.deep.equal(doc(p('text')));
  });

  it('should delete last empty media group and replace it with paragraph', () => {
    const { editorView } = editor(doc(
      mediaGroup(
        media({ id: 'mock', type: 'file', collection: 'mock-collection' }),
      ),
    ));

    const { doc: document, tr } = editorView.state;
    const mediaGroupNode = document.firstChild!;
    editorView.dispatch(tr.delete(0, mediaGroupNode.nodeSize));

    expect(editorView.state.doc).to.deep.equal(doc(p()));
  });

  it('should delete an empty media group when other media groups are not empty', () => {
    const { editorView } = editor(doc(
      mediaGroup(
        media({ id: 'mock', type: 'file', collection: 'mock-collection' }),
      ),
      mediaGroup(
        media({ id: 'mock1', type: 'file', collection: 'mock-collection' }),
        media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
      ),
    ));

    const { doc: document, tr } = editorView.state;
    const mediaGroupNode = document.firstChild!;
    editorView.dispatch(tr.delete(0, mediaGroupNode.nodeSize));

    expect(editorView.state.doc).to.deep.equal(doc(
      mediaGroup(
        media({ id: 'mock1', type: 'file', collection: 'mock-collection' }),
        media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
      ),
    ));
  });

  it('should not delete non-empty media group', () => {
    const { editorView } = editor(doc(
      mediaGroup(
        media({ id: 'mock1', type: 'file', collection: 'mock-collection' }),
        media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
      ),
    ));

    const { doc: document, tr } = editorView.state;
    const mediaNode = document.firstChild!.firstChild!;
    editorView.dispatch(tr.delete(1, mediaNode.nodeSize));

    expect(editorView.state.doc).to.deep.equal(doc(
      mediaGroup(
        media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
      ),
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

  // TODO: re-enable after merging https://bitbucket.org/atlassian/atlaskit/pull-requests/2496/ed-1536-remove-empty-mediagroup/diff#comment-35691560
  it.skip('should remove failed uploads from the document', async () => {
    const handler = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);

    await resolvedProvider;

    insertFile(editorView, pluginState);

    stateManager.updateState(testFileId, {
      id: testFileId,
      status: 'uploading'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(media({ id: testFileId, type: 'file', collection: defaultCollectionName })),
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

  it('should cancel uploads after media item is removed', async () => {
    const handler = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);
    await resolvedProvider;

    const firstMediaNode = insertFile(editorView, pluginState, 'temporary: file1');
    insertFile(editorView, pluginState, 'temporary: file1');
    insertFile(editorView, pluginState, 'temporary: file2');

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: 'temporary: file1', type: 'file', collection: defaultCollectionName }),
          media({ id: 'temporary: file1', type: 'file', collection: defaultCollectionName }),
          media({ id: 'temporary: file2', type: 'file', collection: defaultCollectionName }),
        ),
      )
    );

    stateManager.subscribe('temporary: file1', handler);
    const pos = firstMediaNode.getPos();
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));

    expect(handler.calledOnce).to.eq(true, 'State Manager should receive "cancelled" status');
    expect(handler.calledWithExactly({
      id: 'temporary: file1',
      status: 'cancelled'
    })).to.eq(true, 'State Manager should receive "cancelled" status');

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: 'temporary: file1', type: 'file', collection: defaultCollectionName }),
          media({ id: 'temporary: file1', type: 'file', collection: defaultCollectionName }),
          media({ id: 'temporary: file2', type: 'file', collection: defaultCollectionName }),
        ),
      ),
      'All instances of the cancelled media should be removed from the document'
    );
  });
});
