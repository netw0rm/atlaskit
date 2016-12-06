import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';
import {
  containerClosedWidth,
} from '../src/shared-variables';


chai.use(chaiEnzyme());

describe('<Navigation />', () => {
  describe('children', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('ContainerNavigation');
    });
    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('GlobalNavigation');
    });
    it('should not render a <GlobalNavigation /> if the "globalNavigation" prop is provided', () => {
      const mockNavigation = <div id="mock-navigation">test</div>;
      expect(shallow(<Navigation globalNavigation={mockNavigation} />)).to.not.have.descendants('GlobalNavigation');
    });
    it('should render the provided "globalNavigation"', () => {
      const mockNavigation = <div id="mock-navigation">test</div>;
      expect(shallow(<Navigation globalNavigation={mockNavigation} />)).to.have.descendants('#mock-navigation');
    });
    it('should render a <Resizer />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('Resizer');
    });
    it('should render two <Drawer />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(2).descendants('Drawer');
    });
  });

  describe('props', () => {
    it('width prop is reflected on <Spacer />', () => {
      expect(shallow(<Navigation width={500} />).find('Spacer').props().width).to.equal(500);
      expect(shallow(<Navigation width={200} />).find('Spacer').props().width).to.equal(200);
    });
    it('open=false overrides width prop on <Spacer />', () => {
      expect(shallow(<Navigation open={false} width={500} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
      expect(shallow(<Navigation open={false} width={200} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
    });
    it('isResizeable=false does not render a <Resizer />', () => {
      expect(shallow(<Navigation isResizeable={false} />))
      .to.not.have.descendants('Resizer');
    });
    it('can pass in an element for the container header', () => {
      const header = <div>foo</div>;
      expect(shallow(<Navigation containerHeader={header} />)
        .find('ContainerNavigation').props().header).to.equal(header);
    });
    describe('globalPrimaryIcon', () => {
      it('should insert primary icon into navigation', () => {
        expect(mount(<Navigation globalPrimaryIcon={<span className="PRIMARY_ICON" />} />)).to.have.exactly(1).descendants('.PRIMARY_ICON');
      });
    });
    describe('globalSearchIcon', () => {
      it('should insert search icon into navigation', () => {
        expect(mount(<Navigation globalSearchIcon={<span className="SEARCH_ICON" />} />)).to.have.exactly(1).descendants('.SEARCH_ICON');
      });
    });
    describe('globalCreateIcon', () => {
      it('should insert create icon into navigation', () => {
        expect(mount(<Navigation globalCreateIcon={<span className="CREATE_ICON" />} />)).to.have.exactly(1).descendants('.CREATE_ICON');
      });
    });

    describe('interaction', () => {
      it('resize changes internal resize state', () => {
        const navigation = shallow(<Navigation />);
        navigation.find('Resizer').simulate('resize', 50);
        expect(navigation.state().resizeDelta).to.equal(50);
      });
    });
  });
});
