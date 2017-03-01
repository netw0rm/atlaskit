import { Mention } from '@atlaskit/mention';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { renderNode } from '../../src/nodes';

describe('Nodes', () => {
  describe('renderNode', () => {
    it('should try and render unknown nodes as text', () => {
      expect(renderNode({ type: 'unknown', text: 'Hello world' })).to.equal('Hello world');
      expect(renderNode({ type: 'unknown', attrs: { text: 'Hello world' } })).to.equal('Hello world');
    });

    it('should return "Unknown type: {type}" if it cannot be rendered as text', () => {
      expect(renderNode({ type: 'unknown'})).to.equal('Unknown type: "unknown"');
    });

    describe('mention - backwards compatibility', () => {
      it('should use .text if present', () => {
        const mention = mount(renderNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd' }, text: '@Oscar Wallhult' }));
        expect(mention.is(Mention)).to.equal(true);
        expect(mention.props()).to.have.property('text', '@Oscar Wallhult');
      });

      it('should try and use attrs.text if .text is not present', () => {
        const mention = mount(renderNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd', text: '@Oscar Wallhult' } }));
        expect(mention.is(Mention)).to.equal(true);
        expect(mention.props()).to.have.property('text', '@Oscar Wallhult');
      });

      it('should try and use attrs.displayName if there is no .text and no attrs.text', () => {
        const mention = mount(renderNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd', displayName: '@Oscar Wallhult' } }));
        expect(mention.is(Mention)).to.equal(true);
        expect(mention.props()).to.have.property('text', '@Oscar Wallhult');
      });

      it('should try and use attrs.displayName if there is no .text and no attrs.text', () => {
        const mention = mount(renderNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd', displayName: '@Oscar Wallhult' } }));
        expect(mention.is(Mention)).to.equal(true);
        expect(mention.props()).to.have.property('text', '@Oscar Wallhult');
      });

      it('should render with @unknown if text cannot be resolved', () => {
        const mention = mount(renderNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd' } }));
        expect(mention.is(Mention)).to.equal(true);
        expect(mention.props()).to.have.property('text', '@unknown');
      });
    });
  });
});
