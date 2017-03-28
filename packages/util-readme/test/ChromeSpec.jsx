import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Chrome from '../src/Chrome';

const expect = chai.expect;

describe('Chrome', () => {
  it('renders the provided title', () => {
    expect(shallow(<Chrome title="foobarbaz">a</Chrome>).contains('foobarbaz')).to.equal(true);
  });

  it('renders the provided children', () => {
    const children = ['a', 'b'];
    expect(shallow(<Chrome title="foobarbaz">{children}</Chrome>).contains(children)).to.equal(true);
  });
});
