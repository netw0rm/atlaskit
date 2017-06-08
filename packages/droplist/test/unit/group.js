import React from 'react';
import { shallow, mount } from 'enzyme';

import { name } from '../../package.json';

import { Group } from '../../src';
import { Heading, HeadingAfter, HeadingText } from '../../src/styled/Group';

describe(`${name} - group`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).not.to.equal(undefined);
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    expect(wrapper.find(Heading).length).to.be.above(0);
    expect(wrapper.find(Heading).find(HeadingText).length).to.be.above(0);
    expect(wrapper.find(HeadingText).childAt(0).text()).to.equal('test');
    expect(wrapper.find(HeadingAfter).length).to.equal(0);
  });

  it('should render elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.find(HeadingAfter).length).to.be.above(0);
    expect(wrapper.find(HeadingAfter).text()).to.equal('elem');
  });

  it('should generate corrent ariaLabel from heading and elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.instance().getAriaLabel()).to.equal('test elem');
  });
});
