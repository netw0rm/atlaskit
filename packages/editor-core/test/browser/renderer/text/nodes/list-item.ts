import { expect } from 'chai';
import ListItemSerializer from '../../../../../src/renderer/text/nodes/list-item';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import { li } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render lite item', () => {
    const node = li('foo');
    const nodeSerializer = new ListItemSerializer(node, customNodeSerializers);
    expect(nodeSerializer.serialize()).to.equal('* foo');
  });
});
