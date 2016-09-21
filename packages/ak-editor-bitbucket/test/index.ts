import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil, getShadowRoot  } from 'akutil-common-test';
import { symbols } from 'skatejs';
import { fixtures, RewireSpy } from 'ak-editor-test';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

const RewireSpy = () => {
  const resetAfter: any[] = [];

  afterEach(() => resetAfter.map(({ module, name }) => module.__ResetDependency__(name)));

  return (module: any, name: string) => {
    const func = module.__GetDependency__(name);
    const spy = sinon.spy(func);
    module.__Rewire__(name, spy);
    resetAfter.push({ module, name });
    return spy;
  }
};


function activateEditorByClicking(editor: AkEditorBitbucket) : void {
  const inputEl = getShadowRoot(editor).querySelector('* > input');
  expect(inputEl).to.not.be.null;
  emit(inputEl, 'click');
}

function waitForEditorToBeReady(editor: AkEditorBitbucket) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    const successFn = () => {
      clearTimeout(failTimer);
      resolve(editor);
    };

    const failTimer = setTimeout(() => {
      editor.removeEventListener('ready', successFn);
      reject('the editor didn\'t become ready in 1.5s');
    }, 1500);

    editor.addEventListener('ready', successFn, { once: true });
  });
}

function buildExpandedEditor(fixture : any) : Promise<AkEditorBitbucket> {
  return new Promise(function(resolve) {
    fixture.innerHTML = `<ak-editor-bitbucket></ak-editor-bitbucket>`;

    afterMutations(
      () => {
        // TODO: this should not be required when using "expanded" attribute
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
  const rewireSpy = RewireSpy();

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

  it('is not expanded by default', () => {
    const editor = new AkEditorBitbucket();
    expect(editor.expanded).to.be.false;
  });

  it('should not initialise ProseMirror by default', (done) => {
    const spy = rewireSpy(AkEditorBitbucket, 'ProseMirror');
    const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

    afterMutations(
      () => {
        expect(spy).to.have.not.been.called;
      },
      done
    );
  });

  it('should initialise ProseMirror when expanded', (done) => {
    const spy = rewireSpy(AkEditorBitbucket, 'ProseMirror');
    const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

    afterMutations(
      () => { editor.expanded = true; },
      () => {
        expect(spy).to.have.been.callCount(1);
      },
      done
    );
  });

  it('should destroy ProseMirror when collapsed', (done) => {
    const spy = rewireSpy(AkEditorBitbucket, 'ProseMirror');
    const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

    afterMutations(
      () => { editor.expanded = true; },
      () => { editor.expanded = false; },
      () => {
        expect(spy).to.have.been.callCount(1);
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

    it('should honour default value', (done) => {
      const content = 'foo';
      const spy = rewireSpy(AkEditorBitbucket, 'ProseMirror');
      const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

      editor.defaultValue = content;

      // TODO: Delete this after merging a different PR.
      editor._justToggledExpansion = true;

      afterMutations(
        () => { editor.expanded = true; },
        () => {
          const opts = spy.firstCall.args[0];
          expect(opts.doc).has.property('textContent', content);
        },
        done
      );
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
    it('should have all default elements', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        [
          'ak-editor-toolbar',
          'ak-editor-toolbar-block-type',
          'ak-editor-toolbar-lists',
          'ak-editor-toolbar-hyperlink',
          'ak-editor-toolbar-text-formatting'
        ].forEach((selector) => {
          // debugger;
          expect(getShadowRoot(editor).querySelector(selector)).to.not.be.null;
        });
      });
    });

    it('should have options in block type dropdown', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        const bt = getShadowRoot(editor).querySelector('ak-editor-toolbar-block-type');
        expect(bt).to.not.be.null;

        // on Firefox, shadowRoot is not available right away so we have to wait for it
        return waitUntil(() => {
          return !!getShadowRoot(bt);
        }).then(() => {
          const fs = getShadowRoot(bt).querySelector('ak-editor-toolbar-block-type-select');
          expect(fs).to.not.be.null;

          const btShadowRoot = getShadowRoot(bt);
          return waitUntil(() => {
            // it takes roughly 3 iterations to render all elements and attach them to <ul>
            return btShadowRoot.querySelectorAll('ak-editor-toolbar-block-type-option').length >= 2;
          });
        });
      });
    });
  });
});
