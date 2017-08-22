import { expect } from 'chai';
import {
  doc, code_block, code, p, strong, makeEditor, panel, blockquote
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import * as commands from '../../../src/commands';

import { isMarkTypeAllowedAtCurrentPosition, areBlockTypesDisabled } from '../../../src/utils';

describe('@atlaskit/editore-core/utils', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    schema: defaultSchema
  });

  describe('isMarkTypeAllowedAtCurrentPosition', () => {
    context('when the current node supports the given mark type', () => {
      context('and a stored mark is present', () => {
        it('returns true if given mark type is not excluded', () => {
          const { editorView } = editor(doc(p('{<>}')));
          const { mentionQuery, strong } = editorView.state.schema.marks;
          commands.toggleMark(strong)(editorView.state, editorView.dispatch);

          let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
          expect(result).to.equal(true);
        });

        it('returns false if given mark type is excluded', () => {
          const { editorView } = editor(doc(p('{<>}')));
          const { mentionQuery, code } = editorView.state.schema.marks;
          commands.toggleMark(code)(editorView.state, editorView.dispatch);

          let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
          expect(result).to.equal(false);
        });
      });

      context('without a stored mark present', () => {
        context('and the selection is empty', () => {
          it('returns true if given mark type not excluded', () => {
            const { editorView } = editor(doc(p(strong('te{<>}xt'))));
            const { mentionQuery } = editorView.state.schema.marks;

            let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
            expect(result).to.equal(true);
          });

          it('returns false if given mark type is excluded', () => {
            const { editorView } = editor(doc(p(code('te{<>}xt'))));
            const { mentionQuery } = editorView.state.schema.marks;

            let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
            expect(result).to.equal(false);
          });
        });

        context('and a non-empty selection', () => {
          it('returns true if mark type is allowed at the start of the selection', () => {
            const { editorView } = editor(doc(p(strong('t{<e'), code('xt>}'))));
            const { mentionQuery } = editorView.state.schema.marks;

            let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
            expect(result).to.equal(true);
          });

          it('returns false if mark type is excluded at the start of the selection', () => {
            const { editorView } = editor(doc(p(code('t{<e'), strong('xt>}'))));
            const { mentionQuery } = editorView.state.schema.marks;

            let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
            expect(result).to.equal(false);
          });
        });
      });
    });

    context('when the current node does not support the given mark type', () => {
      it('returns false', () => {
        const { editorView } = editor(doc(code_block()('te{<>}xt')));
        const { mentionQuery } = editorView.state.schema.marks;

        let result = isMarkTypeAllowedAtCurrentPosition(mentionQuery, editorView.state);
        expect(result).to.equal(false);
      });
    });
  });

  describe('areBlockTypesDisabled', () => {
    it('should return true is selection has a blockquote', () => {
      const { editorView } = editor(doc(blockquote('te{<}xt'), panel(p('te{>}xt'))));
      const result = areBlockTypesDisabled(editorView.state);
      expect(result).to.equal(true);
    });

    it('should return false is selection has no blockquote', () => {
      const { editorView } = editor(doc(p('te{<}xt'), panel(p('te{>}xt'))));
      const result = areBlockTypesDisabled(editorView.state);
      expect(result).to.equal(false);
    });
  });
});
