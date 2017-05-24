import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { DefaultMediaStateManager } from '@atlaskit/media-core';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import {
  baseKeymap,
  keymap,
  MediaPluginBehavior,
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,

  // nodeviews
  nodeViewFactory,
  ReactMediaGroupNode,
  ReactMediaNode,
  reactNodeViewPlugins,
} from '../../../../src';
import { undo, history } from '../../../../src/prosemirror';
import {
  blockquote,
  chaiPlugin,
  code_block,
  doc,
  h1,
  makeEditor,
  mediaGroup,
  media,
  nodeFactory,
  fixtures,
  p,
  sendKeyToPm,
  storyMediaProviderFactory,
  randomId,
  sleep,
} from '../../../../src/test-helper';
import { default as defaultSchema, compactSchema } from '../../../../src/test-helper/schema';
import { PositionedNode } from '../../../../src/nodeviews';

chai.use(chaiPlugin);

const noop = () => {};

describe('Media plugin', () => {
  const fixture = fixtures();
  const stateManager = new DefaultMediaStateManager();
  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const resolvedProvider = storyMediaProviderFactory(mediaTestHelpers, testCollectionName, stateManager);
  const testFileId = `temporary:${randomId()}`;

  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('mediaProvider', resolvedProvider);

  const editor = (doc: any, uploadErrorHandler?: () => void, behavior?: MediaPluginBehavior) => {
    behavior = behavior || 'default';
    const schema = (behavior === 'compact') ? compactSchema : defaultSchema;
    const addBaseKeymap = behavior !== 'compact';
    const plugins = [
      ...mediaPluginFactory(defaultSchema, { providerFactory, behavior, uploadErrorHandler }),
      ...reactNodeViewPlugins(schema),
      history(),
    ];

    plugins.push(history());

    if (behavior === 'compact') {
      const baseKeymapForCompactBehaviour = { ...baseKeymap };
      delete baseKeymapForCompactBehaviour.Enter;

      plugins.push(keymap(baseKeymapForCompactBehaviour));
    }

    return makeEditor({
      doc,
      schema,
      addBaseKeymap,
      plugins,
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
        media({ id: 'mock2', type: 'file', collection: testCollectionName }),
        media({ id: 'mock1', type: 'file', collection: testCollectionName }),
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

  describe('Compact behaviour', () => {
    const doc = nodeFactory(compactSchema.nodes.doc);
    const p = nodeFactory(compactSchema.nodes.paragraph);
    const mediaGroup = nodeFactory(compactSchema.nodes.mediaGroup);
    const media = (attrs: {
      id: string;
      type: 'file' | 'link';
      collection: string;
    }) => compactSchema.nodes.media.create(attrs);

    it('should not react to Enter keypress', () => {
      const { editorView } = editor(doc(p('te{<>}xt')), noop, 'compact');

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('should insert media on the second line', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')), noop, 'compact');

      insertFile(editorView, pluginState);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(media({ id: testFileId, type: 'file', collection: testCollectionName })),
        )
      );
    });
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

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    const firstMediaNode = insertFile(editorView, pluginState, firstTemporaryFileId);
    const secondMediaNode = insertFile(editorView, pluginState, secondTemporaryFileId);
    insertFile(editorView, pluginState, thirdTemporaryFileId);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: firstTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: secondTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
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
    pos = firstMediaNode.getPos();
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    // When removing multiple nodes with node view, ProseMirror performs the DOM update
    // asynchronously after a 20ms timeout. In order for the operations to succeed, we
    // must wait for the DOM reconciliation to conclude before proceeding.
    await sleep(100);

    pos = secondMediaNode.getPos();
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
        p()
      )
    );
  });
});
