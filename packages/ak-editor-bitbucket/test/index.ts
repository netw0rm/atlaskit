import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations } from 'akutil-common-test';
import { symbols } from 'skatejs';
import { fixtures, RewireSpy } from 'ak-editor-test';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

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
