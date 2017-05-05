import React from 'react';

import sinon from 'sinon';
import { AkSearch } from '@atlaskit/navigation';
import { mount } from 'enzyme';

import QuickSearch from '../../../src/';
import ResultsList from '../../../src/components/ResultsList';
import { ParsingSearchResource } from '../../../src/api/SearchResource';

describe('<QuickSearch />', () => {
  it('should correctly render initial state', () => {
    const srchRsrc = new ParsingSearchResource({ userId: 1, cloudId: 2 });
    sinon.stub(srchRsrc, 'recentItems', () => srchRsrc.notifyChange('recent', {}));
    const wrapper = mount(<QuickSearch searchResource={srchRsrc} />);
    expect(wrapper.find(AkSearch).find(ResultsList)).to.have.length(1);
  });
});
