import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import { shallow, mount } from 'enzyme';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Group from '../src';

chai.use(chaiAsPromised);
const { expect } = chai;

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).not.to.equal(undefined);
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    expect(wrapper.find(`.${styles.heading}`).length).to.be.above(0);
    expect(wrapper.find(`.${styles.heading}`).find(`.${styles.content}`).length).to.be.above(0);
    expect(wrapper.find(`.${styles.content}`).text()).to.equal('test');
    expect(wrapper.find(`.${styles.elemAfter}`).length).to.equal(0);
  });

  it('should render elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.find(`.${styles.elemAfter}`).length).to.be.above(0);
    expect(wrapper.find(`.${styles.elemAfter}`).text()).to.equal('elem');
  });

  it('should generate corrent ariaLabel from heading and elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.instance().getAriaLabel()).to.equal('test elem');
  });
});
