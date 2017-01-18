import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/components/less/ContainerNavigationNested.less';
import ContainerNavigationNested from '../src/components/js/ContainerNavigationNested';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerNavigationNested />', () => {
  describe('rendering', () => {
    it('should render children', () => {
      expect(mount(<ContainerNavigationNested><h1>Content</h1></ContainerNavigationNested>).find("h1").text()).to.equal('Content');
    });
  });

  describe('state', () => {
    it('should store previous children in state', () => {
      const previousPane = <h1>Previous Pane</h1>
      const component = mount(<ContainerNavigationNested>{previousPane}</ContainerNavigationNested>);
      component.setProps({children: <h1>New Pane</h1>})
      expect(component.state().prevChildren).to.equal(previousPane);
    });
  });

  describe('render', () => {
    it('should have new pane first if animationDir is right', () => {
      const initPane = <h1>Previous Pane</h1>
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({children: newPane, animateDirection: 'right'})
      expect(component.children().at(0).contains(newPane)).to.equal(true);
      expect(component.children().at(1).contains(initPane)).to.equal(true);
    }); 

    it('should have init pane first if animationDir is left', () => {
      const initPane = <h1>Previous Pane</h1>
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({children: newPane, animateDirection: 'left'})
      expect(component.children().at(0).contains(initPane)).to.equal(true);
      expect(component.children().at(1).contains(newPane)).to.equal(true);
    }); 

    it('should have left animation class if animationDir is left', () => {
        const initPane = <h1>Previous Pane</h1>
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({children: newPane, animateDirection: 'left'})
      expect(component.find("div").first().hasClass(styles.containerNavigationNestedLeftAnimate)).to.equal(true);
    }); 

    it('should have left animation class if animationDir is right', () => {
      const initPane = <h1>Previous Pane</h1>
      const component = mount(<ContainerNavigationNested>{initPane}</ContainerNavigationNested>);
      const newPane = <h1>New Pane</h1>;
      component.setProps({children: newPane, animateDirection: 'right'});
      expect(component.find("div").first().hasClass(styles.containerNavigationNestedRightAnimate)).to.equal(true);
    });
  });
});
