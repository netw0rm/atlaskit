import { render } from 'enzyme';
import React from 'react';
import HeaderSearch from '../../src/HeaderSearch';

describe('HeaderSearch', () => {
  const headerSearch = <HeaderSearch />;

  it('should include the search form', () => {
    const wrapped = render(headerSearch);
    expect(wrapped.find('form[action="/search"]').length).to.equal(1);
  });
});
