import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { AkCode } from '../../src';
import { shallow } from 'enzyme';

describe('@atlaskit/code', () => {
  describe('AkCode', () => {
    it('should pass language property into react-syntax-highligher', () => {
      const code = shallow(<AkCode language="javascript" text="This is code"/>);
      expect(code.find(SyntaxHighlighter).prop('language')).toEqual('javascript');
    });

    it('should use markdown language if language is not set', () => {
      const code = shallow(<AkCode text="This is markdown text"/>);
      expect(code.find(SyntaxHighlighter).prop('language')).toEqual('md');
    });

    it('should not render SyntaxHighlighter is language=text', () => {
      const code = shallow(<AkCode language="text" text="const a = 2;"/>);
      expect(code.find(SyntaxHighlighter)).toHaveLength(0);
    });
  });
});
