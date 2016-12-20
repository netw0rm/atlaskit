import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import Drawer from '../src/components/js/Drawer';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('<Drawer />', () => {
  describe('props', () => {
    it('should have an isOpen prop that defaults to `false`', () => {
      expect(mount(<Drawer />).props().isOpen).to.equal(false);
    });
    it('should have an isWide prop that defaults to `false`', () => {
      expect(mount(<Drawer />).props().isWide).to.equal(false);
    });
  });
});

