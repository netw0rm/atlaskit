import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Group from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).to.exist;
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    expect(wrapper).to.have.descendants(`.${styles.heading}`);
    expect(wrapper.find(`.${styles.heading}`)).to.have.descendants(`.${styles.content}`);
    expect(wrapper.find(`.${styles.content}`)).to.have.text('test');
    expect(wrapper).to.not.have.descendants(`.${styles.elemAfter}`);
  });

  it('should render elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper).to.have.descendants(`.${styles.elemAfter}`);
    expect(wrapper.find(`.${styles.elemAfter}`)).to.have.text('elem');
  });

  it('should generate corrent ariaLabel from heading and elemAfter', () => {
    const wrapper = mount(<Group heading="test" elemAfter="elem" />);
    expect(wrapper.instance().getAriaLabel()).to.equal('test elem');
  });
});
