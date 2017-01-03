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
    it('should render the right number of pages', () => {
      expect(mount(
        <ContainerNavigationNested
          pages={[
            <div className="page">A</div>,
            <div className="page">B</div>,
            <div className="page">C</div>,
          ]}
        />).find('.page')).to.have.length(3);
    });
  });

  describe('props', () => {
    it('by default the selectedIndex is 0', () => {
      expect(mount(<ContainerNavigationNested />).props().selectedIndex).to.equal(0);
    });
  });

  describe('styles', () => {
    describe('transform', () => {
      function getTransformForSelectedIndex(selectedIndex) {
        return mount(
          <ContainerNavigationNested pages={['A', 'B', 'C']} selectedIndex={selectedIndex} />
        ).find(`.${styles.containerNavigationNested}`).props().style.transform;
      }
      it('the selectedIndex updates the translateX of the wrapper', () => {
        expect(getTransformForSelectedIndex(1)).to.not.equal(getTransformForSelectedIndex(0));
      });
      it('when selectedIndex is < 0, the translateX is bound by 0', () => {
        expect(getTransformForSelectedIndex(-1)).to.equal(getTransformForSelectedIndex(0));
      });
      it('when selectedIndex is > pages.length, the translateX is bound by pages.length', () => {
        expect(getTransformForSelectedIndex(3)).to.equal(getTransformForSelectedIndex(2));
      });
    });
  });
});
