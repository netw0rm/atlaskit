import { mount } from 'enzyme';
import React from 'react';
import Resizer from '../src/components/js/Resizer';
import { navigationOpenWidth } from '../src/shared-variables';

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

      resizer = mount(<Resizer
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

  describe('resizer button', () => {
    it('by default, <ResizerButton /> points left', () => {
      expect(mount(<Resizer />).find('ResizerButton').props().isPointingRight).equal(false);
    });
    it('when navigationWidth=0, <ResizerButton /> points right', () => {
      expect(mount(<Resizer navigationWidth={0} />).find('ResizerButton').props().isPointingRight).equal(true);
    });
    it(`when navigationWidth=${navigationOpenWidth - 1}, <ResizerButton /> points right`, () => {
      expect(mount(<Resizer navigationWidth={navigationOpenWidth - 1} />).find('ResizerButton').props().isPointingRight).equal(true);
    });
    it(`when navigationWidth=${navigationOpenWidth}, <ResizerButton /> points left`, () => {
      expect(mount(<Resizer navigationWidth={navigationOpenWidth} />).find('ResizerButton').props().isPointingRight).equal(false);
    });
    it(`when navigationWidth=${navigationOpenWidth + 100}, <ResizerButton /> points left`, () => {
      expect(mount(<Resizer navigationWidth={navigationOpenWidth + 100} />).find('ResizerButton').props().isPointingRight).equal(false);
    });
    it(`when navigationWidth=${navigationOpenWidth - 1}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      mount(<Resizer
        navigationWidth={navigationOpenWidth - 1}
        onResizeButton={(resizeState) => {
          expect(resizeState).to.deep.equal({
            isOpen: true,
            width: navigationOpenWidth,
          });
          done();
        }}
      />).find('ResizerButton').simulate('click');
    });
    it(`when navigationWidth=${navigationOpenWidth}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      mount(<Resizer
        navigationWidth={navigationOpenWidth}
        onResizeButton={(resizeState) => {
          expect(resizeState).to.deep.equal({
            isOpen: false,
          });
          done();
        }}
      />).find('ResizerButton').simulate('click');
    });
    it(`when navigationWidth=${navigationOpenWidth + 100}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      mount(<Resizer
        navigationWidth={navigationOpenWidth + 100}
        onResizeButton={(resizeState) => {
          expect(resizeState).to.deep.equal({
            isOpen: true,
            width: navigationOpenWidth,
          });
          done();
        }}
      />).find('ResizerButton').simulate('click');
    });
  });
});
