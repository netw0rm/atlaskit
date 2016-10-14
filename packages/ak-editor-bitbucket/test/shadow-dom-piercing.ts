import * as chai from 'chai';
import AkEditorBitbucket from '../src';
import { afterMutations, waitUntil, getShadowRoot } from 'akutil-common-test';
import { fixtures, chaiPlugin, } from 'ak-editor-test';
import sinonChai from 'sinon-chai';
import querySelectorAll from '../src/shadowPiercingQuerySelector';

chai.use(chaiPlugin);
chai.use(sinonChai);
const { expect } = chai;
const fixture = fixtures();

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

/**
 * @returns The ProseMirror container element (usually a <div>)
 */
function waitUntilPMReady(editor: typeof AkEditorBitbucket) : Promise<HTMLElement> {
  return waitUntil(() => {
    return !!getShadowRoot(editor) &&
      !!getShadowRoot(editor).querySelector('ak-editor-content') &&
      !!getShadowRoot(editor).querySelector('ak-editor-content').querySelector('[pm-container=true]')
    ;
  }).then(() => {
    return getShadowRoot(editor).querySelector('ak-editor-content').querySelector('[pm-container=true]');
  });
}

describe('shadow piercing descendant combinator', () => {
  it('should proxy to document.querySelectorAll() for normal queries', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      return waitUntilPMReady(editor).then(() => {
        const result = querySelectorAll('ak-editor-bitbucket');
        expect(result).to.have.lengthOf(1);
      });
    });
  });

  it('should be able to find web components', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      return waitUntilPMReady(editor).then(() => {
        expect(querySelectorAll(
          'body >>> ak-editor-bitbucket'
        )).to.have.lengthOf(1);
      });
    });
  });

  it('should be able to find web-components in shadow roots', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      return waitUntilPMReady(editor).then(() => {
        expect(querySelectorAll(
          'body >>> ak-editor-footer'
        )).to.have.lengthOf(1);
      });
    });
  });

  it('should be able to find nested web-components in shadow roots', () => {
    return buildExpandedEditor(fixture()).then((editor) => {
      return waitUntilPMReady(editor).then(() => {
        expect(querySelectorAll(
          'body >>> ak-editor-toolbar-block-type'
        )).to.have.lengthOf(1);

        expect(querySelectorAll(
          'body >>> ak-editor-toolbar ak-editor-toolbar-block-type'
        )).to.have.lengthOf(1);
      });
    });
  });
});
