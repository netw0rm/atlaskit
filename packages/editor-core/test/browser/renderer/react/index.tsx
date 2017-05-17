import { mount } from 'enzyme';
import { expect } from 'chai';
import ReactSerializer from '../../../../src/renderer/react';
import schema from '../../../../stories/schema';

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
    }
  ]
};

const docFromSchema = schema.nodeFromJSON(doc);

describe('Renderer - ReactSerializer', () => {

  describe('serializeFragment', () => {

    it('should render document', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema);
      const reactDoc = mount(reactSerializer.serializeFragment(docFromSchema.content) as any);

      const root = reactDoc.find('div');
      const paragraph = root.find('p');
      const link = paragraph.find('a');
      const strong = link.find('strong');

      expect(root.length).to.equal(1);
      expect(paragraph.length).to.equal(1);
      expect(link.length).to.equal(1);
      expect(strong.length).to.equal(1);

      expect(link.text()).to.equal('Hello, World!');
      expect(link.props()).to.have.property('href', 'https://www.atlassian.com');
      expect(strong.text()).to.equal('World!');
    });

  });

});
