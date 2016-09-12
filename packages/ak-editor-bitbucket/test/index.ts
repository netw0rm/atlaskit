import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil } from 'akutil-common-test';

const { expect } = chai;

function activateEditorByClicking(editor: AkEditorBitbucket) : void {
  const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const inputEl = editor.shadowRoot.querySelector('* > input');
  expect(inputEl).to.not.be.null;
  expect(inputEl.dispatchEvent(clickEvent)).to.be.true;
}

function waitForEditorToBeReady(editor: AkEditorBitbucket) : Promise<boolean> {
  return waitUntil(() => {
    return editor && !!editor._ready;
  });
}

describe('ak-editor-bitbucket', () => {
  it('is possible to create a component', () => {
    let component: any;
    expect(() => {
      component = new AkEditorBitbucket();
    }).not.to.throw(Error);
    expect(component.tagName).to.match(/^ak-editor-bitbucket/i);
  });

  it('does not be ready when instantiated outside the DOM', () => {
    const editor = new AkEditorBitbucket();
    expect(editor.ready).to.be.false;
  });

  it('does not be expanded by default', () => {
    const editor = new AkEditorBitbucket();
    expect(editor.expanded).to.be.false;
  });

  describe('default config', function(){
    let tmpContainer : any;
    let editor : any;

    this.timeout(30000);

    beforeEach((done) => {
      tmpContainer = document.createElement('div');
      tmpContainer.innerHTML = `<ak-editor-bitbucket></ak-editor-bitbucket>`;
      document.body.appendChild(tmpContainer);

      afterMutations(
        () => (editor = tmpContainer.firstChild),
        done
      );
    });

    afterEach(() => {
      document.body.removeChild(tmpContainer);
    });

    it('should expand after clicking the input element', (done) => {
      activateEditorByClicking(editor);
      expect(editor.expanded).to.be.true;
      done();
    });

    it('should have toolbar with all default elements', () => {
      activateEditorByClicking(editor);
      return waitForEditorToBeReady(editor).then(() => {
        [
          'ak-editor-toolbar',
          'ak-editor-toolbar-block-type',
          'ak-editor-toolbar-lists',
          'ak-editor-toolbar-hyperlink',
          'ak-editor-toolbar-text-formatting'
        ].forEach((selector) => {
          expect(editor.shadowRoot.querySelector(selector)).to.not.be.null;
        });
      });
    });

    it('should have options in block type dropdown', () => {
      activateEditorByClicking(editor);

      return waitForEditorToBeReady(editor).then(() => {
        const bt = editor.shadowRoot.querySelector('ak-editor-toolbar-block-type');
        expect(bt).to.not.be.null;

        const fs = bt.shadowRoot.querySelector('ak-editor-toolbar-block-type-font-select');
        expect(fs).to.not.be.null;

        return waitUntil(() => {
          return bt.shadowRoot.querySelectorAll('ak-editor-toolbar-block-type-option').length >= 2;
        }, 2000);
      });
    });

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
