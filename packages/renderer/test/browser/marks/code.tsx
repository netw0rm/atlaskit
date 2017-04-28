import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AkCode } from '@atlaskit/code';
import Code from '../../../src/marks/code';

describe('<Code />', () => {
  const mark = shallow(<Code text="This is code"/>);

  it('should render an AkCode component', () => {
    expect(mark.find(AkCode).length).to.equal(1);
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<span style="font-family:monospace;white-space:pre-wrap;">This is code</span>');
  });
});
