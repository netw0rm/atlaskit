import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations } from 'akutil-common-test';
import { symbols } from 'skatejs';
import { fixtures } from 'ak-editor-test';

const { expect } = chai;

describe('ak-editor-bitbucket', () => {
  const fixture = fixtures();
  const makeEditor = () => fixture().appendChild(new AkEditorBitbucket());

  it('is possible to create a component', () => {
    let editor: any;
    expect(() => {
      editor = new AkEditorBitbucket();
    }).not.to.throw(Error);
    expect(editor.tagName).to.match(/^ak-editor-bitbucket/i);
  });

  it('does not be ready when instantiated outside the DOM', () => {
    const editor = new AkEditorBitbucket();
    expect(editor.ready).to.be.false;
  });

  it('does not be expanded by default', (done) => {
    const editor = makeEditor();

    expect(editor.expanded).to.be.false;
    afterMutations(
      () => {
        const pm = editor[symbols.shadowRoot].querySelector('.ProseMirror');
        expect(pm).to.be.a('null');
      },
      done
    );
  });

  it('can be set to expanded', (done) => {
    const editor = makeEditor();

    editor.expanded = true;
    afterMutations(
      () => {
        const pm = editor[symbols.shadowRoot].querySelector('.ProseMirror');
        expect(pm).to.be.ok;
      },
      done
    );
  });

  it('can be set to expanded and collapsed', (done) => {
    const editor = makeEditor();

    editor.expanded = true;
    afterMutations(
      () => {
        editor.expanded = false;
      },
      () => {
        const pm = editor[symbols.shadowRoot].querySelector('.ProseMirror');
        expect(pm).to.be.a('null');
      },
      done
    );
  });

  describe('.value', () => {
    it('returns an empty string by default', () => {
      const editor = new AkEditorBitbucket();
      expect(editor.value).to.equal('');
    });

    it('returns the defaultValue before the editor is initialised', () => {
      const editor = new AkEditorBitbucket();
      editor.defaultValue = 'foo';
      expect(editor.value).to.equal('foo');
    });
  });
});
