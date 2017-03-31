import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Link from '../../src/marks/link';

describe('<Link />', () => {
  let mark;

  beforeEach(() => {
    mark = mount(<Link href="https://www.atlassian.com">This is a link</Link>);
  });
  it('should wrap content with <a>-tag', () => {
    expect(mark.find('a').length).to.equal(1);
  });

  it('should set href to attrs.href', () => {
    expect(mark.find('a').props()).to.have.property('href', 'https://www.atlassian.com');
  });

  afterEach(() => {
    mark.unmount();
  });

});
