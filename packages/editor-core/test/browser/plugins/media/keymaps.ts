import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  mediaPluginFactory,
  ProviderFactory,
} from '../../../../src';
import {
  chaiPlugin,
  doc,
  makeEditor,
  p,
  sendKeyToPm,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('media - keymaps', () => {
  const providerFactory = new ProviderFactory();

  const editor = (doc: any, uploadErrorHandler?: () => void) => {
    const plugins = [
      ...mediaPluginFactory(defaultSchema, { providerFactory, uploadErrorHandler }),
    ];

    return makeEditor({
      doc,
      plugins,
      schema: defaultSchema
    });
  };

  after(() => {
    providerFactory.destroy();
  });

  describe('Backspace keypress', () => {
    it('calls media plugin state to remove media node', () => {
      const { editorView, pluginState } = editor(doc(p('{<>}')));
      const removeMediaNodeSpy = sinon.spy(pluginState, 'removeMediaNode');

      sendKeyToPm(editorView, 'Backspace');

      expect(removeMediaNodeSpy.calledOnce).to.equal(true);
    });
  });
});
