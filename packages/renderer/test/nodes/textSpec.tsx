import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';

import {
  mergeTextNodes,
  isTextWrapper,
  isText,
  renderTextNodes
} from '../../src/nodes/text';
import * as markUtils from '../../src/marks';

describe('Text', () => {

  describe('mergeTextNodes', () => {

    it('should wrap adjecent text nodes in a textWrapper', () => {
      const input = [
        {
          type: 'text',
          text: 'hello '
        },
        {
          type: 'text',
          text: 'world! '
        },
        {
          type: 'mention',
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'text',
          text: ' is my name!'
        }
      ];

      expect(mergeTextNodes(input)).to.deep.equal([
        {
          type: 'textWrapper',
          content: [
            {
              type: 'text',
              text: 'hello '
            },
            {
              type: 'text',
              text: 'world! '
            }
          ]
        },
        {
          type: 'mention',
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'textWrapper',
          content: [
            {
              type: 'text',
              text: ' is my name!'
            }
          ]
        }
      ]);
    });
  });

  describe('isTextWrapper', () => {
    it('should return true if type equals "textWrapper"', () => {
      expect(isTextWrapper('textWrapper')).to.equal(true);
    });

    it('should return false if type does not equal "textWrapper"', () => {
      expect(isTextWrapper('mention')).to.equal(false);
    });
  });

  describe('isText', () => {
    it('should return true if type equals "text"', () => {
      expect(isText('text')).to.equal(true);
    });

    it('should return false if type does not equal "text"', () => {
      expect(isText('mention')).to.equal(false);
    });
  });

  describe('renderTextNodes', () => {
    it('should wrap text nodes with marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello '
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            }
          ]
        }
      ];

      const output = shallow(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.html()).to.equal('<div>Hello <strong>World!</strong></div>');
    });

    it('should order marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello ',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        }
      ];

      const spy = sinon.spy(markUtils, 'getMarksByOrder');
      renderTextNodes(textNodes);
      expect(spy.calledWith(textNodes[0].marks)).to.equal(true);
    });

    it('should join adjecent text nodes with same marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello ',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
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
                url: 'https://www.atlassian.com'
              }
            }
          ]
        }
      ];

      const output = shallow(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.html()).to.equal('<div><a href="https://www.atlassian.com">Hello <strong>World!</strong></a></div>');
    });
  });

  it('should not join adjecent nodes with same mark type when attributes are not the same', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.hipchat.com'
              }
            }
          ]
        }
      ];

      const output = shallow(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.html()).to.equal('<div><a href="https://www.atlassian.com">Hello</a><a href="https://www.hipchat.com">World!</a></div>');
  });

  it('should not join nodes with same mark type if they are not adjecent', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' '
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        }
      ];

      const output = shallow(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.html()).to.equal('<div><a href="https://www.atlassian.com">Hello</a> <a href="https://www.atlassian.com">World!</a></div>');
  });

});
