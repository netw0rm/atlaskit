import { expect } from 'chai';
import TextSerializer from '../../../../src/renderer/text';
import { applyMark, serializeNode } from '../../../../src/renderer/text/util';
import customNodeSerializers from '../../../../src/renderer/text/nodes';
import {
  media,
  p as paragraph,
} from '../../../../src/test-helper';
import schema from '../../../../src/test-helper/schema';

const doc = {
  'type': 'doc',
  'content': [
    {
      'type': 'paragraph',
      'content': [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com'
              }
            }
          ]
        },
      ]
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            id: 'foo',
            collection: 'SampleItems',
            type: 'image',
          },
        },
      ],
    },
  ]
};

const docFromSchema = schema.nodeFromJSON(doc);

describe('Renderer - TextSerializer', () => {

  describe('serializeFragment', () => {

    it('should render document', () => {
      const serializer = TextSerializer.fromSchema(schema);
      const text = serializer.serializeFragment(docFromSchema.content);

      expect(text).to.equal(`Hello, (https://www.atlassian.com) World! (https://www.atlassian.com)
media attachment (foo in collection SampleItems)`);
    });

  });

  it('should return node text if there is no special mark behaviour', () => {
    const mark = schema.marks.underline.create();
    expect(applyMark('https://www.atlassian.com', mark)).to.equal('https://www.atlassian.com');
  });

  it('should use node text if there is no special node serialization behaviour', () => {
    const node = paragraph('Atlassian');
    expect(serializeNode(node, customNodeSerializers)).to.equal('Atlassian');
  });

  it('should use special node serialization behaviour if it exists', () => {
    const node = media({
      id: 'foo',
      type: 'file',
      collection: 'bar'
    });

    expect(serializeNode(node, customNodeSerializers)).to.not.equal('');
  });
});
