import React from 'react';
import { shallow, mount } from 'enzyme';

import { Group } from '../../src';

import { name } from '../../package.json';

describe(`${name} - group`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).not.to.equal(undefined);
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    // should render group heading
    expect(wrapper.find('div[role="group"]').length).to.be.above(0);
    // should render content of group heading
    expect(wrapper.find('div[data-role="droplistGroupHeading"]').length).to.be.above(0);
    expect(wrapper.find('div[data-role="droplistGroupHeading"]').text()).to.equal('test');
    // This assertion was removed because we don't have a class for it now. We can revisit how we
    // want to test this in the styled-components rewrite

    // expect(wrapper.find(`.${styles.groupElemAfter}`).length).to.equal(0);
  });

  it('should render elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.find('div[role="group"]').text()).to.equal('testelem');
  });

  it('should generate corrent ariaLabel from heading and elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.instance().getAriaLabel()).to.equal('test elem');
  });
});
