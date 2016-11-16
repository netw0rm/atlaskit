import * as chai from 'chai';
import { ProseMirror } from 'ak-editor-prosemirror';
import AkEditorCq from '../src';
import { afterMutations, waitUntil, getShadowRoot, keydown, keyup, keypress } from 'akutil-common-test';
import { emit } from 'skatejs';
import { fixtures, chaiPlugin } from 'ak-editor-test';
import { doc, p } from './_schema-builder'

chai.use(chaiPlugin);
const { expect } = chai;

describe('ak-editor-cq', () => {
  const fixture = fixtures();
  const connect = <E extends HTMLElement>(elem: E) => fixture().appendChild(elem) as E;

  describe('setting from CXHTML', () => {
    it('honors the initial value', (done) => {
      const editor = new AkEditorCq();
      editor.expanded = true;
      editor.defaultValue = 'foo';

      afterMutations(
        () => connect(editor),
        () => {
          const pm = editor._pm as ProseMirror;
          expect(pm.doc).to.deep.equal(doc(p('foo')));
        },
        done
      );
    });

    it('ignores subsequent values', (done) => {
      const editor = new AkEditorCq();
      editor.expanded = true;
      connect(editor);

      afterMutations(
        () => editor.defaultValue = 'foo',
        () => {
          const pm = editor._pm as ProseMirror;
          expect(pm.doc).to.deep.equal(doc(p()));
        },
        done
      );
    });
  });
});
