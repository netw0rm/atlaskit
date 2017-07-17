import * as chai from 'chai';
import { expect } from 'chai';
import {
  chaiPlugin,
  insertText,
  makeEditor,
  doc,
  p,
  decisionList,
  decisionItem,
} from '../../../../src/test-helper';
import tasksAndDecisionsPlugins from '../../../../src/plugins/tasks-and-decisions';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);
describe('tasks and decisions - input rules', () => {

  const editor = (doc: any) => makeEditor({
    doc,
    plugins: tasksAndDecisionsPlugins(defaultSchema)
  });

  describe('decisions', () => {

    it('should replace "<> " with a decisionList', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '<> ', sel);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          decisionList(
            decisionItem('')
          )
        )
      );
    });

    it('should preserve existing content on row when converting', () => {
      const { editorView, sel } = editor(doc(p('{<>}Hello World')));
      insertText(editorView, '<> ', sel);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          decisionList(
            decisionItem('Hello World')
          )
        )
      );
    });

  });

});
