import * as chai from 'chai';
import { expect } from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil, getShadowRoot  } from 'akutil-common-test';
import { symbols, emit } from 'skatejs';
import { fixtures, RewireSpy, chaiPlugin, doc, text, code, strong, a,
  h1, h2, h3, h4, h5, h6, hr, img, blockquote, ul, ol, li, p, mention, emoji } from 'ak-editor-test';
import sinonChai from 'sinon-chai';

chai.use(chaiPlugin);
chai.use(sinonChai);

const fixture = fixtures();

function activateEditor(editor: typeof AkEditorBitbucket) : void {
  const inputEl = getShadowRoot(editor).querySelector('input');
  expect(inputEl).to.not.be.null;
  emit(inputEl, 'focus');
}

function buildExpandedEditor(fixture : any) : Promise<typeof AkEditorBitbucket> {
  return new Promise(function(resolve, reject) {
    const successFn = () => {
      clearTimeout(failTimer);
      resolve(fixture.firstChild);
    };

    const failTimer = setTimeout(() => {
      fixture.removeEventListener('ready', successFn);
      reject('the editor didn\'t become ready in 1.5s');
    }, 1500);

    fixture.addEventListener('ready', successFn, { once: true });
    fixture.innerHTML = `<ak-editor-bitbucket expanded></ak-editor-bitbucket>`;
  });
}

describe('ak-editor-bitbucket', () => {
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
      activateEditor(editor);
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
          expect(getShadowRoot(editor).querySelector(selector)).to.not.be.null;
        });
      });
    });

    it('should have options in block type dropdown', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        const bt = getShadowRoot(editor).querySelector('ak-editor-toolbar-block-type');
        expect(bt).to.not.be.null;

        // on browsers without native ShadowDOM (i.e. Firefox, Safari), shadowRoot is not available right away
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

  describe('setting from html', () => {
    it('should accept empty strings', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        editor.setFromHtml('');
        expect(editor._pm.doc).to.deep.equal(doc(p()));

        editor.setFromHtml('     \t \n  \r  \n');
        expect(editor._pm.doc).to.deep.equal(doc(p()));
      });
    });

    it('should accept simple markup', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        editor.setFromHtml('<h1>foo</h1>');
        expect(editor._pm.doc).to.deep.equal(doc(h1('foo')));

        editor.setFromHtml('<p>foo <strong>bar</strong></p>');
        expect(editor._pm.doc).to.deep.equal(doc(p(text('foo '), strong(text('bar')))));
      });
    });
  });

  describe('checking if empty', () => {
    it('should return true for default empty value', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        expect(editor.isEmpty()).to.be.true;
      });
    });

    it('should return false non empty document', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        editor.setFromHtml('<h1>foo</h1>');
        expect(editor.isEmpty()).to.be.false;
      })
    });

    it('should return true for document with a few empty paragraphs', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        editor.setFromHtml('<p></p><p></p><p></p><p></p>');
        expect(editor.isEmpty()).to.be.true;
      });
    });
  });
});
