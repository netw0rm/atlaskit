import React from 'react';
import { shallow } from 'enzyme';

import SuggestedApplication from '../src/components/SuggestedApplication';
import { MenuItemContainer } from '../src/styled';
import { name } from '../package.json';

describe(name, () => {
  it('should return null if show is set to false', () => {
    const wrapper = shallow(<SuggestedApplication show={false} />);

    expect(wrapper.type()).to.equal(null);
  });

  it('should listen for click events', () => {
    const onClick = sinon.spy();

    const wrapper = shallow(<SuggestedApplication show application="jira" onDontShowAgainClick={onClick} i18n={{}} />);
    wrapper.find(MenuItemContainer).simulate('click');

    expect(onClick).to.have.property('callCount', 1);
  });
});
