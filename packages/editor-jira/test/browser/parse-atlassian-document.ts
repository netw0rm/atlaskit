import * as chai from 'chai';
import { expect } from 'chai';
import { chaiPlugin } from '@atlaskit/editor-core/dist/es5/test-helper';
import { parseIntoAtlassianDocument } from '../../src';
import { makeSchema } from '../../src/schema';

chai.use(chaiPlugin);

describe('parseIntoAtlassianDocument', () => {
  it('should parse HTML', () => {
    const schema = makeSchema({});
    const json = parseIntoAtlassianDocument('<p>text</p>', schema);

    expect(json).to.deep.equal({
      type: 'doc',
      version: 1,
      content: [{
        type: 'paragraph',
        content: [{
          type: 'text',
          text: 'text',
        }],
      }],
    });
  });

  it('should parse HTML according to schema', () => {
    const schema = makeSchema({ allowMedia: false, allowLinks: true });
    const json = parseIntoAtlassianDocument('<p><a href="http://www.atlassian.com">Atlassian</a></p><p>This is a list: <ul><li>element</li></ul></p>', schema);

    expect(json).to.deep.equal({
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{
            type: 'text',
            text: 'Atlassian',
            marks: [{
              type: 'link',
              attrs: {
                href: 'http://www.atlassian.com',
              },
            }],
          }],
        },
        {
          type: 'paragraph',
          content: [{
            type: 'text',
            text: 'This is a list:'
          }]
        },
        {
          type: 'paragraph',
          content: [],
        },
      ],
    });
  });
});
