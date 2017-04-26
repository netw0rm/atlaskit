import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  mediaNodeView,
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,
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

chai.use(chaiPlugin);

describe('Media plugin', () => {
  const fixture = fixtures();
  const resolvedProvider = storyMediaProviderFactory();

  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('mediaProvider', resolvedProvider);

  const editor = (doc: any) => makeEditor({
    doc,
    plugins: mediaPluginFactory(defaultSchema, { providerFactory, behavior: 'default' }),
    nodeViews: {
      media: mediaNodeView(providerFactory)
    },
    place: fixture()
  });

  const insertFile = (editorView: any, pluginState: MediaPluginState, id = 'mock') => {
    const [, transaction ] = pluginState.insertFile({ id }, 'mock-collection');
    editorView.dispatch(transaction);
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
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it(`should insert media node into the document after current heading node`, () => {
    const { editorView, pluginState } = editor(doc(h1('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        h1('text'),
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it(`should insert media node into the document after current blockquote node`, () => {
    const { editorView, pluginState } = editor(doc(blockquote(p('text{<>}'))));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(blockquote(
        p('text'),
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' }))
      ))
    );
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView, pluginState } = editor(doc(code_block()('text{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        code_block()('text'),
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
      )
    ));
  });

  it('should prepend media node to existing media group', () => {
    const { editorView, pluginState } = editor(doc(
      p('text{<>}'),
      mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
    ));

    insertFile(editorView, pluginState, 'mock2');

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p('text{<>}'),
        mediaGroup(
          media({ id: 'mock2', type: 'file', collection: 'mock-collection' }),
          media({ id: 'mock', type: 'file', collection: 'mock-collection' }),
        )
      )
    );
  });

  it('should prepend media group to empty paragraph in an empty document', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
        p(),
      )
    );
  });

  it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
    const { editorView, pluginState } = editor(doc(p('{<>}'), p()));

    insertFile(editorView, pluginState);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
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
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
      )
    );
  });

  // it('allows an image to be added at the current collapsed selection', () => {
  //   const { editorView, pluginState } = editor(doc(p('{<>}')));

  //   pluginState.addImage(editorView)({ src: testImgSrc });

  //   expect(editorView.state.doc).to.deep.equal(doc(p(testImg())));
  // });

  // it('should get current state immediately once subscribed', () => {
  //   const { pluginState } = editor(doc(p('{<>}', testImg())));
  //   const spy = sinon.spy();
  //   pluginState.subscribe(spy);

  //   expect(spy.callCount).to.equal(1);
  //   expect(pluginState).to.have.property('active', false);
  //   expect(pluginState).to.have.property('enabled', true);
  //   expect(pluginState).to.have.property('src', undefined);
  //   expect(pluginState).to.have.property('element', undefined);
  // });

  // it('emits a change when an image is selected', () => {
  //   const { editorView, pluginState, sel } = editor(doc(p('{<>}', testImg())));
  //   const spy = sinon.spy();
  //   pluginState.subscribe(spy);

  //   setNodeSelection(editorView, sel);

  //   expect(spy.callCount).to.equal(2);
  // });

  // it('does not emits a change when unsubscribe', () => {
  //   const { editorView, pluginState, sel } = editor(doc(p('{<>}', testImg())));
  //   const spy = sinon.spy();
  //   pluginState.subscribe(spy);
  //   pluginState.unsubscribe(spy);

  //   setNodeSelection(editorView, sel);

  //   expect(spy.callCount).to.equal(1);
  // });

  // it('does not emit multiple changes when an image is not selected', () => {
  //   const { editorView, pluginState, refs } = editor(doc(p('{<>}t{a}e{b}st', testImg())));
  //   const { a, b } = refs;
  //   const spy = sinon.spy();
  //   pluginState.subscribe(spy);

  //   setTextSelection(editorView, a);
  //   setTextSelection(editorView, b);

  //   expect(spy.callCount).to.equal(1);
  // });

  // it('does not emit multiple changes when an image is selected multiple times', () => {
  //   const { pluginState } = editor(doc(p('{<>}', testImg())));
  //   const spy = sinon.spy();

  //   pluginState.subscribe(spy);

  //   expect(spy.callCount).to.equal(1);
  // });

  // it('emits a change event when selection leaves an image', () => {
  //   const { editorView, pluginState, sel, refs } = editor(doc(p('{a}test{<>}', testImg())));
  //   const { a } = refs;
  //   const spy = sinon.spy();
  //   setNodeSelection(editorView, sel);
  //   pluginState.subscribe(spy);

  //   setTextSelection(editorView, a);

  //   expect(spy.callCount).to.equal(2);
  // });

  // it('permits an image to be added when an image is selected', () => {
  //   const { editorView, pluginState, sel } = editor(doc(p('{<>}', testImg())));
  //   setNodeSelection(editorView, sel);

  //   pluginState.addImage(editorView)({ src: testImgSrc });

  //   expect(editorView.state.doc).to.deep.equal(doc(p(testImg(), testImg())));
  // });

  // it('permits an image to be added when there is selected text', () => {
  //   const { editorView, pluginState } = editor(doc(p('{<}hello{>}')));

  //   pluginState.addImage(editorView)({ src: testImgSrc });

  //   expect(editorView.state.doc).to.deep.equal(doc(p('hello', testImg())));
  // });

  // it('does not permit an image to be added when the state is disabled', () => {
  //   const { editorView, pluginState } = editor(doc(code_block()('{<>}')));

  //   pluginState.addImage(editorView)({ src: testImgSrc });

  //   expect(editorView.state.doc).to.deep.equal(doc(code_block()()));
  // });

  // it('does not permit an image to be removed at a collapsed text selection', () => {
  //   const { editorView, pluginState } = editor(doc(p('test{<>}')));

  //   pluginState.removeImage(editorView);
  // });

  // it('can remove a selected image', () => {
  //   const { editorView, pluginState, sel } = editor(doc(p('{<>}', testImg())));
  //   setNodeSelection(editorView, sel);

  //   pluginState.removeImage(editorView);

  //   expect(editorView.state.doc).to.deep.equal(doc(p()));
  // });

  // it('can update a selected image', () => {
  //   const { editorView, pluginState, sel } = editor(doc(p('{<>}', testImg())));
  //   setNodeSelection(editorView, sel);

  //   pluginState.updateImage(editorView)({ src: 'atlassian.png' });

  //   expect(editorView.state.doc).to.deep.equal(doc(p(img({ src: 'atlassian.png' }))));
  // });
});
