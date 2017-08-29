import { expect } from 'chai';
import * as sinon from 'sinon';
import createEditor from '../../../../helpers/create-editor';
import collabEdit from '../../../../../src/editor/plugins/collab-edit';
import ProviderFactory from '../../../../../src/providerFactory';
import { MockCollabEditProvider } from '../../../../../stories/mock-collab-provider';

const setupEditor = (setProvider: boolean = true) => {
  const providerFactory = new ProviderFactory();
  const providerPromise = Promise.resolve(new MockCollabEditProvider());

  if (setProvider) {
    providerFactory.setProvider('collabEditProvider', providerPromise);
  }

  const { editorView } = createEditor([collabEdit], {}, providerFactory);

  return {
    editorView,
    providerPromise
  };
};

describe('editor/plugins/collab-edit', () => {

  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });


  describe('plugin setup', () => {

    it('should fetch initial document', async () => {
      const { editorView, providerPromise } = setupEditor();
      await providerPromise;

      expect(editorView.state.doc.toJSON()).to.deep.equal({
        'type': 'doc',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'Hello World'
              }
            ]
          }
        ]
      });

    });

  });

  describe('local changes', () => {

    it('should discard any transactions before initialized', async () => {
      const { editorView, providerPromise } = setupEditor(false);
      await providerPromise;

      editorView.dispatch(editorView.state.tr.insertText('hello world'));
      expect(editorView.state.doc.toJSON()).to.deep.equal({
        'type': 'doc',
        'content': [
          {
            'type': 'paragraph'
          }
        ]
      });
    });

    it('should call .send()-method on provider', async () => {
      const { editorView, providerPromise } = setupEditor();
      const provider = await providerPromise;
      const spy = sandbox.spy(provider, 'send');

      editorView.dispatch(editorView.state.tr.insertText('hello world'));
      expect(spy.called).to.equal(true);
    });

  });

  describe('remote changes', () => {

    it('should apply remote changes', async () => {
      const { editorView, providerPromise } = setupEditor();
      const provider = await providerPromise;

      provider.emit('data', {
        json: [
          {
            'from': 0,
            'to': editorView.state.doc.nodeSize - 2,
            'stepType': 'replace',
            'slice': {
              'content': [
                {
                  'type': 'paragraph',
                  'content': [
                    {
                      'type': 'text',
                      'text': 'Oscar'
                    }
                  ]
                }
              ]
            }
          }
        ]
      });

      expect(editorView.state.doc.toJSON()).to.deep.equal({
        'type': 'doc',
        'content': [
          {
            'type': 'paragraph',
            'content': [
              {
                'type': 'text',
                'text': 'Oscar'
              }
            ]
          }
        ]
      });
    });

  });

});
