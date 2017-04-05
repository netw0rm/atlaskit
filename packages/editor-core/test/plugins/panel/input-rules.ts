import { expect } from 'chai';
import PanelPlugin from '../../../src/plugins/panel';
import PanelInputRulesPlugin from '../../../src/plugins/panel/input-rules';
import { insertText, doc, p, makeEditor, fixtures, panel } from '../../../src/test-helper';

const fixture = fixtures();
const editor = (doc: any) => makeEditor({
  doc,
  plugins: [PanelPlugin],
  place: fixture()
});

describe('panel input rules', () => {
  it('should create plain ParagraphNodeType for a random text input', () => {
    const { editorView, sel } = editor(doc(p('{<>}')));
    insertText(editorView, 'testing', sel, sel);
    const node = editorView.state.selection.$to.node();
    expect(node.type.name).to.equal('paragraph');
  });

  it('should replace {info} input with panel node of type info', () => {
    const { editorView } = editor(doc(p('{info')));

    const inputRulePlugin = PanelInputRulesPlugin(editorView.state.schema);
    inputRulePlugin!.props.handleTextInput!(editorView, 6, 6, '}');

    expect(editorView.state.doc).to.deep.equal(doc(panel(p())));
  });

  it('should replace {tip} input with panel node of type tip', () => {
    const { editorView } = editor(doc(p('{tip')));

    const inputRulePlugin = PanelInputRulesPlugin(editorView.state.schema);
    inputRulePlugin!.props.handleTextInput!(editorView, 5, 5, '}');
    expect(editorView.state.doc.content.content[0].attrs.panelType).to.deep.equal('tip');
  });

  it('should replace {warning} input with panel node of type warning', () => {
    const { editorView } = editor(doc(p('{warning')));

    const inputRulePlugin = PanelInputRulesPlugin(editorView.state.schema);
    inputRulePlugin!.props.handleTextInput!(editorView, 9, 9, '}');
    expect(editorView.state.doc.content.content[0].attrs.panelType).to.deep.equal('warning');
  });
});
