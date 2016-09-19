import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations } from 'akutil-common-test';
import { symbols } from 'skatejs';
import { fixtures } from 'ak-editor-test';

const { expect } = chai;

describe('ak-editor-bitbucket', () => {
  const fixture = fixtures();
  const makeEditor = () => fixture().appendChild(new AkEditorBitbucket()) as any;

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

  describe('defaultValue', () => {
    it('should contain a default value', (done) => {
      const editor = makeEditor();

      editor.defaultValue = 'foo';
      editor.expanded = true;

      afterMutations(
        () => {
          const span = editor[symbols.shadowRoot].querySelector('span');
          console.log(span.textContent)
          expect(span.textContent).to.eql('foo');
        },
        done
      );
    });
  });
});
