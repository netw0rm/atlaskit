import { expect } from 'chai';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import RuleSerializer from '../../../../../src/renderer/text/nodes/rule';
import { hr } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  it('should render media', () => {
    const nodeSerializer = new RuleSerializer(hr, customNodeSerializers);
    expect(nodeSerializer.serialize()).to.equal('-----');
  });
});
