import * as chai from 'chai';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import {
  mediaNodeView,
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,
  ToolbarButton,
  ToolbarMedia,
} from '@atlaskit/editor-core';
import {
  chaiPlugin,
  fixtures,
  makeEditor,
  storyMediaProviderFactory,
} from '@atlaskit/editor-core/dist/es5/test-helper';

import {
  blockquote,
  codeblock,
  doc,
  h1,
  media,
  mediaGroup,
  p,
} from './_schema-builder';
import Editor from '../src';
import schema from '../src/schema';

chai.use(chaiPlugin);

describe('media', () => {
  const resolvedProvider = storyMediaProviderFactory();

  describe('ui', () => {
    const rejectedProvider = Promise.reject(new Error('foo'));
    const noop = () => {};

    it('should show media icon if provider is set', async () => {
      const editor = mount(<Editor
        isExpandedByDefault
        mediaProvider={resolvedProvider}
        onCancel={noop}
        onSave={noop}
        onChange={noop}
      />);

      await resolvedProvider;
      expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(1);
    });

    it('should not show media icon if provider is not set', () => {
      const editor = mount(<Editor
        isExpandedByDefault
        onCancel={noop}
        onSave={noop}
        onChange={noop}
      />);

      expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
    });

    it('should not show media icon if provider setting promise has been rejected', async () => {
      const rejectedProvider = Promise.reject(new Error('foo'));

      const editor = mount(<Editor
        isExpandedByDefault
        mediaProvider={rejectedProvider}
        onCancel={noop}
        onSave={noop}
        onChange={noop}
      />);

      await rejectedProvider.catch(noop);
      expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
    });

    it('should hide media icon if provider setting promise has been updated to rejected', async () => {
      const editor = mount(<Editor
        isExpandedByDefault
        mediaProvider={resolvedProvider}
        onCancel={noop}
        onSave={noop}
        onChange={noop}
      />);

      // wait while the changes apply
      await resolvedProvider;

      editor.setProps({ mediaProvider: rejectedProvider });

      // wait while the changes apply
      await rejectedProvider.catch(noop);

      expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(0);
    });

    it('should show media icon if provider setting promise has been updated to resolved', async () => {
      const editor = mount(<Editor
        isExpandedByDefault
        mediaProvider={rejectedProvider}
        onCancel={noop}
        onSave={noop}
        onChange={noop}
      />);

      // wait while the changes apply
      await rejectedProvider.catch(noop);

      editor.setProps({ mediaProvider: resolvedProvider });

      // wait while the changes apply
      await resolvedProvider;

      expect(editor.find(ToolbarMedia).find(ToolbarButton)).to.have.length(1);
    });
  });

  describe('document structure', () => {
    const fixture = fixtures();

    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('mediaProvider', resolvedProvider);

    const editor = (doc: any) => makeEditor({
      doc,
      schema,
      plugins: mediaPluginFactory(schema, { providerFactory, behavior: 'default' }),
      nodeViews: {
        media: mediaNodeView(providerFactory)
      },
      place: fixture()
    });

    it(`should insert media node into the document after current paragraph node`, () => {
      const { editorView, pluginState } = editor(doc(p('text{<>}')));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p('text'),
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
        )
      ));
    });

    it(`should insert media node into the document after current heading node`, () => {
      const { editorView, pluginState } = editor(doc(h1('text{<>}')));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          h1('text'),
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
        )
      ));
    });

    it(`should insert media node into the document after current blockquote node`, () => {
      const { editorView, pluginState } = editor(doc(blockquote(p('text{<>}'))));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(blockquote(
          p('text'),
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' }))
        ))
      );
    });

    it(`should insert media node into the document after current codeblock node`, () => {
      const { editorView, pluginState } = editor(doc(codeblock()('text{<>}')));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          codeblock()('text'),
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })
        )
      ));
    });

    it('should prepend media node to existing media group', () => {
      const { editorView, pluginState } = editor(doc(
        p('text{<>}'),
        mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
      ));

      (pluginState as MediaPluginState).insertFile({ id: 'mock2' }, 'mock-collection');

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

    it('should replace paragraph with 0-length text inside with mediaGroup', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' }))
        )
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}'), p()));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
          p()
        )
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
      const { editorView, pluginState } = editor(doc(p(), p('{<>}')));

      (pluginState as MediaPluginState).insertFile({ id: 'mock' }, 'mock-collection');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(media({ id: 'mock', type: 'file', collection: 'mock-collection' })),
        )
      );
    });
  });
});
