import * as chai from 'chai';
import { ProseMirror } from 'ak-editor-core';
import AkEditorJira from '../src';
import { afterMutations, waitUntil, getShadowRoot, keydown, keyup, keypress } from 'akutil-common-test';
import { emit } from 'skatejs';
import { fixtures, chaiPlugin } from 'ak-editor-core/test-helper';
import { doc, p } from './_schema-builder'

chai.use(chaiPlugin);
const { expect } = chai;

describe.skip('ak-editor-jira', () => {
  const fixture = fixtures();
  const connect = <E extends HTMLElement>(elem: E) => fixture().appendChild(elem) as E;

  describe('setting from HTML', () => {
    it('honors the initial value', (done) => {
      const editor = new AkEditorJira();
      editor.expanded = true;
      editor.defaultValue = '<p>foo</p>';

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
      const editor = new AkEditorJira();
      editor.expanded = true;
      connect(editor);

      afterMutations(
        () => editor.defaultValue = '<p>bar</p>',
        () => {
          const pm = editor._pm as ProseMirror;
          expect(pm.doc).to.deep.equal(doc(p()));
        },
        done
      );
    });
  });
});
