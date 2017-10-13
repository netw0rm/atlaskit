import { name } from '../../../../package.json';
import { expect } from 'chai';
import createEditor from '../../../helpers/create-editor';
import { doc, p, blockquote, decisionList, decisionItem, taskList, taskItem } from '../../../../src/test-helper';
import tasksAndDecisionsPlugin from '../../../../src/editor/plugins/tasks-and-decisions';
import { EditorView, Node } from '../../../../src/prosemirror';
import { toJSON } from '../../../../src/utils';
import EditorActions from '../../../../src/editor/actions';
import JSONSerializer from '../../../../src/renderer/json';

const serializer = new JSONSerializer();

describe(name, () => {
  describe('EditorActions', () => {
    let editorActions: EditorActions;
    let editorView: EditorView;
    beforeEach(() => {
      const editor = createEditor(
        [tasksAndDecisionsPlugin]
      );
      editorActions = new EditorActions();
      editorActions._privateRegisterEditor(editor.editorView);
      editorView = editor.editorView;
    });

    afterEach(() => {
      editorView.destroy();
    });

    describe('#focus', () => {
      it('should set focus to an editor', () => {
        expect(editorActions.focus()).to.equal(true);
        expect(editorView.hasFocus()).to.equal(true);
      });

      it('should not set focus if it has been already set', () => {
        editorActions.focus();
        expect(editorActions.focus()).to.equal(false);
        expect(editorView.hasFocus()).to.equal(true);
      });
    });

    describe('#blur', () => {
      it(`should not blur editor if it doesn't have focus`, () => {
        expect(editorActions.blur()).to.equal(false);
        expect(editorView.hasFocus()).to.equal(false);
      });

      it('should blur editor if it has focus', () => {
        editorActions.focus();
        expect(editorActions.blur()).to.equal(true);
        expect(editorView.hasFocus()).to.equal(false);
      });
    });

    describe('#clear', () => {
      it('should remove all content from an editor', () => {
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);
        expect(editorView.state.doc.nodeSize).to.be.gt(4);
        expect(editorActions.clear()).to.equal(true);
        expect(editorView.state.doc.nodeSize).to.equal(4);
      });
    });

    describe('#getValue', () => {
      it('should return current editor value', async () => {
        const result = doc(p('some text'));
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);

        const val = await editorActions.getValue();
        expect(val).to.not.equal(undefined);
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(result.toJSON());
        }
      });

      it('should filter out task and decision items', async () => {
        const decisionsAndTasks = doc(
          decisionList({})(decisionItem({})()),
          taskList({})(taskItem({})()),
          p('text')
        );
        const expected = toJSON(doc(p('text')));
        editorActions.replaceDocument(decisionsAndTasks);

        const actual = await editorActions.getValue();
        expect(actual).to.deep.equal(expected);
      });
    });

    describe('#replaceDocument', () => {
      const newDoc = doc(p('some new content'));
      beforeEach(() => {
        const tr = editorView.state.tr;
        tr.insertText('some text', 1);
        editorView.dispatch(tr);
      });

      it('should accept a prosemirror node', async () => {
        editorActions.replaceDocument(newDoc);
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(newDoc.toJSON());
        }
      });

      it('should accept JSON version of a prosemirror node', async () => {
        editorActions.replaceDocument(newDoc.toJSON());
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(newDoc.toJSON());
        }
      });

      it('should accept stringified JSON version of a prosemirror node', async () => {
        editorActions.replaceDocument(JSON.stringify(newDoc.toJSON()));
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(newDoc.toJSON());
        }
      });

      it('should accept atlassian document format', async () => {
        const atlassianDoc = serializer.serializeFragment(newDoc.content);
        editorActions.replaceDocument(atlassianDoc);
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(newDoc.toJSON());
        }
      });

      it('should accept atlassian document format from a string', async () => {
        const atlassianDoc = serializer.serializeFragment(newDoc.content);
        editorActions.replaceDocument(JSON.stringify(atlassianDoc));
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(newDoc.toJSON());
        }
      });
    });

    describe('#appendText', () => {
      it('should append text to a document', async () => {
        const newDoc = doc(p('some text'));
        const expected = doc(p('some text appended'));
        editorActions.replaceDocument(newDoc);
        editorActions.appendText(' appended');
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(expected.toJSON());
        }
      });

      it('should append text to a complex document', async () => {
        const newDoc = doc(p('some text'), blockquote(p('some quote')), p(''));
        const expected = doc(p('some text'), blockquote(p('some quote')), p(' appended'));
        editorActions.replaceDocument(newDoc);
        editorActions.appendText(' appended');
        const val = await editorActions.getValue();
        if (val instanceof Node) {
          expect(val!.toJSON()).to.deep.equal(expected.toJSON());
        }
      });

      it(`should return false if the last node of a document isn't a paragraph`, async () => {
        const newDoc = doc(p('some text'), blockquote(p('some quote')));
        editorActions.replaceDocument(newDoc);
        expect(editorActions.appendText(' appended')).to.equal(false);
      });
    });
  });
});
