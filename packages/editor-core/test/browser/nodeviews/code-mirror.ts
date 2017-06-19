import * as chai from 'chai';
import * as sinon from 'sinon';
import { doc, code_block } from '../../../src/test-helper/schema-builder';
import { makeEditor, chaiPlugin, fixtures } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { codeBlockPlugins,CodeBlockState } from '../../../src/plugins';

import { codeMirrorPlugins } from '../../../src/plugins';
import { codeMirrorNodeViewFactory } from '../../../src/nodeviews';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/nodeviews/code-mirror', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [
      ...codeMirrorPlugins(defaultSchema),
      ...codeBlockPlugins(defaultSchema),
    ],
    place: fixture(),
    nodeViews: { codeBlock: codeMirrorNodeViewFactory(defaultSchema) },
  });

  it('should export code-mirror nodeview factory', () => {
    expect(codeMirrorNodeViewFactory instanceof Function).to.equal(true);
    expect(codeMirrorNodeViewFactory(defaultSchema) instanceof Function).to.equal(true);
  });

  it('should be possible to create a code-block', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(node.type.name).to.deep.equal('codeBlock');
  });

  it('should add a uniqueId to code block node', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(!!node.attrs['uniqueId']).to.equal(true);
  });

  it('should call unsubscribe menthod of code-mirror plugin editor is destroyed', () => {
    const { editorView, pluginState } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    pluginState.unsubscribe = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });

  it('should call unsubscribe menthod of code-block plugin editor is destroyed', () => {
    const { editorView, pluginStates } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const pluginState = (pluginStates.filter(state => state instanceof CodeBlockState))[0];
    const func = sinon.spy();
    pluginState.unsubscribe = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });

});
