import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { fixtures } from 'ak-editor-test';
import { afterMutations } from 'akutil-common-test';
import { emit, symbols } from 'skatejs';

const { expect } = chai;

describe('ak-editor-bitbucket', () => {
  const fixture = fixtures();

  const clickCancel = (editor: any) => {
    const footer = editor[symbols.shadowRoot].querySelector('ak-editor-footer');
    const cancel = footer[symbols.shadowRoot].querySelectorAll('button')[1];
    emit(cancel, 'click');
  };

  const clickAffordanceEditor = (editor: any) => {
    const input = editor[symbols.shadowRoot].querySelector('input')
    emit(input, 'click');
  }

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

  describe('.focus()', () => {
    it('does not throw an exception when called on an unmounted editor', () => {
      const editor = new AkEditorBitbucket();
      expect(() => editor.focus()).not.to.throw(Error);
    });
  });

  describe('.clear()', () => {
    it('does not throw an exception when called on an unmounted editor', () => {
      const editor = new AkEditorBitbucket();
      expect(() => editor.clear()).not.to.throw(Error);
    });
  });

  it('expands the UI when the affordance input is clicked', (done) => {
    const editor = new AkEditorBitbucket();
    fixture().appendChild(editor);

    afterMutations(
      () => clickAffordanceEditor(editor),
      () => expect(editor.expanded).to.be.true,
      done,
    );
  });

  it('emits a ready event when expanded', (done) => {
    const editor = new AkEditorBitbucket();
    const readySpy = sinon.spy();
    editor.addEventListener('ready', readySpy);
    fixture().appendChild(editor);

    afterMutations(
      () => clickAffordanceEditor(editor),
      () => expect(readySpy.called).to.be.true,
      done,
    );
  });

  it('collapses after expanding then clicking cancel', (done) => {
    const editor = new AkEditorBitbucket();
    fixture().appendChild(editor);

    afterMutations(
      () => clickAffordanceEditor(editor),
      () => clickCancel(editor),
      () => expect(editor.expanded).to.be.false,
      done,
    );
  });
});
