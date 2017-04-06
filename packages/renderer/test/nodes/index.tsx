import { expect } from 'chai';
import { getValidNode, renderNode } from '../../src/nodes';

describe('Nodes', () => {
  describe('getValidNode', () => {

    describe('unkown', () => {
      it('should return "unkown" if type is unkown', () => {
        expect(getValidNode({ type: 'banana' }).type).to.equal('unknown');
      });

      it('should pass through attrs, content and text', () => {
        expect(getValidNode({ type: 'banana', text: 'a banana', attrs: { color: 'yellow'  }, content: [] })).to.deep.equal({
          type: 'unknown',
          text: 'a banana',
          attrs: {
            color: 'yellow'
          },
          content: []
        });
      });
    });

    describe('doc', () => {
      it('should return "unkown" if version-field is missing', () => {
        expect(getValidNode({ type: 'doc' }).type).to.equal('unknown');
      });

      it('should return "unknown" if content-field is missing', () => {
        expect(getValidNode({ type: 'doc', version: 1 }).type).to.equal('unknown');
      });

      it('should return "unkown" if content-field is empty-array', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [] }).type).to.equal('unknown');
      });

      it('should return "doc" with version and content fields', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [ { type: 'other node' } ]})).to.deep.equal({
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'other node'
            }
          ]
        });
      });
    });

    describe('emoji', () => {
      it('should pass through attrs as id, fallback as text', () => {
        const emojiId = { shortName: ':grinning:', id: '123', fallback: 'cheese' };
        const { attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(attrs).to.not.be.undefined;
        if (attrs) {
          expect(attrs.id, 'emoji id').to.deep.equal(emojiId);
          expect(attrs.text, 'emoji text').to.be.equal('cheese');
        }
      });

      it('should pass through shortName as text if no fallback', () => {
        const emojiId = { shortName: ':grinning:', id: '123' };
        const { attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(attrs).to.not.be.undefined;
        if (attrs) {
          expect(attrs.id, 'emoji id').to.deep.equal(emojiId);
          expect(attrs.text, 'emoji text').to.be.equal(':grinning:');
        }
      });
    });

    describe('hardBreak', () => {
      it('should return "hardBreak"', () => {
        expect(getValidNode({ type: 'hardBreak' })).to.deep.equal({ type: 'hardBreak' });
      });

      it('should discard any extranous attributes', () => {
        expect(getValidNode({ type: 'hardBreak', attrs: { color: 'green' } })).to.deep.equal({ type: 'hardBreak' });
      });
    });

    describe('mention', () => {
      it('should return "unknown" if it can not find an ID ', () => {
        expect(getValidNode({ type: 'mention', attrs: { text: '@Oscar' } }).type).to.deep.equal('unknown');
      });

      it('should use attrs.text if present', () => {
        expect(getValidNode({ type: 'mention', attrs: { text: '@Oscar', id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should use attrs.displayName if present and attrs.text is missing', () => {
        expect(getValidNode({ type: 'mention', attrs: { displayName: '@Oscar', id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should use .text if present and attrs.text and attrs.displayName is missing', () => {
        expect(getValidNode({ type: 'mention', text: '@Oscar', attrs: { id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should set attrs.text to "@unknown" if no valid text-property is available', () => {
        expect(getValidNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@unknown',
            id: 'abcd-abcd-abcd'
          }
        });
      });

    });

    describe('paragraph', () => {
      it('should return "unknown" if content-field is missing', () => {
        expect(getValidNode({ type: 'paragraph' }).type).to.equal('unknown');
      });

      it('should return "paragraph" if content-field is empty array', () => {
        expect(getValidNode({ type: 'paragraph', content: [] }).type).to.equal('paragraph');
      });

      it('should return "paragraph" with content', () => {
        expect(getValidNode({ type: 'paragraph', content: [ { type: 'text', text: 'Hello World'} ]})).to.deep.equal({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('textWrapper', () => {
      it('should return "unknown" if content-field is missing or is empty-array', () => {
        expect(getValidNode({ type: 'textWrapper' }).type).to.equal('unknown');
        expect(getValidNode({ type: 'textWrapper', content: [] }).type).to.equal('unknown');
      });

      it('should return "textWrapper" with content', () => {
        expect(getValidNode({ type: 'textWrapper', content: [ { type: 'text', text: 'Hello World' }] })).to.deep.equal({
          type: 'textWrapper',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('text', () => {
      it('should return "unknown" if text-field is missing', () => {
        expect(getValidNode({ type: 'text' }).type).to.equal('unknown');
      });

      it('should return "text" with text and marks', () => {
        expect(getValidNode({ type: 'text', text: 'Hello World' })).to.deep.equal({
          type: 'text',
          text: 'Hello World',
          marks: []
        });

        expect(getValidNode({ type: 'text', text: 'Hello World', marks: [ { type: 'strong' } ]})).to.deep.equal({
          type: 'text',
          text: 'Hello World',
          marks: [
            {
              type: 'strong'
            }
          ]
        });
      });
    });

    describe('mediaGroup', () => {
      it('should return "mediaGroup" with type and content', () => {
        expect(getValidNode({
          type: 'mediaGroup',
          content: [
            {
              type: 'media',
              attrs: {
                type: 'file',
                id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
                collectionId: ['MediaServicesSample']
              }
            }
          ]
        })).to.deep.equal({
          type: 'mediaGroup',
          content: [
            {
              type: 'media',
              attrs: {
                type: 'file',
                id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
                collectionId: ['MediaServicesSample']
              }
            }
          ]
        });
      });
    });

    describe('media', () => {
      it('should return "media" with attrs and type', () => {
        expect(getValidNode({
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collectionId: ['MediaServicesSample']
          }
        })).to.deep.equal({
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collectionId: ['MediaServicesSample']
          }
        });
      });
    });

  });

  describe('renderNode', () => {
    it('should try and render unknown nodes as text', () => {
      expect(renderNode({ type: 'unknown', text: 'Hello world' })).to.equal('Hello world');
      expect(renderNode({ type: 'unknown', attrs: { text: 'Hello world' } })).to.equal('Hello world');
    });

    it('should return "Unknown type: {type}" if it cannot be rendered as text', () => {
      expect(renderNode({ type: 'banana'})).to.equal('Unknown type: "banana"');
    });

    it('should return "Unknown format: {type}" if type is known but format is wrong', () => {
      expect(renderNode({ type: 'mention', attrs: { 'name': 'Oscar', 'uuid': 'nah' } })).to.equal('Unknown format: "mention"');
    });

  });
});
