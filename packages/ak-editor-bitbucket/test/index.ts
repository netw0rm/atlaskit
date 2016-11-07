import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil, getShadowRoot, keydown, keyup, keypress } from 'akutil-common-test';
import { symbols, emit } from 'skatejs';
import { fixtures, RewireSpy, chaiPlugin, doc, text, code, strong, a,
  h1, h2, h3, h4, h5, h6, hr, img, blockquote, ul, ol, li, p, mention,
  emoji, code_block } from 'ak-editor-test';
import sinonChai from 'sinon-chai';

import shadowStyles from './shadow.less';

chai.use(chaiPlugin);
chai.use(sinonChai);
const { expect, assert } = chai;

const fixture = fixtures();

function activateEditor(editor: typeof AkEditorBitbucket) : void {
  const inputEl = getShadowRoot(editor).querySelector('input');
  expect(inputEl).to.not.be.null;
  emit(inputEl, 'focus');
}

function buildExpandedEditor(
  fixture : any,
  defaultValue = '',
  context = ''
) : Promise<typeof AkEditorBitbucket> {
  return new Promise(function(resolve, reject) {
    const successFn = () => {
      clearTimeout(failTimer);
      resolve(fixture.firstChild);
    };

    let failTimer = setTimeout(() => {
      fixture.removeEventListener('ready', successFn);
      reject(new Error('the editor didn\'t become ready in 1.5s'));
    }, 1500);

    fixture.addEventListener('ready', successFn, { once: true });
    fixture.innerHTML = `<ak-editor-bitbucket expanded></ak-editor-bitbucket>`;

    if (defaultValue) {
      fixture.firstChild.setAttribute('default-value', defaultValue);
    }

    if (context) {
      fixture.firstChild.setAttribute('context', context);
    }
  });
}

/**
 * @returns The ProseMirror container element (usually a <div>)
 */
function waitUntilPMReady(editor: typeof AkEditorBitbucket) : Promise<HTMLElement> {
  return waitUntil(() => {
    return !!getShadowRoot(editor) &&
      !!getShadowRoot(editor).firstChild.children[1].children[1] &&
      !!getShadowRoot(editor).firstChild.children[1].children[1].querySelector('[pm-container=true]')
    ;
  }).then(() => {
    return getShadowRoot(editor).firstChild.children[1].children[1].querySelector('[pm-container=true]');
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
  });

  describe('default value', () => {
    it('should initialize Prosemirror with correct value', (done) => {
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

    it('should be converted to a proper Prosemirror document after rendering', () => {
      return buildExpandedEditor(fixture(), '<p>foo <strong>bar</strong></p>')
        .then((editor) => {
          expect(editor._pm.doc).to.deep.equal(doc(p(text('foo '), strong(text('bar')))));
        });
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

  /**
   * @issue FAB-1045
   */
  it('should prevent bubbling of keyboard events outside of the editor', () => {
    const outer : HTMLElement = fixture();
    const inner : HTMLElement = document.createElement('div');

    outer.appendChild(inner);

    return buildExpandedEditor(inner).then((editor) => {
      return waitUntilPMReady(editor).then((PMContainer) => {
        const spy = sinon.spy();
        outer.addEventListener('keydown', spy);
        outer.addEventListener('keyup', spy);
        outer.addEventListener('keypress', spy);
        keydown('enter', { target: PMContainer });
        keypress('enter', { target: PMContainer });
        keyup('enter', { target: PMContainer });
        keydown('enter', { target: editor });
        keypress('enter', { target: editor });
        keyup('enter', { target: editor });
        outer.removeEventListener('keydown', spy);
        outer.removeEventListener('keyup', spy);
        outer.removeEventListener('keypress', spy);
        expect(spy.called).to.be.false;
      });
    });
  });

  it('should create a newline in code block when cursor is at the beginning and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('\nvar code;')));
      });
    });
  });

  it('should create a newline in code block when there is paragraph and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<p>text</p><pre>var code;</pre>');
      editor._pm.setTextSelection(7)

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(p('text'), code_block()('\nvar code;')));
      });
    });
  });

  it('should create a newline in code block when in the middle of code block and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');
      editor._pm.setTextSelection(5)

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('var \ncode;')));
      });
    });
  });

  it('should create a newline in code block when in the end of code block and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');
      editor._pm.setTextSelection(10)

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('var code;\n')));
      });
    });
  });

  describe('footer', () => {
    it('should not show action buttons in "pr" context', () => {
      return buildExpandedEditor(fixture(), '', 'pr').then((editor) => {
        let buttonGroup, shadowRoot;
        const footer = getShadowRoot(editor).querySelector('ak-editor-footer');
        expect(footer).to.not.be.null;

        // Note: On non-native-custom-elements browsers (like Firefox), the 'pr' context attribute
        //       isn't set synchronously, which means it doesn't propagate sync to ak-editor-footer
        //       fast enough. The buttons are supposed to be hidden but for a brief moment they
        //       are still visible.
        // TODO: There must be a better way to do it...
        return waitUntil(
          () => (shadowRoot = getShadowRoot(footer)) &&
          (buttonGroup = shadowRoot.firstChild.children[1]) &&
          buttonGroup.style.visibility === 'hidden'
        ).catch(() => {
          throw new Error('The button group did not become hidden');
        });
      });
    });
  });
});
