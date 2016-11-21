import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import GlobalNavigation from '../src/components/js/GlobalNavigation';
import Resizer from '../src/components/js/Resizer';
import Spacer from '../src/components/js/Spacer';
import Drawer from '../src/components/js/Drawer';
import {
  containerClosedWidth,
} from '../src/shared-variables';


chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('<Navigation />', () => {
  describe('children', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation />).find(ContainerNavigation)).to.have.length(1);
    });
    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation />).find(GlobalNavigation)).to.have.length(1);
    });
    it('should render a <Resizer />', () => {
      expect(shallow(<Navigation />).find(Resizer)).to.have.length(1);
    });
    it('should render two <Drawer />', () => {
      expect(shallow(<Navigation />).find(Drawer)).to.have.length(2);
    });
  });

  describe('props', () => {
    it('width prop is reflected on <Spacer />', () => {
      expect(shallow(<Navigation width={500} />).find(Spacer).props().width).to.equal(500);
      expect(shallow(<Navigation width={200} />).find(Spacer).props().width).to.equal(200);
    });
    it('open=false overrides width prop on <Spacer />', () => {
      expect(shallow(<Navigation open={false} width={500} />)
        .find(Spacer).props().width).to.equal(containerClosedWidth);
      expect(shallow(<Navigation open={false} width={200} />)
        .find(Spacer).props().width).to.equal(containerClosedWidth);
    });
    it('can pass in an element for the container header', () => {
      const header = <div>foo</div>;
      expect(shallow(<Navigation containerHeader={header} />)
        .find(ContainerNavigation).props().header).to.equal(header);
    });
  });
});
