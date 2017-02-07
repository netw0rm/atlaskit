import { expect } from 'chai';
import { ProseMirror } from '../../../src';
import PanelPlugin from '../../../src/plugins/panel';
import { PanelNodeType, ParagraphNodeType } from '../../../src/schema';
import { schema } from '../../_schema-builder';

const makeEditor = () => new ProseMirror({
  schema,
  plugins: [PanelPlugin],
});

describe('panel input rules', () => {
  it('should create plain ParagraphNodeType for a random text input', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, 'testing');
    const node = pm.selection.$to.node();
    expect(node.type instanceof ParagraphNodeType).to.be.true;
  });

  it('should replace {info} input with panel node of type info', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '{info}');
    const { $from, $to } = pm.selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    expect(node && node.type instanceof PanelNodeType).to.be.true;
    expect(node && node.attrs['panelType']).to.equal('info');
  });

  it('should replace {tip} input with panel node of type tip', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '{tip}');
    const { $from, $to } = pm.selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    expect(node && node.type instanceof PanelNodeType).to.be.true;
    expect(node && node.attrs['panelType']).to.equal('tip');
  });

  it('should replace {warning} input with panel node of type warning', () => {
    const pm = makeEditor();
    pm.input.insertText(0, 0, '{warning}');
    const { $from, $to } = pm.selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    expect(node && node.type instanceof PanelNodeType).to.be.true;
    expect(node && node.attrs['panelType']).to.equal('warning');
  });
});
