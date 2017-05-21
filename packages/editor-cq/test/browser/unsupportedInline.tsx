import { expect } from 'chai';
import { unsupportedInlineNodeView } from '../../src/schema/nodes/unsupportedInline';
import 'react';

describe('unsupportedInline', () => {
  it('should have a not null html dom', () => {
    const dom = unsupportedInlineNodeView({ attrs: {} }).dom;
    expect(dom).to.not.equal(undefined);
  });

  it('should return a node of type span', () => {
    const dom = unsupportedInlineNodeView({ attrs: {} }).dom;
    expect(dom!.nodeName).to.equal('SPAN');
  });

  it('should have well defined class attribute on first child span', () => {
    const dom = unsupportedInlineNodeView({ attrs: {} }).dom;
    expect(dom!.firstChild!.attributes.getNamedItem('class')).to.not.equal(undefined);
  });

  it('should have text content as string "Unsupported content"', () => {
    const dom = unsupportedInlineNodeView({ attrs: {} }).dom;
    expect(dom!.firstChild!.textContent).to.equal('Unsupported content');
  });

  it('should have dom set to undefined once destroy is called', () => {
    const nodeView = unsupportedInlineNodeView({ attrs: {} });
    expect(nodeView.dom).to.not.equal(undefined);
    nodeView!.destroy!();
    expect(nodeView.dom).to.equal(undefined);
  });
});
