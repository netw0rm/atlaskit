import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Code from '../../src/marks/code';

describe('<Code />', () => {
  const mark = shallow(<Code>This is code</Code>);

  it('should wrap content with <span>-tag', () => {
    expect(mark.is('span')).to.equal(true);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<span style="font-family:monospace;white-space:pre-wrap;">This is code</span>');
  });
});
