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
import { splitMediaGroup } from '../../../../src/plugins/media/media-common';

chai.use(chaiPlugin);

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

describe('media-common', () => {
  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    schema: defaultSchema,
  });

  describe('splitMediaGroup', () => {
    context('when selection is a media node', () => {
      it('returns true', () => {
        const { editorView } = editor(doc(
          mediaGroup(
            media({ id: 'media', type: 'file', collection: testCollectionName })
          ),
          p('text'),
        ));
        const positionOfFirstMediaNode = 1;
        setNodeSelection(editorView, positionOfFirstMediaNode);

        const result = splitMediaGroup(editorView);

        expect(result).to.equal(true);
      });

      context('when media node is the first one in media group', () => {
        it('removes the selected media node and insert a new p', () => {
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              media({ id: 'media2', type: 'file', collection: testCollectionName }),
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
          const positionOfFirstMediaNode = 1;
          setNodeSelection(editorView, positionOfFirstMediaNode);

          splitMediaGroup(editorView);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p(),
              mediaGroup(
                media({ id: 'media2', type: 'file', collection: testCollectionName }),
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
              p('text'),
            )
          );
        });
      });

      context('when media node in the middle of a media group', () => {
        it('removes the selected media node and insert a new p', () => {
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              media({ id: 'media2', type: 'file', collection: testCollectionName }),
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
          const positionOfMiddleMediaNode = 2;
          setNodeSelection(editorView, positionOfMiddleMediaNode);

          splitMediaGroup(editorView);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              mediaGroup(
                media({ id: 'media1', type: 'file', collection: testCollectionName }),
              ),
              p(),
              mediaGroup(
                media({ id: 'media3', type: 'file', collection: testCollectionName }),
              ),
              p('text'),
            )
          );
        });
      });

      context('when media node is the last one in the media group', () => {
        it('removes the selected media node', () => {
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media1', type: 'file', collection: testCollectionName }),
              media({ id: 'media2', type: 'file', collection: testCollectionName }),
              media({ id: 'media3', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
          const positionOfLastMediaNode = 3;
          setNodeSelection(editorView, positionOfLastMediaNode);

          splitMediaGroup(editorView);
          expect(editorView.state.doc).to.deep.equal(
            doc(
              mediaGroup(
                media({ id: 'media1', type: 'file', collection: testCollectionName }),
                media({ id: 'media2', type: 'file', collection: testCollectionName }),
              ),
              p('text'),
            )
          );

          expect(editorView.state.doc).to.deep.equal(
            doc(
              mediaGroup(
                media({ id: 'media1', type: 'file', collection: testCollectionName }),
                media({ id: 'media2', type: 'file', collection: testCollectionName }),
              ),
              p('text'),
            )
          );
        });
      });

      context('when media node is the only one in the media group', () => {
        it('removes the whole media group', () => {
          const { editorView } = editor(doc(
            mediaGroup(
              media({ id: 'media', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
          const positionOfMiddleMediaNode = 1;
          setNodeSelection(editorView, positionOfMiddleMediaNode);

          splitMediaGroup(editorView);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('text'),
            )
          );
        });
      });

    });

    context('when is text selection', () => {
      it('returns false', () => {
        const { editorView } = editor(doc(
          p('hello{<>}'),
          mediaGroup(
            media({ id: 'media', type: 'file', collection: testCollectionName }),
          ),
          p('text'),
        ));

        const result = splitMediaGroup(editorView);

        expect(result).to.equal(false);
      });

      it('does nothing', () => {
        const { editorView } = editor(doc(
          p('hello'),
          mediaGroup(
            media({ id: 'media', type: 'file', collection: testCollectionName }),
          ),
          p('te{<>}xt'),
        ));

        splitMediaGroup(editorView);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p('hello'),
            mediaGroup(
              media({ id: 'media', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          )
        );
      });
    });

    context('when is non media node selection', () => {
      it('returns false', () => {
        const { editorView } = editor(
          doc(
            hr,
            mediaGroup(
              media({ id: 'media', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
        setNodeSelection(editorView, 0);

        const result = splitMediaGroup(editorView);

        expect(result).to.equal(false);
      });

      it('does nothing', () => {
        const { editorView } = editor(
          doc(
            p(
              mention({ id: 'foo1', text: '@bar1' })
            ),
            mediaGroup(
              media({ id: 'media', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          ));
        setNodeSelection(editorView, 1);

        splitMediaGroup(editorView);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p(
              mention({ id: 'foo1', text: '@bar1' })
            ),
            mediaGroup(
              media({ id: 'media', type: 'file', collection: testCollectionName }),
            ),
            p('text'),
          )
        );
      });
    });
  });
});
