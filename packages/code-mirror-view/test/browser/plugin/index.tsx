import * as chai from 'chai';
import { codeMirrorPlugins } from '../../../src';
import * as sinon from 'sinon';
import { doc, code_block } from '@atlaskit/editor-core/dist/es5/test-helper/schema-builder';

import { makeEditor, chaiPlugin, fixtures } from '@atlaskit/editor-core/dist/es5/test-helper';
import defaultSchema from '@atlaskit/editor-core/dist/es5/test-helper/schema';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/code-mirror-plugin', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: codeMirrorPlugins(defaultSchema),
    place: fixture()
  });

  it('should call focus subscribers when triggerFocus is called', () => {
    const { pluginState } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    pluginState.subscribe(func);
    pluginState.triggerFocus();
    expect(func.callCount).to.eq(1);
  });
});
