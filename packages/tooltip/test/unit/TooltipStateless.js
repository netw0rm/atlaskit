import React from 'react';
import { shallow, mount } from 'enzyme';
import Tip, { TooltipTarget } from '../../src/styled/Tooltip';

// Testing the dumb component
import { TooltipStateless as Tooltip } from '../../src';

describe('Tooltip', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Tooltip />);
    expect(wrapper).not.toBe(undefined);
  });

  describe('position prop', () => {
    it('should be reflected into Layers position prop when Tooltip is isVisible', () => {
      const wrapper = shallow(<Tooltip position="bottom" isVisible><div>Foo</div></Tooltip>);

      expect(wrapper.find('Layer').prop('position')).toBe('bottom center');
    });
  });

  describe('description prop', () => {
    it('should be reflected in the Layer content prop when Tooltip is isVisible', () => {
      const wrapper = shallow(<Tooltip description="Some words!" isVisible><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer.length).toBeGreaterThan(0);

      // have to wrap the prop in shallow so that we can run assertions against it.
      const layerContentProp = shallow(layer.prop('content'));
      expect(layerContentProp).not.toBe(undefined);
      expect(layerContentProp.text()).toBe('Some words!');
    });

    it('should not be reflected in the Layer content prop when Tooltip is not isVisible', () => {
      const wrapper = shallow(<Tooltip description="Some words!"><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer.length).toBeGreaterThan(0);
      expect(layer.prop('content')).toBe(null);
    });
  });

  describe('children', () => {
    const wrapper = shallow(<Tooltip><div id="shouldBeRendered">Target</div></Tooltip>);

    it('should be rendered by Tooltip', () => {
      expect(wrapper.find('#shouldBeRendered').length).toBe(1);
    });
  });

  describe('onMouseEnter callback', () => {
    it('should be called when a mouse enters', () => {
      const spy = jest.fn();
      const wrapper = shallow(<Tooltip onMouseEnter={spy} />);
      wrapper.find(TooltipTarget).simulate('mouseEnter');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not be called if the tooltip content is hovered (sanity check)', () => {
      const spy = jest.fn();
      const wrapper = mount(<Tooltip isVisible onMouseEnter={spy} description="Tooltip text" />);
      wrapper.find(Tip).simulate('mouseOver');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onMouseLeave callback', () => {
    it('should be called after the mouse leaves', () => {
      const spy = jest.fn();
      const wrapper = shallow(<Tooltip onMouseLeave={spy} />);
      wrapper.find(TooltipTarget).simulate('mouseLeave');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('provide your own target', () => {
  it('should accept a custom target', () => {
    const NewTarget = (props) => <div {...props} />;
    const spy = jest.fn();
    const wrapper = shallow(
      <Tooltip
        description="Tooltip text"
        target={NewTarget}
        onMouseEnter={spy}
      >
        <div>Foo</div>
      </Tooltip>
    );
    wrapper.find(NewTarget).simulate('mouseEnter');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
