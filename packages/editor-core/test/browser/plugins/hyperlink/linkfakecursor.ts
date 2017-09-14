import * as chai from 'chai';
import { expect } from 'chai';
import { TextSelection, Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { Slice } from 'prosemirror-model';
import hyperlinkPlugins, { HyperlinkState } from '../../../../src/plugins/hyperlink';
import { chaiPlugin, doc, makeEditor, p as paragraph } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { addLinkFakeCursor, removeLinkFakeCursor, LinkFakeCursor, drawLinkFakeCursor, LinkFakeBookmark } from '../../../../src/plugins/hyperlink/linkfakecursor';

chai.use(chaiPlugin);

describe('linkfakecursor', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  describe('addLinkFakeCursor', () => {
    it('should add fake cursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      expect(editorView.state.selection instanceof TextSelection).to.equal(true);
      addLinkFakeCursor(editorView);
      expect(editorView.state.selection instanceof LinkFakeCursor).to.equal(true);
      editorView.destroy();
    });
  });

  describe('removeLinkFakeCursor', () => {
    it('should remove fake cursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      addLinkFakeCursor(editorView);
      expect(editorView.state.selection instanceof LinkFakeCursor).to.equal(true);
      removeLinkFakeCursor(editorView);
      expect(editorView.state.selection instanceof TextSelection).to.equal(true);
      editorView.destroy();
    });
  });

  describe('drawLinkFakeCursor', () => {
    it('should return null if selection is not of type LinkFakeCursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      const decoration = drawLinkFakeCursor(editorView.state);
      expect(decoration).to.equal(null);
      editorView.destroy();
    });

    it('should return DecorationSet if selection is of type LinkFakeCursor', () => {
      const { editorView } = editor(doc(paragraph('{<>}')));
      addLinkFakeCursor(editorView);
      const decoration = drawLinkFakeCursor(editorView.state);
      expect(decoration instanceof DecorationSet).to.equal(true);
      editorView.destroy();
    });
  });

  describe('LinkFakeBookmark', () => {
    const { editorView } = editor(doc(paragraph('{<>}')));
    const linkFakeBookmark = new LinkFakeBookmark(editorView.state.selection.$from.pos);
    it('should have instance method map defined', () => {
      expect(linkFakeBookmark.map).to.not.equal(undefined);
    });

    it('should have instance method resolve defined', () => {
      expect(linkFakeBookmark.resolve).to.not.equal(undefined);
    });
  });

  describe('LinkFakeCursor', () => {
    const { editorView } = editor(doc(paragraph('{<>}')));
    const linkFakeCursor = new LinkFakeCursor(editorView.state.selection.$from);
    it('should extend Selection', () => {
      expect(linkFakeCursor instanceof Selection).to.equal(true);
    });

    it('should return instance of LinkFakeBookmark when getBookmark is called', () => {
      expect(linkFakeCursor.getBookmark() instanceof LinkFakeBookmark).to.equal(true);
    });

    it('should return true when eq() is called with FackeCursor having same head', () => {
      const linkFakeCursorOther = new LinkFakeCursor(editorView.state.selection.$from);
      expect(linkFakeCursor.eq(linkFakeCursorOther)).to.equal(true);
    });

    it('should return empty Slice when content() is called', () => {
      expect(linkFakeCursor.content()).to.equal(Slice.empty);
    });
  });
});
