import * as chai from 'chai';
import * as sinon from 'sinon';
import { doc, code_block } from '../../../src/test-helper/schema-builder';
import { makeEditor, chaiPlugin, fixtures, sendKeyToPm } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { codeBlockPlugins } from '../../../src/plugins';

import { codeMirrorPlugins } from '../../../src/plugins';
import { codeMirrorNodeView } from '../../../src/nodeviews';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/nodeviews/code-mirror', () => {
  const fixture = fixtures();
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [
      ...codeBlockPlugins(defaultSchema),
      ...codeMirrorPlugins(defaultSchema),
    ],
    place: fixture(),
    nodeViews: { codeBlock: codeMirrorNodeView },
  });

  it('should export code-mirror nodeview factory', () => {
    expect(codeMirrorNodeView instanceof Function).to.equal(true);
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

  it('should add a isCodeMirror to code block node', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(!!node.attrs['isCodeMirror']).to.equal(true);
  });

  it('should call unsubscribeFocusHandlers menthod of code-block plugin editor is destroyed', () => {
    const { editorView, pluginState } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    pluginState.unsubscribeFocusHandlers = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });

  it('should call unsubscribe menthod of code-block plugin editor is destroyed', () => {
    const { editorView, pluginState } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    pluginState.unsubscribe = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });

  it('should exit code block when Enter is pressed three times', () => {
    const { editorView } = editor(doc(code_block()('codeBlock{<>}')));
    sendKeyToPm(editorView, 'Enter');
    sendKeyToPm(editorView, 'Enter');
    sendKeyToPm(editorView, 'Enter');
    const { $from } = editorView.state.selection;
    expect($from.node($from.depth).type.name).to.equal('paragraph');
  });
});
