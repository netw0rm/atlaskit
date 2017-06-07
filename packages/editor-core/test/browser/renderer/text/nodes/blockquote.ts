import { expect } from 'chai';
import BlockquoteSerializer from '../../../../../src/renderer/text/nodes/blockquote';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import { blockquote } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render blockquote', () => {
    const node = blockquote('foo\nbar\nbaz');

    const nodeSerializer = new BlockquoteSerializer(node, customNodeSerializers);
    expect(nodeSerializer.serialize()).to.equal('> foo\n> bar\n> baz');
  });
});
