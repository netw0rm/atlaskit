import { expect } from 'chai';
import HardBreakSerializer from '../../../../../src/renderer/text/nodes/hard-break';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import { hardBreak } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render hard break', () => {
    const node = hardBreak();
    const nodeSerializer = new HardBreakSerializer(node, customNodeSerializers);
    expect(nodeSerializer.serialize()).to.equal('\n');
  });
});
