import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Heading from '../../src/Heading';

const expect = chai.expect;

describe('Heading', () => {
  it('defaults type to 1', () => {
    expect(shallow(<Heading>a</Heading>).type()).to.equal('h1');
  });

  it('uses type to control the h tag used', () => {
    expect(shallow(<Heading type={3}>a</Heading>).type()).to.equal('h3');
  });

  it('wraps children in the h tag', () => {
    const children = ['a', 'b', 'c'];
    expect(shallow(<Heading type={3}>{children}</Heading>).contains(children)).to.equal(true);
  });
});
