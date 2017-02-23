import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Link from '../../src/marks/link';

describe('<Link />', () => {
  const mark = shallow(<Link attrs={{url: 'https://www.atlassian.com'}}>This is a link</Link>);

  it('should wrap content with <a>-tag', () => {
    expect(mark.is('a')).to.equal(true);
  });

  it('should set href to attrs.url', () => {
    expect(mark.get(0).props).to.have.property('href', 'https://www.atlassian.com');
  });

  it('should output correct html', () => {
    expect(mark.html()).to.equal('<a href="https://www.atlassian.com">This is a link</a>');
  });
});
