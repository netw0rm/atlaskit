import { expect } from 'chai';
// import * as React from 'react';

import { default as hipchatEncoder } from '../../src/encoders/hipchat';

// import { chaiPlugin, sendKeyToPm } from '@atlaskit/editor-core/dist/es5/test-helper';
// import { mount, ReactWrapper } from 'enzyme';
// import Editor from '../src';

// chai.use(chaiPlugin);

const input = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello'
        },
        {
          type: 'mention',
          attrs: {
            displayName: '@World',
            id: '1234'
          }
        },
        {
          type: 'hardBreak'
        },
        {
          type: 'text',
          text: 'Bold',
          marks: [
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'Underline',
          marks: [
            {
              type: 'Underline'
            }
          ]
        },
        {
          type: 'text',
          text: 'Italic',
          marks: [
            {
              type: 'em'
            }
          ]
        },
        {
          type: 'text',
          text: 'www.atlassian.com',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com'
              }
            }
          ]
        }
      ]
    }
  ]
};

const output = [
  {
    type: 'text',
    text: 'Hello',
    marks: []
  },
  {
    type: 'mention',
    text: '@World',
    attrs: {
      displayName: '@World',
      id: '1234'
    }
  },
  {
    type: 'text',
    text: '\n',
    marks: []
  },
  {
    type: 'text',
    text: 'Bold',
    marks: [
      {
        type: 'strong'
      }
    ]
  },
  {
    type: 'text',
    text: 'Underline',
    marks: [
      {
        type: 'Underline'
      }
    ]
  },
  {
    type: 'text',
    text: 'Italic',
    marks: [
      {
        type: 'em'
      }
    ]
  },
  {
    type: 'text',
    text: 'www.atlassian.com',
    marks: [
      {
        type: 'link',
        attrs: {
          url: 'www.atlassian.com'
        }
      }
    ]
  }
];

describe('@atlaskit/editor-hipchat encoders/hipchat', () => {

  it('should produce hipchat-friendly output', () => {
    const encoded = hipchatEncoder(input);
    expect(encoded).to.deep.equal(output);
  });

  it('should merge content from multiple paragraphs and insert line breaks', () => {
    const encoded = hipchatEncoder({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Hello'
            }
          ]
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'World!'
            }
          ]
        }
      ]
    });

    expect(encoded).to.deep.equal(
      [
        {
          type: 'text',
          text: 'Hello',
          marks: []
        },
        {
          type: 'text',
          text: '\n',
          marks: []
        },
        {
          type: 'text',
          text: 'World!',
          marks: []
        }
      ]
    );
  });

});

