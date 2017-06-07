import { expect } from 'chai';
import customNodeSerializers from '../../../../../src/renderer/text/nodes';
import MentionSerializer from '../../../../../src/renderer/text/nodes/mention';
import { mention } from '../../../../../src/test-helper';

describe('Renderer - TextSerializer - Nodes', () => {
  describe('Mention', () => {
    it('should render mention without first @-symbol', () => {
      const node = mention({ id: 'foo', text: '@Dmitrii Sorin' });
      const nodeSerializer = new MentionSerializer(node, customNodeSerializers);
      expect(nodeSerializer.serialize()).to.equal('Dmitrii Sorin');
    });

    it('should render mention when there is no @-symbol in its text', () => {
      const node = mention({ id: 'foo', text: 'Dmitrii Sorin' });
      const nodeSerializer = new MentionSerializer(node, customNodeSerializers);
      expect(nodeSerializer.serialize()).to.equal('Dmitrii Sorin');
    });
  });
});
