import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations } from 'akutil-common-test';
import { symbols } from 'skatejs';
import { fixtures } from 'ak-editor-test';

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

describe('ak-editor-bitbucket', () => {
  const fixture = fixtures();
  const rewireSpy = RewireSpy();

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
});
