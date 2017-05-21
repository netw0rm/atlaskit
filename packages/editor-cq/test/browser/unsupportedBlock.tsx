import { expect } from 'chai';
import { unsupportedBlockNodeView } from '../../src/schema/nodes/unsupportedBlock';
import 'react';

describe.skip('unsupportedBlock', () => {

  it('should have a not null html dom', () => {
    const dom = unsupportedBlockNodeView({ attrs: {} }).dom;
    expect(dom).to.not.equal(undefined);
  });

  it('should return a node of type span', () => {
    const dom = unsupportedBlockNodeView({ attrs: {} }).dom;
    expect(dom!.nodeName).to.equal('SPAN');
  });

  it('should have well defined class attribute on first child span', () => {
    const dom = unsupportedBlockNodeView({ attrs: {} }).dom;
    expect(dom!.firstChild!.attributes.getNamedItem('class')).to.not.equal(undefined);
  });

  it('should have text content as string "Unsupported content"', () => {
    const dom = unsupportedBlockNodeView({ attrs: {} }).dom;
    expect(dom!.firstChild!.textContent).to.equal('Unsupported content');
  });

  it('should have dom set to undefined once destroy is called', () => {
    const nodeView = unsupportedBlockNodeView({ attrs: {} });
    expect(nodeView.dom).to.not.equal(undefined);
    nodeView!.destroy!();
    expect(nodeView.dom).to.equal(undefined);
  });
});
