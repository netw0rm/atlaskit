import * as assert from 'assert';
import * as chai from 'chai';
import { expect } from 'chai';
import {
  MediaPluginState,
} from '../../../../src';
import {
  chaiPlugin,
  doc,
  makeEditor,
  mediaGroup,
  media,
  p,
  hr,
  mention,
  randomId,
  setNodeSelection,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { undo, history, NodeSelection } from '../../../../src/prosemirror';
import { handleMediaNodeRemoval } from '../../../../src/plugins/media/media-common';

chai.use(chaiPlugin);

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

describe('media-common', () => {
  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    plugins: [
      history(),
    ],
    schema: defaultSchema,
  });

  describe('handleMediaNodeRemoval', () => {
    const temporaryFileId = `temporary:${randomId()}`;

    context('when it is a temporary file', () => {
      const deletingMediaNodeId = temporaryFileId;
      const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });

      it('removes the media node', () => {
        const { editorView, sel } = editor(
          doc(
            p('hello{<>}'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
            ),
          ),
        );

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => sel + 3);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p('hello'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
            ),
          ));
      });

      it('is not able to undo', () => {
        const { editorView, sel } = editor(
          doc(
            p('hello{<>}'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
            ),
          ),
        );

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => sel + 3);

        undo(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).to.deep.equal(doc(
          p('hello'),
          mediaGroup(
            media({ id: 'media1', type: 'file', collection: testCollectionName }),
          ),
        ));
      });
    });

    context('when it is uploaded', () => {
      const deletingMediaNodeId = 'media2';
      const deletingMediaNode = media({ id: deletingMediaNodeId, type: 'file', collection: testCollectionName });

      it('removes the media node', () => {
        const { editorView, sel } = editor(
          doc(
            p('hello{<>}'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
            ),
          ),
        );

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => sel + 3);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p('hello'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
            )
          ));
      });

      it('is able to undo', () => {
        const { editorView, sel } = editor(
          doc(
            p('hello{<>}'),
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
            ),
          ),
        );

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => sel + 3);

        undo(editorView.state, editorView.dispatch);

        expect(editorView.state.doc).to.deep.equal(doc(
          p('hello'),
          mediaGroup(
            media({ id: 'media1', type: 'file', collection: testCollectionName }),
            deletingMediaNode,
          ),
        ));
      });
    });

    context('when selected node is the first media node', () => {
      context('when it is not at the beginning of the document', () => {

      });

      context('when it is at the beginning of the document', () => {
      });
    });

    context('when selected node is the middle media node', () => {
      it('selects the media node in the front', () => {
        const deletingMediaNode = media({ id: 'media2', type: 'file', collection: testCollectionName });
        const { editorView } = editor(doc(
          mediaGroup(
            media({ id: 'media1', type: 'file', collection: testCollectionName }),
            deletingMediaNode,
            media({ id: 'media3', type: 'file', collection: testCollectionName }),
          )
        ));

        const positionOfMiddleMediaNode = 2;
        setNodeSelection(editorView, positionOfMiddleMediaNode);

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => positionOfMiddleMediaNode);

        const selectedNode = (editorView.state.selection as NodeSelection).node;

        expect(selectedNode && selectedNode.attrs.id).to.equal('media1');
      });
    });

    context('when selected node is the last media node', () => {
      it('selects the media node in the front', () => {
        const deletingMediaNode = media({ id: 'media3', type: 'file', collection: testCollectionName });
        const { editorView } = editor(doc(
          mediaGroup(
            media({ id: 'media1', type: 'file', collection: testCollectionName }),
            media({ id: 'media2', type: 'file', collection: testCollectionName }),
            deletingMediaNode,
          )
        ));

        const positionOfMiddleMediaNode = 3;
        setNodeSelection(editorView, positionOfMiddleMediaNode);

        handleMediaNodeRemoval(editorView, deletingMediaNode, () => positionOfMiddleMediaNode);

        const selectedNode = (editorView.state.selection as NodeSelection).node;

        expect(selectedNode && selectedNode.attrs.id).to.equal('media2');
      });
    });
  });

  context('when selected node is the only media node', () => {
    context('when it is not at the beginning of the document', () => {

    });

    context('when it is at the beginning of the document', () => {
    });
  });
});
