import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

import { name } from '../package.json';
import styles from '../src/styles.less';

import Group from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;


describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Group />)).to.be.defined;
  });

  it('should render heading', () => {
    const wrapper = shallow(<Group heading="test" />);
    expect(wrapper).to.have.descendants(`.${styles.locals.heading}`);
    expect(wrapper.find(`.${styles.locals.heading}`)).to.have.text('test');
  });
});
