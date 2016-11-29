import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';

import Button from '../src/index';
import styles from '../src/less/styles.less';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const expect = chai.expect;

describe('ak-button/default-behaviour', () => {
  it('button should have type="button" by default', () =>
    expect(shallow(<Button />).instance().props.type).to.equal('button')
  );

  it('should render button if there is no href property', () => {
    expect(shallow(<Button />).find('button')).to.be.defined;
    expect(shallow(<Button />).find('a')).not.to.be.defined;
  });

  it('should render link if href property is set', () => {
    expect(shallow(<Button href="test" />).find('a')).to.be.defined;
    expect(shallow(<Button href="test" />).find('button')).not.to.be.defined;
  });

  it('should not render link without href prop, even if the target prop is set', () => {
    expect(shallow(<Button target="something" />).find('a')).to.be.defined;
    expect(shallow(<Button target="something" />).find('button')).not.to.be.defined;
  });

  it('should render span when the button is disabled', () => {
    expect(shallow(<Button disabled />).find(`span.${styles.locals.button}`)).to.be.defined;
    expect(shallow(<Button target="something" />).find('button')).not.to.be.defined;
    expect(shallow(<Button target="something" />).find('a')).not.to.be.defined;
  });

  it('should render icon if the prop iconBefore is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconBefore={Icon} />);
    expect(wrapper).to.contain(Icon);
  });

  it('should render iconBefore before children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon}>button</Button>);
    expect(wrapper).to.have.text('iconbutton');
  });

  it('should render icon if the prop iconAfter is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconAfter={Icon} />);
    expect(wrapper).to.contain(Icon);
  });

  it('should render iconAfter after children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconAfter={Icon}>button</Button>);
    expect(wrapper).to.have.text('buttonicon');
  });

  it('should be able to render both of the icons', () => {
    const Icon1 = <div id="icon">icon1</div>;
    const Icon2 = <div id="icon">icon2</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon1} iconAfter={Icon2}>button</Button>);
    expect(wrapper).to.contain(Icon1);
    expect(wrapper).to.contain(Icon2);
    expect(wrapper).to.have.text('icon1buttonicon2');
  });

  it('should call onClick handler when button is clicked', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Button onClick={spy}>button</Button>);
    wrapper.find('button').simulate('click');
    expect(spy).to.have.been.calledOnce;
  });
});
