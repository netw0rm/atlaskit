import { expect } from 'chai';
import TextSerializer from '../../../../src/renderer/text';
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

});
