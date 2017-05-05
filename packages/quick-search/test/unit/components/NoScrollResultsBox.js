import React from 'react';

import { shallow } from 'enzyme';

import NoScrollResultsBox from '../../../src/components/NoScrollResultsBox';

describe('<NoScrollResultsBox />', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <NoScrollResultsBox>
        <div id="child-div" />
      </NoScrollResultsBox>
    );
    expect(wrapper.contains(<div id="child-div" />)).to.equal(true);
  });
});
