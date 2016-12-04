import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mountWithContext } from './utils';
import Navigation from '../src/components/js/Navigation';
import {
  containerClosedWidth,
} from '../src/shared-variables';


chai.use(chaiEnzyme());

describe('<Navigation />', () => {
  describe('children', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(mountWithContext(<Navigation />)).to.have.exactly(1).descendants('ContainerNavigation');
    });
    it('should render a <GlobalNavigation />', () => {
      expect(mountWithContext(<Navigation />)).to.have.exactly(1).descendants('GlobalNavigation');
    });
    it('should not render a <GlobalNavigation /> if the "globalNavigation" prop is provided', () => {
      const mockNavigation = <div id="mock-navigation">test</div>;
      expect(mountWithContext(<Navigation globalNavigation={mockNavigation} />)).to.not.have.descendants('GlobalNavigation');
    });
    it('should render the provided "globalNavigation"', () => {
      const mockNavigation = <div id="mock-navigation">test</div>;
      expect(mountWithContext(<Navigation globalNavigation={mockNavigation} />)).to.have.descendants('#mock-navigation');
    });
    it('should render a <Resizer />', () => {
      expect(mountWithContext(<Navigation />)).to.have.exactly(1).descendants('Resizer');
    });
    it('should render two <Drawer />', () => {
      expect(mountWithContext(<Navigation />)).to.have.exactly(2).descendants('Drawer');
    });
  });

  describe('props', () => {
    it('width prop is reflected on <Spacer />', () => {
      expect(mountWithContext(<Navigation width={500} />).find('Spacer').at(0).props().width).to.equal(500);
      expect(mountWithContext(<Navigation width={200} />).find('Spacer').at(0).props().width).to.equal(200);
    });
    it('open=false overrides width prop on <Spacer />', () => {
      expect(mountWithContext(<Navigation open={false} width={500} />)
        .find('Spacer').at(0).props().width).to.equal(containerClosedWidth);
      expect(mountWithContext(<Navigation open={false} width={200} />)
        .find('Spacer').at(0).props().width).to.equal(containerClosedWidth);
    });
    it('isResizeable=false does not render a <Resizer />', () => {
      expect(mountWithContext(<Navigation isResizeable={false} />))
      .to.not.have.descendants('Resizer');
    });
    it('can pass in an element for the container header', () => {
      const header = <div>foo</div>;
      expect(mountWithContext(<Navigation containerHeader={header} />)
        .find('ContainerNavigation').props().header).to.equal(header);
    });
    describe('globalPrimaryIcon', () => {
      it('should insert primary icon into navigation', () => {
        expect(mountWithContext(<Navigation globalPrimaryIcon={<span className="PRIMARY_ICON" />} />)).to.have.exactly(1).descendants('.PRIMARY_ICON');
      });
    });
    describe('globalSearchIcon', () => {
      it('should insert search icon into navigation', () => {
        expect(mountWithContext(<Navigation globalSearchIcon={<span className="SEARCH_ICON" />} />)).to.have.exactly(1).descendants('.SEARCH_ICON');
      });
    });
    describe('globalCreateIcon', () => {
      it('should insert create icon into navigation', () => {
        expect(mountWithContext(<Navigation globalCreateIcon={<span className="CREATE_ICON" />} />)).to.have.exactly(1).descendants('.CREATE_ICON');
      });
    });
  });
});
