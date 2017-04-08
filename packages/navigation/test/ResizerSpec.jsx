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

    afterEach(() => {
      resizer.unmount();
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
      const wrapper = mount(<Resizer />);
      expect(wrapper.find('ResizerButton').props().isPointingRight).equal(false);
      wrapper.unmount();
    });
    it('when navigationWidth=0, <ResizerButton /> points right', () => {
      const wrapper = mount(<Resizer navigationWidth={0} />);
      expect(wrapper.find('ResizerButton').props().isPointingRight).equal(true);
      wrapper.unmount();
    });
    it(`when navigationWidth=${navigationOpenWidth - 1}, <ResizerButton /> points right`, () => {
      const wrapper = mount(<Resizer navigationWidth={navigationOpenWidth - 1} />);
      expect(wrapper.find('ResizerButton').props().isPointingRight).equal(true);
      wrapper.unmount();
    });
    it(`when navigationWidth=${navigationOpenWidth}, <ResizerButton /> points left`, () => {
      const wrapper = mount(<Resizer navigationWidth={navigationOpenWidth} />);
      expect(wrapper.find('ResizerButton').props().isPointingRight).equal(false);
      wrapper.unmount();
    });
    it(`when navigationWidth=${navigationOpenWidth + 100}, <ResizerButton /> points left`, () => {
      const wrapper = mount(<Resizer navigationWidth={navigationOpenWidth + 100} />);
      expect(wrapper.find('ResizerButton').props().isPointingRight).equal(false);
      wrapper.unmount();
    });
    it(`when navigationWidth=${navigationOpenWidth - 1}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      const wrapper = mount(
        <Resizer
          navigationWidth={navigationOpenWidth - 1}
          onResizeButton={(resizeState) => {
            expect(resizeState).to.deep.equal({
              isOpen: true,
              width: navigationOpenWidth,
            });
            wrapper.unmount();
            done();
          }}
        />
      );
      wrapper.find('ResizerButton').simulate('click');
    });
    it(`when navigationWidth=${navigationOpenWidth}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      const wrapper = mount(
        <Resizer
          navigationWidth={navigationOpenWidth}
          onResizeButton={(resizeState) => {
            expect(resizeState).to.deep.equal({
              isOpen: false,
            });
            wrapper.unmount();
            done();
          }}
        />
      );
      wrapper.find('ResizerButton').simulate('click');
    });
    it(`when navigationWidth=${navigationOpenWidth + 100}, clicking <ResizerButton /> triggers an expand to the open width`, (done) => {
      const wrapper = mount(
        <Resizer
          navigationWidth={navigationOpenWidth + 100}
          onResizeButton={(resizeState) => {
            expect(resizeState).to.deep.equal({
              isOpen: true,
              width: navigationOpenWidth,
            });
            wrapper.unmount();
            done();
          }}
        />
      );
      wrapper.find('ResizerButton').simulate('click');
    });
  });
});
