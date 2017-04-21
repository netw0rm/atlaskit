import { shallow, mount } from 'enzyme';
import React from 'react';

import Button from '../src/index';
import styles from '../src/less/styles.less';

describe('ak-button/default-behaviour', () => {
  it('button should have type="button" by default', () =>
    expect(shallow(<Button />).instance().props.type).to.equal('button')
  );

  it('should render button if there is no href property', () => {
    expect(mount(<Button />).find('button').length).to.equal(1);
    expect(mount(<Button />).find('a').length).to.equal(0);
  });

  it('should render link if href property is set', () => {
    expect(mount(<Button href="test" />).find('a').length).to.equal(1);
    expect(mount(<Button href="test" />).find('button').length).to.equal(0);
  });

  it('should not render link without href prop, even if the target prop is set', () => {
    expect(mount(<Button target="something" />).find('a').length).to.equal(0);
    expect(mount(<Button target="something" />).find('button').length).to.equal(1);
  });

  it('should render span when the button is disabled and has href property', () => {
    expect(mount(<Button isDisabled href="test" />).find(`span > span.${styles.buttonWrapper}`).length).to.equal(1);
    expect(mount(<Button isDisabled href="test" />).find('button').length).to.equal(0);
    expect(mount(<Button isDisabled href="test" />).find('a').length).to.equal(0);
  });

  it('should not render span when the button is disabled, but doesn\'t have href', () => {
    expect(mount(<Button isDisabled />).find(`span > ${styles.buttonWrapper}`).length).to.equal(0);
    expect(mount(<Button isDisabled />).find('button').length).to.equal(1);
    expect(mount(<Button isDisabled />).find('a').length).to.equal(0);
  });

  it('should render icon if the prop iconBefore is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconBefore={Icon} />);
    expect(wrapper.contains(Icon)).to.equal(true);
  });

  it('should render iconBefore before children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon}>button</Button>);
    expect(wrapper.text()).to.equal('iconbutton');
  });

  it('should render icon if the prop iconAfter is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconAfter={Icon} />);
    expect(wrapper.contains(Icon)).to.equal(true);
  });

  it('should render iconAfter after children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconAfter={Icon}>button</Button>);
    expect(wrapper.text()).to.equal('buttonicon');
  });

  it('should be able to render both of the icons', () => {
    const Icon1 = <div id="icon">icon1</div>;
    const Icon2 = <div id="icon">icon2</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon1} iconAfter={Icon2}>button</Button>);
    expect(wrapper.contains(Icon1)).to.equal(true);
    expect(wrapper.contains(Icon2)).to.equal(true);
    expect(wrapper.text()).to.equal('icon1buttonicon2');
  });

  it('should call onClick handler when link is clicked', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Button href="test" onClick={spy}>button</Button>);
    wrapper.find('a').simulate('click');
    expect(spy.callCount).to.equal(1);
  });

  it('should call onClick handler when button is clicked', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Button onClick={spy}>button</Button>);
    wrapper.find('button').simulate('click');
    expect(spy.callCount).to.equal(1);
  });

  it('should render tabIndex attribute when the tabIndex property is set', () => {
    let wrapper = mount(<Button tabIndex={0}>button</Button>);
    expect(wrapper.find('button').is('[tabIndex=0]')).to.equal(true);
    wrapper = mount(<Button href="#" tabIndex={0}>link</Button>);
    expect(wrapper.find('a').is('[tabIndex=0]')).to.equal(true);
    wrapper = mount(<Button tabIndex={0} isDisabled>span</Button>);
    expect(wrapper.find('button').is('[tabIndex=0]')).to.equal(true);
  });

  it('should set accessibility attributes', () => {
    expect(mount(<Button />).find('button[aria-haspopup]').length).to.equal(0);
    expect(mount(<Button />).find('button[aria-expanded]').length).to.equal(0);
    expect(mount(<Button />).find('button[aria-controls]').length).to.equal(0);
    expect(mount(<Button />).find('button[id]').length).to.equal(0);
    expect(mount(<Button ariaHaspopup />).find('button[aria-haspopup=true]').length).to.equal(1);
    expect(mount(<Button ariaExpanded />).find('button[aria-expanded=true]').length).to.equal(1);
    expect(mount(<Button ariaControls="test" />).find('button[aria-controls="test"]').length).to.equal(1);
    expect(mount(<Button id="test" />).find('button[id="test"]').length).to.equal(1);
  });
});
