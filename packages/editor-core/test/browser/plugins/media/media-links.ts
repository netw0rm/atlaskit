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
  a,
  blockquote,
  randomId,
  getLinkCreateContextMock,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { insertLinks, detectLinkRangesInSteps } from '../../../../src/plugins/media/media-links';

chai.use(chaiPlugin);

describe('media-links', () => {
  const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
  const testLinkId = `mock-link-id${randomId()}`;
  const linkCreateContextMock = getLinkCreateContextMock(testLinkId);
  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    schema: defaultSchema,
  });

  describe('detectLinkRangesInSteps', () => {
    context('when includes replace step with links', () => {
      it('returns ranges with links', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const nodes = link1.concat(link2);
        const length = nodes.reduce((length, node) => length + (node.text ? node.text.length : 0), 0);
        const tr = state.tr.replaceWith(sel, sel, nodes);

        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([
          { start: sel, end: sel + length, urls: ['www.google.com', 'www.baidu.com'] }
        ]);
      });

      it('detects links inside nested content', () => {
        const { editorView, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const node = blockquote(p(link1, link2));
        const tr = state.tr.replaceWith(sel - 1, sel + 1, node);
        let length = 0;
        node.firstChild!.content.forEach(node => { length += node.text ? node.text.length : 0; });

        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([
          { start: sel - 1, end: sel + length + 3, urls: ['www.google.com', 'www.baidu.com'] }
        ]);
      });

      context('when included link has no href', () => {
        it('ignore links without href', () => {
          const { editorView, sel } = editor(doc(p('{<>}')));
          const { state } = editorView;
          const link1 = a({ href: '' })('google');
          const link2 = a({ href: 'www.baidu.com' })('baidu');
          const nodes = link1.concat(link2);
          const length = nodes.reduce((length, node) => length + (node.text ? node.text.length : 0), 0);
          const tr = state.tr.replaceWith(sel, sel, nodes);

          const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

          expect(linksRanges).to.deep.equal([
            { start: sel, end: sel + length, urls: ['www.baidu.com'] }
          ]);
        });
      });
    });

    context('when includes add mark step with links', () => {
      it('returns ranges with links', () => {
        const text = 'hello';
        const { editorView, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const linkMark = state.schema.marks.link.create({ href: 'www.atlassian.com' });
        const tr = state.tr.addMark(sel - text.length, sel, linkMark);

        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([
          { start: sel - text.length, end: sel, urls: ['www.atlassian.com'] },
        ]);
      });

      context('when included link has no href', () => {
        it('ignore links without href', () => {
          const text = 'hello';
          const { editorView, sel } = editor(doc(p(`${text}{<>}`)));
          const { state } = editorView;
          const linkMark = state.schema.marks.link.create({ href: '' });
          const tr = state.tr.addMark(sel - text.length, sel, linkMark);

          const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

          expect(linksRanges).to.deep.equal([]);
        });
      });
    });

    context('when both replace step and add mark step have links', () => {
      it('returns ranges with links', () => {
        const text = 'hello';
        const { editorView, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const link1 = a({ href: 'www.google.com' })('google');
        const link2 = a({ href: 'www.baidu.com' })('baidu');
        const nodes = link1.concat(link2);
        const linkMark = state.schema.marks.link.create({ href: 'www.atlassian.com' });
        const tr = state.tr
          .replaceWith(sel, sel, nodes)
          .addMark(sel - text.length, sel, linkMark);

        const length1 = nodes.reduce((length, node) => length + (node.text ? node.text.length : 0), 0);
        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([
          { start: sel, end: sel + length1, urls: ['www.google.com', 'www.baidu.com'] },
          { start: sel - text.length, end: sel, urls: ['www.atlassian.com'] },
        ]);
      });
    });

    context('when remove step with links', () => {
      it('returns empty ranges', () => {
        const text = 'hello';
        const href = 'www.google.com';
        const link = a({ href })(`${text}{<>}`);
        const { editorView, sel } = editor(doc(p(link)));
        const { state } = editorView;
        const tr = state.tr
          .removeMark(sel - text.length, sel, state.schema.marks.link.create({ href }));

        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([]);
      });
    });

    context('when neither replace step nor add mark step have links', () => {
      it('returns empty ranges', () => {
        const text = 'hello';
        const { editorView, sel } = editor(doc(p(`${text}{<>}`)));
        const { state } = editorView;
        const newText = state.schema.text('yay');
        const strongMark = state.schema.marks.strong.create();
        const tr = state.tr
          .replaceWith(sel, sel, newText)
          .addMark(sel - text.length, sel, strongMark);

        const linksRanges = detectLinkRangesInSteps(tr, editorView.state.schema.marks.link);

        expect(linksRanges).to.deep.equal([]);
      });
    });
  });

  describe('insertLinks', () => {
    context('when no links are stored in link ranges', () => {
      it('does nothing', () => {
        const text = 'www.google.com';
        const { editorView } = editor(doc(p(`${text} {<>}`)));

        insertLinks(editorView, [], linkCreateContextMock, testCollectionName);

        expect(editorView.state.doc).to.deep.equal(doc(p(`${text} `)));
      });
    });

    context('when there is a link stored in link ranges', () => {
      context('there is no existing media group below', () => {
        it('creates a link card below where is the link created', async () => {
          const link = 'www.google.com';
          const { editorView, sel } = editor(doc(p(`${link} {<>}`)));

          // -1 for space, simulate the scenario of autoformatting link
          await insertLinks(
            editorView,
            [
              { start: sel - link.length - 1, end: sel, urls: [link] }
            ],
            linkCreateContextMock,
            testCollectionName,
          );

          expect(editorView.state.doc).to.deep.equal(doc(
            p(`${link} `),
            mediaGroup(media({ id: testLinkId, type: 'link', collection: testCollectionName })),
            p(),
          ));
        });

        context('lastest pos in range is out of doc range', () => {
          it('creates a link card at the end of doc', async () => {
            const link = 'www.google.com';
            const { editorView, sel } = editor(doc(p(`${link} {<>}`)));

            // -1 for space, simulate the scenario of autoformatting link
            await insertLinks(
              editorView,
              [
                { start: sel - link.length - 1, end: 1000, urls: [link] }
              ],
              linkCreateContextMock,
              testCollectionName,
            );

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link} `),
              mediaGroup(media({ id: testLinkId, type: 'link', collection: testCollectionName })),
              p(),
            ));
          });
        });

        context('not at the end of the doc', () => {
          it('does not create a new p at the end of doc', async () => {
            const link = 'www.google.com';
            const { editorView, sel } = editor(doc(
              p(`${link} {<>}`),
              p('hello'),
            ));

            // -1 for space, simulate the scenario of autoformatting link
            await insertLinks(
              editorView,
              [
                { start: sel - link.length - 1, end: sel, urls: [link] }
              ],
              linkCreateContextMock,
              testCollectionName,
            );

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link} `),
              mediaGroup(media({ id: testLinkId, type: 'link', collection: testCollectionName })),
              p('hello'),
            ));
          });
        });
      });

      context('there is an existing media group below', () => {
        it('creates a link card to join the existing media group below', async () => {
          const link1 = 'www.google.com';
          const link2 = 'www.baidu.com';
          const { editorView, sel } = editor(doc(
            p(`${link1} ${link2} {<>}`),
            mediaGroup(media({ id: testLinkId, type: 'link', collection: testCollectionName })),
          ));

          // -1 for space, simulate the scenario of autoformatting link
          await insertLinks(
            editorView,
            [
              { start: sel - link2.length - 1, end: sel, urls: [link2] }
            ],
            linkCreateContextMock,
            testCollectionName,
          );

          expect(editorView.state.doc).to.deep.equal(doc(
            p(`${link1} ${link2} `),
            mediaGroup(
              media({ id: testLinkId, type: 'link', collection: testCollectionName }),
              media({ id: testLinkId, type: 'link', collection: testCollectionName }),
            )
          ));
        });

        context('lastest pos in range is out of doc range', () => {
          it('creates a link card to join the existing media group below', async () => {
            const link1 = 'www.google.com';
            const link2 = 'www.baidu.com';
            const { editorView, sel } = editor(doc(
              p(`${link1} ${link2} {<>}`),
              mediaGroup(media({ id: testLinkId, type: 'link', collection: testCollectionName })),
            ));

            // -1 for space, simulate the scenario of autoformatting link
            await insertLinks(
              editorView,
              [
                { start: sel - link2.length - 1, end: 1000, urls: [link2] }
              ],
              linkCreateContextMock,
              testCollectionName,
            );

            expect(editorView.state.doc).to.deep.equal(doc(
              p(`${link1} ${link2} `),
              mediaGroup(
                media({ id: testLinkId, type: 'link', collection: testCollectionName }),
                media({ id: testLinkId, type: 'link', collection: testCollectionName }),
              )
            ));
          });
        });
      });
    });

    context('when there are multiple links in link ranges', () => {
      it('creates link cards below the range where link was detected', async () => {
        const link1 = 'www.google.com';
        const link2 = 'www.baidu.com';
        const link3 = 'www.atlassian.com';
        const { editorView } = editor(doc(
          p(`${link1}`),
          p(`${link2} ${link3}`),
          p('hello')
        ));

        const startOfLink1 = 1;
        const endOfLink1 = startOfLink1 + link1.length;
        const startOfLink2 = endOfLink1 + 2;
        const endOfLink2 = startOfLink2 + link2.length;

        // -1 for space, simulate the scenario of autoformatting link
        await insertLinks(
          editorView,
          [
            { start: startOfLink1, end: endOfLink1, urls: [link1] },
            { start: startOfLink2, end: endOfLink2, urls: [link2, link3] },
          ],
          linkCreateContextMock,
          testCollectionName,
        );

        expect(editorView.state.doc).to.deep.equal(doc(
          p(`${link1}`),
          mediaGroup(
            media({ id: testLinkId, type: 'link', collection: testCollectionName }),
          ),
          p(`${link2} ${link3}`),
          mediaGroup(
            media({ id: testLinkId, type: 'link', collection: testCollectionName }),
            media({ id: testLinkId, type: 'link', collection: testCollectionName }),
          ),
          p('hello'),
        ));
      });
    });
  });
});
