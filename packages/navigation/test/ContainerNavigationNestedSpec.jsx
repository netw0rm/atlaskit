import { mount } from 'enzyme';
import React from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import styles from '../src/components/less/ContainerNavigationNested.less';
import ContainerNavigationNested from '../src/components/js/ContainerNavigationNested';
import NavigationItem from '../src/components/js/NavigationItem';
import { mountWithRootTheme } from './theme-util';

describe('<ContainerNavigationNested />', () => {
  describe('state', () => {
    it('should store previous children in state', () => {
      const previousPane = <h1>Previous Pane</h1>;
      const component = mount(
        <ContainerNavigationNested>{previousPane}</ContainerNavigationNested>
      );
      component.setProps({ children: <h1>New Pane</h1> });
      expect(component.state().prevChildren).to.equal(previousPane);
    });
  });

  describe('render', () => {
    it('should render children', () => {
      expect(mount(<ContainerNavigationNested><h1>Content</h1></ContainerNavigationNested>).find('h1').text()).to.equal('Content');
    });

    it('should have new pane first if animationDirection is right', () => {
      const initPane = <h1>Previous Pane</h1>;
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({ children: newPane, animationDirection: 'right' });
      expect(component.children().at(0).contains(newPane)).to.equal(true);
      expect(component.children().at(1).contains(initPane)).to.equal(true);
    });

    it('should have init pane first if animationDirection is left', () => {
      const initPane = <h1>Previous Pane</h1>;
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({ children: newPane, animationDirection: 'left' });
      expect(component.children().at(0).contains(initPane)).to.equal(true);
      expect(component.children().at(1).contains(newPane)).to.equal(true);
    });

    it('should have left animation class if animationDirection is left', () => {
      const initPane = <h1>Previous Pane</h1>;
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({ children: newPane, animationDirection: 'left' });
      expect(component.find('div').first().hasClass(styles.containerNavigationNestedLeftAnimate)).to.equal(true);
    });

    it('should have right animation class if animationDirection is right', () => {
      const initPane = <h1>Previous Pane</h1>;
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({ children: newPane, animationDirection: 'right' });
      expect(component.find('div').first().hasClass(styles.containerNavigationNestedRightAnimate)).to.equal(true);
    });

    it('should not have the split back button if backButtonIcon option is empty', () => {
      const navItemInSplitBackButton = <NavigationItem text="Go back" />;
      const component = mount(
        <ContainerNavigationNested
          mainNavigationItem={navItemInSplitBackButton}
        >
          <h1>Content</h1>
        </ContainerNavigationNested>
      );
      expect(component.find('ArrowLeftIcon').length).to.equal(0);
      expect(component.find('NavigationItem').length).to.equal(0);
    });

    it('should not have the split back button if mainNavigationItem option is empty', () => {
      const component = mount(
        <ContainerNavigationNested
          backButtonIcon={<ArrowLeftIcon label="Left icon" />}
        >
          <h1>Content</h1>
        </ContainerNavigationNested>
      );
      expect(component.find('ArrowLeftIcon').length).to.equal(0);
      expect(component.find('NavigationItem').length).to.equal(0);
    });

    it('should have the split back button if backButtonIcon and mainNavigationItem options are not empty', () => {
      const navItemInSplitBackButton = <NavigationItem text="Go back" />;
      const component = mountWithRootTheme(
        <ContainerNavigationNested
          backButtonIcon={<ArrowLeftIcon label="Left icon" />}
          mainNavigationItem={navItemInSplitBackButton}
        >
          <h1>Content</h1>
        </ContainerNavigationNested>
      );
      expect(component.find('ArrowLeftIcon').at(0).text()).to.equal('Left icon');
      expect(component.find('NavigationItem').at(0).text()).to.equal('Go back');
    });
  });

  describe('props', () => {
    it('should call onAnimationEnd if specified', () => {
      const initPane = <h1>Previous Pane</h1>;
      const animationEventSpy = sinon.spy();
      const component = mount(<ContainerNavigationNested onAnimationEnd={animationEventSpy}>
        {initPane}
      </ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({ children: newPane, animationDirection: 'left' });
      component.simulate('animationEnd');
      expect(animationEventSpy.calledOnce).to.equal(true);
    });
  });
});
