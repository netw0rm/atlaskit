import { shallow, mount } from 'enzyme';
import React from 'react';

import Button from '../src/index';
import styles from '../src/less/styles.less';

describe('ak-button/default-behaviour', () => {
  it('button should have type="button" by default', () =>
    expect(shallow(<Button />).instance().props.type).to.equal('button')
  );

  it('should render button if there is no href property', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('button').length).to.equal(1);
    expect(wrapper.find('a').length).to.equal(0);
    wrapper.unmount();
  });

  it('should render link if href property is set', () => {
    const wrapper = mount(<Button href="test" />);
    expect(wrapper.find('a').length).to.equal(1);
    expect(wrapper.find('button').length).to.equal(0);
    wrapper.unmount();
  });

  it('should not render link without href prop, even if the target prop is set', () => {
    const wrapper = mount(<Button target="something" />);
    expect(wrapper.find('a').length).to.equal(0);
    expect(wrapper.find('button').length).to.equal(1);
    wrapper.unmount();
  });

  it('should render span when the button is disabled and has href property', () => {
    const wrapper = mount(<Button isDisabled href="test" />);
    expect(wrapper.find(`span > span.${styles.locals.buttonWrapper}`).length).to.equal(1);
    expect(wrapper.find('button').length).to.equal(0);
    expect(wrapper.find('a').length).to.equal(0);
    wrapper.unmount();
  });

  it('should not render span when the button is disabled, but doesn\'t have href', () => {
    const wrapper = mount(<Button isDisabled />);
    expect(wrapper.find(`span > ${styles.locals.buttonWrapper}`).length).to.equal(0);
    expect(wrapper.find('button').length).to.equal(1);
    expect(wrapper.find('a').length).to.equal(0);
    wrapper.unmount();
  });

  it('should render icon if the prop iconBefore is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconBefore={Icon} />);
    expect(wrapper.contains(Icon)).to.equal(true);
    wrapper.unmount();
  });

  it('should render iconBefore before children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon}>button</Button>);
    expect(wrapper.text()).to.equal('iconbutton');
    wrapper.unmount();
  });

  it('should render icon if the prop iconAfter is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconAfter={Icon} />);
    expect(wrapper.contains(Icon)).to.equal(true);
    wrapper.unmount();
  });

  it('should render iconAfter after children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(<Button href="test" iconAfter={Icon}>button</Button>);
    expect(wrapper.text()).to.equal('buttonicon');
    wrapper.unmount();
  });

  it('should be able to render both of the icons', () => {
    const Icon1 = <div id="icon">icon1</div>;
    const Icon2 = <div id="icon">icon2</div>;
    const wrapper = mount(<Button href="test" iconBefore={Icon1} iconAfter={Icon2}>button</Button>);
    expect(wrapper.contains(Icon1)).to.equal(true);
    expect(wrapper.contains(Icon2)).to.equal(true);
    expect(wrapper.text()).to.equal('icon1buttonicon2');
    wrapper.unmount();
  });

  it('should call onClick handler when link is clicked', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Button href="test" onClick={spy}>button</Button>);
    wrapper.find('a').simulate('click');
    expect(spy.callCount).to.equal(1);
    wrapper.unmount();
  });

  it('should call onClick handler when button is clicked', () => {
    const spy = sinon.spy();
    const wrapper = mount(<Button onClick={spy}>button</Button>);
    wrapper.find('button').simulate('click');
    expect(spy.callCount).to.equal(1);
    wrapper.unmount();
  });

  it('should render tabIndex attribute when the tabIndex property is set', () => {
    const wrapper = mount(<Button tabIndex={0}>button</Button>);
    const wrapperHref = mount(<Button href="#" tabIndex={0}>link</Button>);
    const wrapperDisabled = mount(<Button tabIndex={0} isDisabled>span</Button>);

    expect(wrapper.find('button').is('[tabIndex=0]')).to.equal(true);
    expect(wrapperHref.find('a').is('[tabIndex=0]')).to.equal(true);
    expect(wrapperDisabled.find('button').is('[tabIndex=0]')).to.equal(true);

    wrapper.unmount();
    wrapperHref.unmount();
    wrapperDisabled.unmount();
  });

  it('should set accessibility attributes', () => {
    const wrapper = mount(<Button />);
    const wrapperHasPopup = mount(<Button ariaHaspopup />);
    const wrapperExpanded = mount(<Button ariaExpanded />);
    const wrapperAriaControls = mount(<Button ariaControls="test" />);
    const wrapperId = mount(<Button id="test" />);

    expect(wrapper.find('button[aria-haspopup]').length).to.equal(0);
    expect(wrapper.find('button[aria-expanded]').length).to.equal(0);
    expect(wrapper.find('button[aria-controls]').length).to.equal(0);
    expect(wrapper.find('button[id]').length).to.equal(0);
    expect(wrapperHasPopup.find('button[aria-haspopup=true]').length).to.equal(1);
    expect(wrapperExpanded.find('button[aria-expanded=true]').length).to.equal(1);
    expect(wrapperAriaControls.find('button[aria-controls="test"]').length).to.equal(1);
    expect(wrapperId.find('button[id="test"]').length).to.equal(1);

    wrapper.unmount();
    wrapperHasPopup.unmount();
    wrapperExpanded.unmount();
    wrapperAriaControls.unmount();
    wrapperId.unmount();
  });
});
