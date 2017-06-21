import * as chai from 'chai';
import { codeMirrorPlugins } from '../../../../src/plugins';
import * as sinon from 'sinon';
import { doc, code_block } from '../../../../src/test-helper/schema-builder';

import { makeEditor, chaiPlugin, fixtures } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/code-mirror-view/plugin', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: codeMirrorPlugins(defaultSchema),
    place: fixture()
  });

  it.skip('should call focus subscribers when triggerFocus is called', () => {
    const { pluginState } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    pluginState.subscribe(func);
    pluginState.triggerFocus();
    expect(func.callCount).to.eq(1);
  });
});
