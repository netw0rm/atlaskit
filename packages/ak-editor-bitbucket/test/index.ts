import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { emit } from "skatejs";
import { fixtures } from 'ak-editor-test';
import { afterMutations, waitUntil, getShadowRoot } from 'akutil-common-test';

const { expect } = chai;

function activateEditorByClicking(editor: AkEditorBitbucket) : void {
  const inputEl = getShadowRoot(editor).querySelector('* > input');
  expect(inputEl).to.not.be.null;
  emit(inputEl, 'click');
}

function waitForEditorToBeReady(editor: AkEditorBitbucket) : Promise<boolean> {
  return waitUntil(() => {
    return editor && !!editor._ready;
  }, 10000);
}

function buildExpandedEditor(fixture : any) : Promise<AkEditorBitbucket> {
  return new Promise(function(resolve) {
    let editor: AkEditorBitbucket;
    fixture.innerHTML = `<ak-editor-bitbucket expanded="true"></ak-editor-bitbucket>`;

    afterMutations(
      () => {
        // TODO: Remove this after "expanded" attribute is fixed
        activateEditorByClicking(fixture.firstChild);

        waitForEditorToBeReady(fixture.firstChild).then(() => {
          resolve(fixture.firstChild);
        });
      }
    );
  });
}

describe('ak-editor-bitbucket', () => {
  const fixture = fixtures();

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

  describe('collapsed editor', () => {
    let tmpContainer: any;
    let editor: any;

    beforeEach((done) => {
      tmpContainer = fixture();
      tmpContainer.innerHTML = `<ak-editor-bitbucket></ak-editor-bitbucket>`;

      afterMutations(
        () => (editor = tmpContainer.firstChild),
        done
      );
    });

    it('should not be expanded by default', () => {
      expect(editor.expanded).to.be.false;
    });

    it('should expand after clicking the input element', () => {
      activateEditorByClicking(editor);
      expect(editor.expanded).to.be.true;
    });
  });

  describe('editor toolbar', () => {
    let tmpContainer: any;
    let editor: any;

    beforeEach((done) => {
      tmpContainer = fixture();
      tmpContainer.innerHTML = `<ak-editor-bitbucket></ak-editor-bitbucket>`;

      afterMutations(
        () => (editor = tmpContainer.firstChild),
        done
      );
    });

    it('should have all default elements', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        [
          'ak-editor-toolbar',
          'ak-editor-toolbar-block-type',
          'ak-editor-toolbar-lists',
          'ak-editor-toolbar-hyperlink',
          'ak-editor-toolbar-text-formatting'
        ].forEach((selector) => {
          expect(getShadowRoot(editor).querySelector(selector)).to.not.be.null;
        });
      });
    });

    it('should have options in block type dropdown', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        const bt = getShadowRoot(editor).querySelector('ak-editor-toolbar-block-type');
        expect(bt).to.not.be.null;

        // debugger;
        const fs = getShadowRoot(bt).querySelector('ak-editor-toolbar-block-type-select');
        expect(fs).to.not.be.null;

        const btShadowRoot = getShadowRoot(bt);
        return waitUntil(() => {
          // it takes roughly 3 iterations to render those elements and attach them to <ul>
          return btShadowRoot.querySelectorAll('ak-editor-toolbar-block-type-option').length >= 2;
        });
      });
    });

  });
});
