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
  randomId,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import {
  undo,
  history,
  NodeSelection,
  TextSelection,
} from '../../../../src/prosemirror';
import { removeMediaNode } from '../../../../src/plugins/media/media-common';
import { setNodeSelection} from '../../../../src/utils';

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

  describe('removeMediaNode', () => {
    context('media node is selected', () => {
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
          const positionOfDeletingNode = sel + 3;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

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
          const positionOfDeletingNode = sel + 3;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

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
          const positionOfDeletingNode = sel + 3;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

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
          const positionOfDeletingNode = sel + 3;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

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
          it('selects the media node to the back', () => {
            const deletingMediaNode = media({ id: 'media1', type: 'file', collection: testCollectionName });
            const { editorView, sel } = editor(doc(
              p('hello{<>}'),
              mediaGroup(
                deletingMediaNode,
                media({ id: 'media2', type: 'file', collection: testCollectionName }),
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
              p('world')
            ));
            const positionOfDeletingNode = sel + 2;
            setNodeSelection(editorView, positionOfDeletingNode);

            removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

            expect(editorView.state.selection.from).to.equal(sel);
          });
        });

        context('when it is at the beginning of the document', () => {
          it('selects the media node to the back', () => {
            const deletingMediaNode = media({ id: 'media1', type: 'file', collection: testCollectionName });
            const { editorView } = editor(doc(
              mediaGroup(
                deletingMediaNode,
                media({ id: 'media2', type: 'file', collection: testCollectionName }),
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
              p('hello')
            ));
            const positionOfDeletingNode = 1;
            setNodeSelection(editorView, positionOfDeletingNode);

            removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

            const selectedNode = (editorView.state.selection as NodeSelection).node;
            expect(selectedNode && selectedNode.attrs.id).to.equal('media2');
          });
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
          const positionOfDeletingNode = 2;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

          const selectedNode = (editorView.state.selection as NodeSelection).node;

          expect(selectedNode && selectedNode.attrs.id).to.equal('media1');
        });
      });


      context('when selected node and deleting node is not the same node', () => {
        it('does not change selection', () => {
          const deletingMediaNode = media({ id: 'media2', type: 'file', collection: testCollectionName });
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            )
          ));
          const positionOfDeletingNode = 2;
          setNodeSelection(editorView, positionOfDeletingNode + 1);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

          const selectedNode = (editorView.state.selection as NodeSelection).node;

          expect(selectedNode && selectedNode.attrs.id).to.equal('media3');
        });

        it('removes the node', () => {
          const deletingMediaNode = media({ id: 'media2', type: 'file', collection: testCollectionName });
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              deletingMediaNode,
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            )
          ));
          const positionOfDeletingNode = 2;
          setNodeSelection(editorView, positionOfDeletingNode + 1);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

          expect(editorView.state.doc).to.deep.equal(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            )
          ));
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
          const positionOfDeletingNode = 3;
          setNodeSelection(editorView, positionOfDeletingNode);

          removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

          const selectedNode = (editorView.state.selection as NodeSelection).node;

          expect(selectedNode && selectedNode.attrs.id).to.equal('media2');
        });
      });

      context('when selected node is the only media node', () => {
        context('when it is not at the beginning of the document', () => {
          it('puts cursor to the beginging of the paragraph that replaced the media group', () => {
            const deletingMediaNode = media({ id: 'media', type: 'file', collection: testCollectionName });
            const { editorView } = editor(doc(
              p('hello'),
              mediaGroup(
                deletingMediaNode,
              ),
              p('world')
            ));

            const positionOfDeletingNode = p('hello').nodeSize + 1;
            setNodeSelection(editorView, positionOfDeletingNode);

            removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

            expect(editorView.state.selection instanceof TextSelection).to.equal(true);
            expect(editorView.state.selection.from).to.equal(positionOfDeletingNode);
          });
        });

        context('when it is at the beginning of the document', () => {
          it('puts cursor to the beginging of the document', () => {
            const deletingMediaNode = media({ id: 'media', type: 'file', collection: testCollectionName });
            const { editorView } = editor(doc(
              mediaGroup(
                deletingMediaNode,
              ),
              p('hello')
            ));

            const positionOfDeletingNode = 1;
            setNodeSelection(editorView, positionOfDeletingNode);

            removeMediaNode(editorView, deletingMediaNode, () => positionOfDeletingNode);

            expect(editorView.state.selection instanceof TextSelection).to.equal(true);
            expect(editorView.state.selection.from).to.equal(positionOfDeletingNode);
          });
        });
      });
    });
  });
});
