import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations } from 'akutil-common-test';

const { expect } = chai;

describe('ak-editor-bitbucket', () => {
  let component: any;
  beforeEach(() => {
    component = new AkEditorBitbucket();
    document.body.appendChild(component);
  });
  afterEach(() => {
    document.body.removeChild(component);
    component = null;
  });

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
    expect(component.expanded).to.be.false;
    afterMutations(
      () => {
        const pm = component.querySelector('.ProseMirror');
        expect(pm).to.be.a('null');
      },
      done
    );
  });

  it('can be set to expanded', (done) => {
    component.expanded = true;
    afterMutations(
      () => {
        const pm = component.querySelector('.ProseMirror');
        expect(pm).to.be.an('object');
      },
      done
    );
  });

  it('can be set to expanded and collapsed', (done) => {
    component.expanded = true;
    afterMutations(
      () => {
        component.expanded = false;
      },
      () => {
        const pm = component.querySelector('.ProseMirror');
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
