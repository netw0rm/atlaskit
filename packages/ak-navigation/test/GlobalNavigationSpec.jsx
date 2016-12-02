import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import GlobalNavigation from '../src/components/js/GlobalNavigation';
import Spacer from '../src/components/js/Spacer';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<GlobalNavigation />', () => {
  describe('children', () => {
    it('should render a <Spacer />', () => {
      expect(shallow(<GlobalNavigation />).find(Spacer)).to.have.length(1);
    });
  });
  describe('props', () => {
    it('width prop is reflected directly on <Spacer />', () => {
      expect(shallow(<GlobalNavigation width={500} />).find(Spacer).props().width).to.equal(500);
      expect(shallow(<GlobalNavigation width={200} />).find(Spacer).props().width).to.equal(200);
    });
  });
});
