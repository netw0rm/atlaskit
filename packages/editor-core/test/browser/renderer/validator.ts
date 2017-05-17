import { expect } from 'chai';
import {
  isSafeUrl,
  isSubSupType,
  getValidNode,
  getValidMark,
  getMarksByOrder,
  isSameMark,
  markOrder,
} from '../../../src/renderer/validator';

import schema from '../../../stories/schema';

describe('Renderer - Validator', () => {

  describe('isSafeUrl', () => {
    const safeURLs = [
      'http:///www.atlassian.com',
      'https://www.atlassian.com',
      'ftp://some.site.com',
      'ftps://some.site.com',
      '//www.atlassian.com',
      '//hipchat.com',
      '//subdomain.somedomain.com',
      '//www.atlassian.com/somepage',
      'mailto:user@mail.com'
    ];

    const unsafeURLs = [
      'javascript:alert("Hello World!")',
      ' javascript:alert("Hello World!")',
      '\njavascript:alert("Hello World!")',
    ];

    it('should return true if URL starts with http://, https://, ftp://, ftps:// etc', () => {
      safeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(true);
      });
    });

    it('should return false for "unsafe" URLs', () => {
      unsafeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(false);
      });
    });
  });

  describe('isSubSupType', () => {
    it('should return false if type is not "sub" or "sup"', () => {
      expect(isSubSupType('banana')).to.equal(false);
    });

    it('should return true if type is "sub"', () => {
      expect(isSubSupType('sub')).to.equal(true);
    });

    it('should return true if type is "sup"', () => {
      expect(isSubSupType('sup')).to.equal(true);
    });
  });

  describe('getValidNode', () => {

    describe('unknown', () => {
      it('should return "unkown" if type is unkown', () => {
        expect(getValidNode({ type: 'banana' }).type).to.equal('unknown');
      });

      it('should pass through attrs, content and text', () => {
        expect(getValidNode({ type: 'banana', text: 'a banana', attrs: { color: 'yellow' }, content: [] })).to.deep.equal({
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
        expect(getValidNode({ type: 'doc', version: 1 } as any).type).to.equal('unknown');
      });

      it('should return "unkown" if content-field is empty-array', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [] } as any).type).to.equal('unknown');
      });

      it('should return "doc" with content field and without version', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [{ type: 'unknown' }] } as any)).to.deep.equal({
          type: 'doc',
          content: [
            {
              type: 'unknown',
              attrs: undefined,
              content: undefined,
              text: undefined,
            }
          ]
        });
      });
    });

    describe('emoji', () => {
      it('should pass through attrs as emoji', () => {
        const emojiId = { shortName: ':grinning:', id: '123', fallback: 'cheese' };
        const { type, attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('emoji');
        expect(attrs).to.deep.equal(emojiId);
      });

      it('should pass through attrs with only shortName as emoji', () => {
        const emojiId = { shortName: ':grinning:' };
        const { type, attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('emoji');
        expect(attrs).to.deep.equal(emojiId);
      });

      it('should reject emoji without shortName', () => {
        const emojiId = { id: '123', fallback: 'cheese' };
        const { type, attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('unknown');
        expect(attrs).to.deep.equal(emojiId);
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
        expect(getValidNode({ type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] })).to.deep.equal({
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

    describe('text', () => {
      it('should return "unknown" if text-field is missing', () => {
        expect(getValidNode({ type: 'text' }).type).to.equal('unknown');
      });

      it('should return "text" with text', () => {
        expect(getValidNode({ type: 'text', text: 'Hello World' })).to.deep.equal({
          type: 'text',
          text: 'Hello World',
        });

        expect(getValidNode({ type: 'text', text: 'Hello World', marks: [{ type: 'strong' }] })).to.deep.equal({
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
                collection: 'MediaServicesSample'
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
                collection: 'MediaServicesSample'
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
            collection: 'MediaServicesSample'
          }
        })).to.deep.equal({
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collection: 'MediaServicesSample'
          }
        });
      });
    });

  });

  describe('getValidMark', () => {

    describe('unkown', () => {
      it('should return null if type is unkown', () => {
        expect(getValidMark({ type: 'banana' })).to.equal(null);
      });
    });

    describe('em', () => {
      it('should return "em"', () => {
        expect(getValidMark({ type: 'em' })).to.deep.equal({
          type: 'em',
        });
      });
    });

    describe('link', () => {
      it('should return null if attrs is missing', () => {
        expect(getValidMark({ type: 'link' })).to.equal(null);
      });

      it('should use attrs.href if present', () => {
        expect(getValidMark({ type: 'link', attrs: { href: 'https://www.atlassian.com' } })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
        });
      });

      it('should use attrs.url if present and attrs.href is missing', () => {
        expect(getValidMark({ type: 'link', attrs: { url: 'https://www.atlassian.com' } })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
        });
      });
    });

    describe('strike', () => {
      it('should return "strike"', () => {
        expect(getValidMark({ type: 'strike' })).to.deep.equal({
          type: 'strike',
        });
      });
    });

    describe('strong', () => {
      it('should return "strong"', () => {
        expect(getValidMark({ type: 'strong' })).to.deep.equal({
          type: 'strong',
        });
      });
    });

    describe('subsup', () => {
      it('should return null if attrs is missing', () => {
        expect(getValidMark({ type: 'subsup' })).to.equal(null);
      });

      it('should return null if attrs.type is not sub or sup', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'banana' } })).to.equal(null);
      });

      it('should return "subsup" with correct type', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'sub' } })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sub'
          },
        });

        expect(getValidMark({ type: 'subsup', attrs: { type: 'sup' } })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sup'
          },
        });
      });
    });

    describe('underline', () => {
      it('should return "underline"', () => {
        expect(getValidMark({ type: 'underline' })).to.deep.equal({
          type: 'underline',
        });
      });
    });

  });

  describe('getMarksByOrder', () => {
    const { strong, strike, link, em, subsup, underline } = schema.marks;

    it('should return marks in right order', () => {
      // const unorderedMarks = [
      //   {
      //     type: { name: 'strong' }
      //   },
      //   {
      //     type: { name: 'link' }
      //   },
      //   {
      //     type: { name: 'em' }
      //   },
      //   {
      //     type: { name: 'mono' }
      //   },
      //   {
      //     type: { name: 'subsup' }
      //   },
      //   {
      //     type: { name: 'underline' }
      //   },
      //   {
      //     type: { name: 'strike' }
      //   },
      // ];
      const unorderedMarks = [
        strong.create(),
        link.create({ href: 'www.atlassian.com' }),
        em.create(),
        subsup.create(),
        underline.create(),
        strike.create(),
      ];

      const orderedMarks = getMarksByOrder(unorderedMarks);
      orderedMarks.forEach((mark, index) => {
        expect(markOrder[index]).to.equal(mark.type.name);
      });
    });
  });

  describe('isSameMark', () => {

    const { strong, strike, link } = schema.marks;

    const strongMark = strong.create();
    const strikeMark = strike.create();

    const linkMark1 = link.create({ href: 'www.atlassian.com' });
    const linkMark2 = link.create({ href: 'www.hipchat.com' });

    it('should return false if mark is null or otherMark is null', () => {
      expect(isSameMark(null, strongMark)).to.equal(false);
      expect(isSameMark(strongMark, null)).to.equal(false);
    });

    it('should return false if type is not the same', () => {
      expect(isSameMark(strongMark, strikeMark)).to.equal(false);
    });

    it('should return false if mark-type is the same but attributes is not', () => {
      expect(isSameMark(linkMark1, linkMark2)).to.equal(false);
    });

    it('should return true if type is the same and attributes match', () => {
      expect(isSameMark(linkMark1, linkMark1)).to.equal(true);
    });

  });
});
