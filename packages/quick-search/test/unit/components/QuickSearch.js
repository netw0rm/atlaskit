import React from 'react';
import { mount } from 'enzyme';
import { AkSearch } from '@atlaskit/navigation';

import QuickSearch from '../../../src/';
import ResultsList from '../../../src/components/ResultsList';
import { ParsingSearchResource } from '../../../src/api/SearchResource';

describe('<QuickSearch />', () => {
  it('should correctly render initial state', () => {
    const srchRsrc = new ParsingSearchResource({ userId: 1, cloudId: 2 });
    const wrapper = mount(<QuickSearch searchResource={srchRsrc} />);
    expect(wrapper.find(AkSearch).find(ResultsList)).to.have.length(1);
  });
});
