import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import Resizer from '../src/components/js/Resizer';


chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('<Resizer />', () => {
  describe('interacting', () => {
    let resizer;
    let resizeStartSpy;
    let resizeSpy;
    let resizeEndSpy;
    beforeEach(() => {
      resizeStartSpy = sinon.spy();
      resizeSpy = sinon.spy();
      resizeEndSpy = sinon.spy();

      resizer = shallow(<Resizer
        onResizeStart={resizeStartSpy}
        onResize={resizeSpy}
        onResizeEnd={resizeEndSpy}
      />);
    });
    it('mousedown default is prevented', () => {
      const preventDefaultSpy = sinon.spy();
      resizer.find('div').simulate('mousedown', { screenX: 100, preventDefault: preventDefaultSpy });
      expect(preventDefaultSpy.called).to.equal(true);
    });
    it('mousedown triggers onResizeStart', () => {
      resizer.find('div').simulate('mousedown', { screenX: 100, preventDefault: () => {} });
      expect(resizeStartSpy.called).to.equal(true);
      expect(resizeSpy.called).to.equal(false);
      expect(resizeEndSpy.called).to.equal(false);
    });

    // TODO: onResize and onResizeEnd won't play nice with document event listeners
  });
});
