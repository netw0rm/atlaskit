import React from 'react';
import { shallow, mount } from 'enzyme';
import HeightDetector from '../../src/components/js/HeightDetector';

describe('<HeightDetector />', () => {
  it('should not render ResizeAware by default', () => {
    const wrapper = shallow(<HeightDetector />);
    expect(wrapper.find('ResizeAware').length).toBe(0);
  });
  it('should render ResizeAware if shouldDetectResize prop is true', () => {
    const wrapper = shallow(<HeightDetector shouldDetectResize />);
    expect(wrapper.find('HeightDetectorResizeAware').length).toBe(1);
  });
  it('should measure height on initial mount', () => {
    const spy = jest.fn();
    mount(
      <HeightDetector shouldMeasureImmediately onHeightChange={spy} />
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should only fire onHeightChange when value changes', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <HeightDetector shouldMeasureImmediately onHeightChange={spy} />
    );

    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.instance().heightChanged(100);
    expect(spy).toHaveBeenCalledTimes(2);
    wrapper.instance().heightChanged(100);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('should measure height after each render', () => {
    const wrapper = mount(
      <HeightDetector shouldMeasureImmediately />
    );
    const heightChangedSpy = jest.spyOn(wrapper.instance(), 'heightChanged');

    wrapper.update();
    expect(heightChangedSpy).toHaveBeenCalledTimes(1);

    wrapper.update();
    expect(heightChangedSpy).toHaveBeenCalledTimes(2);

    heightChangedSpy.mockRestore();
  });

  // Our test environment doesn't seem to have support for detecting clientHeight of
  // DOM elements, so the best we can do is to ensure the onHeightChange prop is hooked
  // up to the ResizeAware component correctly.
  it('should measure height when ResizeAware component detects resize', () => {
    const wrapper = shallow(<HeightDetector shouldDetectResize />);
    expect(
      wrapper.find('HeightDetectorResizeAware').prop('onResize')
    ).toBe(wrapper.instance().triggerMeasureHeight);
  });
});
