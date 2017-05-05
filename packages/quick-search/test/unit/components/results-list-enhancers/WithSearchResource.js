import React from 'react';

import { shallow } from 'enzyme';

import ResultsList from '../../../../src/components/ResultsList';
import SearchResource from '../../../../src/api/SearchResource';
import withSearchResource from
  '../../../../src/components/results-list-enhancers/WithSearchResource';

describe('<withSearchResource(ResultsList) />', () => {
  const ResourcedResultsList = withSearchResource(ResultsList);

  it('should pass through props that it doesn\'t own', () => {
    const wrapper = shallow(
      <ResourcedResultsList
        resultGroups={{ a: 'a' }}
        resultsType={'pass-through-results-type'}
        randomProp={13}
        searchResource={{}}
      />
    );
    const resultsListWrapper = wrapper.find(ResultsList).first();
    expect(resultsListWrapper.props()).to.deep.equal({
      resultGroups: { a: 'a' },
      resultsType: 'pass-through-results-type',
      randomProp: 13,
    });
  });

  it('should pass state.items to WrappedComponent as resultGroups prop', () => {
    const srchRsrc = new SearchResource({ userId: 'a', cloudId: 'b' });
    const wrapper = shallow(
      <ResourcedResultsList searchResource={srchRsrc} />
    );
    wrapper.instance().setState({ items: 'test-items' });
    expect(wrapper.find(ResultsList).first().props()).to.include({ resultGroups: 'test-items' });
  });
});
