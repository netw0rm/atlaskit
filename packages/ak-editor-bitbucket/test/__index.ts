import { default as chai, expect } from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil, getShadowRoot, keydown, keyup, keypress, locateWebComponent } from 'akutil-common-test';
import { symbols, emit } from 'skatejs';
import { fixtures, RewireSpy, chaiPlugin } from 'ak-editor-test';
import { browser } from 'ak-editor-prosemirror';
import sinonChai from 'sinon-chai';

import { doc, code, strong, a,
  h1, h2, h3, h4, h5, h6, hr, img, blockquote, ul, ol, li, p, mention,
  emoji, code_block } from './_schema-builder';
import shadowStyles from './shadow.less';

chai.use(chaiPlugin);
chai.use(sinonChai);

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

describe.skip('ak-editor-bitbucket', () => {
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

  it('has its shadow root container "positioned" so that popups are positioned based on the container rather than viewport', (done) => {
    const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

    afterMutations(
      () => {
        const container = editor.shadowRoot.firstChild;
        const child = container.appendChild(document.createElement('div'));
        expect(child.offsetParent).to.equal(container);
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

  describe.skip('default value', () => {
    it('should initialize Prosemirror with correct value', (done) => {
      const content = 'foo';
      const spy = rewireSpy(AkEditorBitbucket, 'ProseMirror');
      const editor = fixture().appendChild(new AkEditorBitbucket()) as any;

      editor.defaultValue = content;
      editor.expanded = true;

      afterMutations(() => {
        const opts = spy.firstCall.args[0];
        expect(opts.doc).has.property('textContent', content);
        done();
      });
    });

    it('should be converted to a proper Prosemirror document after rendering', () => {
      return buildExpandedEditor(fixture(), '<p>foo <strong>bar</strong></p>')
        .then((editor) => {
          expect(editor._pm.doc).to.deep.equal(doc(p('foo ', strong('bar'))));
        });
    });
  });

  describe.skip('collapsed editor', () => {
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

    it('should be focused even if not yet rendered', () => {
      expect(editor._focused).to.be.false;
      editor.focus();
      expect(editor._focused).to.be.true;
    });

    it('should expand after clicking the input element', () => {
      activateEditor(editor);
      expect(editor.expanded).to.be.true;
    });

    it('should stop being focused after collapsing', (done) => {
      activateEditor(editor);
      afterMutations(
        () => {
          expect(editor._focused).to.be.true;
          expect(editor.expanded).to.be.true;
          editor.expanded = false;
          expect(editor.expanded).to.be.false;
          done();
        }
      );
    });
  });

  describe('editor toolbar', () => {
    it('should have all default elements', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        const editorShadowRoot = getShadowRoot(editor);
        expect(editorShadowRoot.querySelector('ak-editor-toolbar')).to.be.ok;
        expect(editorShadowRoot.querySelector('ak-editor-toolbar-block-type')).to.be.ok;
        expect(editorShadowRoot.querySelector('ak-editor-toolbar-text-formatting')).to.be.ok;
        expect(editorShadowRoot.querySelector('ak-editor-toolbar-hyperlink')).to.be.ok;
        expect(editorShadowRoot.querySelector('ak-editor-toolbar-lists')).to.be.ok;
      });
    });

    it('should have options in block type dropdown', () => {
      return buildExpandedEditor(fixture()).then((editor) => {
        let bt: HTMLElement;
        let btShadowRoot: HTMLElement;

        // On polyfilled ShadowDOM the root is not available right away (i.e. in FF and IE)
        return waitUntil(
          () =>
            (bt = locateWebComponent('ak-editor-toolbar-block-type', getShadowRoot(editor))[0]) &&
            (btShadowRoot = getShadowRoot(bt))
        ).then(() => {
          const fs = locateWebComponent('ak-editor-toolbar-block-type-select', btShadowRoot);
          expect(fs).to.not.be.null;

          // it takes roughly 3 iterations to render all elements and attach them to <ul>
          return waitUntil(
            () => locateWebComponent('ak-editor-toolbar-block-type-option', btShadowRoot).length >= 2
          );
        });
      });
    });
  });

  describe.skip('editor hyperlink popup panel', () => {
    function getHyperlinkTextInput(editor: typeof AkEditorBitbucket) {
      const edit = locateWebComponent('ak-editor-hyperlink-edit', editor.shadowRoot)[0];

      if (!edit) {
        return null;
      }

      const textInput = locateWebComponent('ak-editor-popup-text-input', edit.shadowRoot)[0]
      return textInput.shadowRoot.querySelector('input');
    }

    it('should add a href on enter', (done) => {
      const href = 'https://www.atlassian.com';
      buildExpandedEditor(fixture(), `<p>foo</p>`)
        .then((editor) => {
          editor._pm.setTextSelection(1, 4);

          return waitUntilPMReady(editor).then(() => {
            afterMutations(
              () => {
                // IE 11 needs one more tick to render
              },
              () => {
                emit(document, 'addHyperlink', { detail: { value: href } });
                expect(editor._pm.doc).to.deep.equal(doc(p(a({ href })('foo'))));
              },
              done
            );
          });
        });
    });

    it('should contain the right href value', (done) => {
      const href = 'https://www.atlassian.com';
      buildExpandedEditor(fixture(), `<p>foo <a href="${href}">bar</a></p>`)
        .then((editor) => {
          editor._pm.setTextSelection(7);

          return waitUntilPMReady(editor).then(() => {
            afterMutations(
              () => {
                // IE 11 needs one more tick to render
              },
              () => {
                const input = getHyperlinkTextInput(editor);
                expect(input.value).to.equal(href);
              },
              done
            );
          });
        });
    });

    it('should change the href on enter', (done) => {
      const href = 'https://www.atlassian.com';
      const bitbucket = 'https://bitbucket.org';
      buildExpandedEditor(fixture(), `<p>foo <a href="${href}">bar</a></p>`)
        .then((editor) => {
          editor._pm.setTextSelection(7);

          return waitUntilPMReady(editor).then(() => {
            afterMutations(
              () => {
                // IE 11 needs one more tick to render
              },
              () => {
                const input = getHyperlinkTextInput(editor);
                emit(input, 'enterKeyup', { detail: { value: bitbucket } });
                expect(editor._pm.doc).to.deep.equal(doc(p('foo ', a({ href: bitbucket })('bar'))));
              },
              done
            );
          });
        });
    });

    it('should dismiss the hyperlink edit panel on ESC', (done) => {
      const href = 'https://www.atlassian.com';
      const bitbucket = 'https://bitbucket.org';
      buildExpandedEditor(fixture(), `<p>foo <a href="${href}">bar</a></p>`)
        .then((editor) => {
          editor._pm.setTextSelection(7);

          return waitUntilPMReady(editor).then(() => {
            afterMutations(
              () => {
                // IE 11 needs one more tick to render
              },
              () => {
                const input = getHyperlinkTextInput(editor);
                emit(input, 'escKeyup');
                expect(editor._pm.doc).to.deep.equal(doc(p('foo ', a({ href })('bar'))));
              },
              () => {
                const input = getHyperlinkTextInput(editor);
                expect(input).to.be.null;
              },
              done
            );
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
        expect(editor._pm.doc).to.deep.equal(doc(p('foo ', strong('bar'))));
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
      editor._pm.setTextSelection(7);

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(p('text'), code_block()('\nvar code;')));
      });
    });
  });

  it('should create a newline in code block when cursor is in the middle of code block and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');
      editor._pm.setTextSelection(5);

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('var \ncode;')));
      });
    });
  });

  it('should create a newline in code block when cursor is at the end of code block and enter is pressed', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');
      editor._pm.setTextSelection(10);

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('var code;\n')));
      });
    });
  });

  it('should create a paragraph after code block when cursor is at the end of code block and double enter is pressed', function() {
    if (browser.ios) {
      this.skip('iOS virtual keyboard does not work with deleting a character');
    }

    return buildExpandedEditor(fixture()).then((editor) => {
      editor.setFromHtml('<pre>var code;</pre>');
      editor._pm.setTextSelection(10);

      return waitUntilPMReady(editor).then((PMContainer) => {
        PMContainer.focus();
        keydown('enter', { target: PMContainer });
        keydown('enter', { target: PMContainer });

        expect(editor._pm.doc).to.deep.equal(doc(code_block()('var code;'), p()));
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
