import React from 'react';
import { mount } from 'enzyme';
import { waitUntil } from '@atlaskit/util-common-test';
import sinon from 'sinon';
import { akColorN0, akColorN500 } from '@atlaskit/util-shared-styles';

import Spinner from '../../src';
import Container from '../../src/styled/Container';
import Dash, { getStrokeColor } from '../../src/styled/Dash';

// TODO: It would be good if we could test the delay prop here, however, tests that rely on timing
// are notoriously flakey.

// we use this to know when the spinner is visible (because it has a time out
// before showing now)
const spinnerIsVisible = elem => (elem.state('spinnerHiddenForDelay') === false);

describe('Spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper).not.toBe(undefined);
  });

  it('should be active by default', () => {
    const wrapper = mount(<Spinner />);

    // active is equivalent to Prop `!isCompleting`
    expect(wrapper.prop('isCompleting')).toBe(false);
  });

  it('should not use the inverted color scheme by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.prop('invertColor')).toBe(false);
    expect(wrapper.find(Dash).prop('invertColor')).toBe(false);
  });

  it('should be hidden by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.find(Container).prop('hidden')).toBe(true);
  });

  it('should remove the hidden state after some time', () => {
    const wrapper = mount(<Spinner />);

    return waitUntil(() => spinnerIsVisible(wrapper)).then(() =>
      expect(expect(wrapper.find(Container).prop('hidden')).toBe(false))
    );
  });

  describe('isCompleting prop', () => {
    it('should remove the active prop from Container when set to true', () => {
      const wrapper = mount(<Spinner isCompleting />);
      expect(wrapper.find(Container).prop('active')).toBe(false);
    });
    it('should remove the active prop from Dash when set to true', () => {
      const wrapper = mount(<Spinner isCompleting />);
      expect(wrapper.find(Dash).prop('active')).toBe(false);
    });
  });

  describe('onComplete prop', () => {
    it('should be called after isCompleting is set', () => {
      /*
        Unfortunately this is not testable properly in jsdom as no transitionEnd
        event will ever get fired. The best we can do manually fire the event
        and check that function gets called
      */
      const spy = sinon.spy();

      // we render without the isCompleting set first to get past the delay
      const wrapper = mount(<Spinner onComplete={spy} />);

      return waitUntil(() => spinnerIsVisible(wrapper)).then(() => {
        wrapper.setProps({ isCompleting: true });
        wrapper.find(Container)
          .simulate('transitionEnd', { propertyName: 'stroke-dashoffset' });

        expect(spy.callCount).toBe(1);
      });
    });

    it('should not be called if isCompleting is not set', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Spinner onComplete={spy} />);

      return waitUntil(() => spinnerIsVisible(wrapper)).then(() => {
        wrapper.find(Container)
          .simulate('transitionEnd', { propertyName: 'stroke-dashoffset' });

        expect(spy.callCount).not.toBe(1);
      });
    });
  });

  describe('size prop', () => {
    it('should render tee-shirt sizes with the proper heights/widths', () => {
      const small = mount(<Spinner size="small" />);
      const medium = mount(<Spinner size="medium" />);
      const large = mount(<Spinner size="large" />);
      const xlarge = mount(<Spinner size="xlarge" />);

      expect(small.find(Container).prop('style').height).toBe(20);
      expect(small.find(Container).prop('style').width).toBe(20);

      expect(medium.find(Container).prop('style').height).toBe(30);
      expect(medium.find(Container).prop('style').width).toBe(30);

      expect(large.find(Container).prop('style').height).toBe(50);
      expect(large.find(Container).prop('style').height).toBe(50);

      expect(xlarge.find(Container).prop('style').width).toBe(100);
      expect(xlarge.find(Container).prop('style').width).toBe(100);
    });

    it('should render the spinner with a custom size', () => {
      const custom = mount(<Spinner size={72} />);

      expect(custom.find(Container).prop('style').height).toBe(72);
      expect(custom.find(Container).prop('style').width).toBe(72);
    });

    it('should render the spinner with the default size if an unsupported value is provided', () => {
      const custom = mount(<Spinner size={{ something: 'weird' }} />);

      expect(custom.find(Container).prop('style').height).toBe(20);
      expect(custom.find(Container).prop('style').width).toBe(20);
    });
  });

  describe('invertColor prop', () => {
    it('should set the invertColor prop on Dash when set to true', () => {
      const wrapper = mount(<Spinner invertColor />);
      expect(wrapper.find(Dash).prop('invertColor')).toBe(true);
    });

    it('should be akColorN500 by default', () => {
      expect(getStrokeColor({})).toBe(akColorN500);
      expect(getStrokeColor({ invertColor: false })).toBe(akColorN500);
    });

    it('should be akColorN0 when set to true', () => {
      expect(getStrokeColor({ invertColor: true })).toBe(akColorN0);
    });
  });

  describe('svg', () => {
    let circle;

    beforeEach(() => {
      circle = mount(<Spinner />).find('circle');
    });

    it('should have expected svg stroke keys', () => {
      const styleKeys = Object.keys(circle.prop('style'));

      expect(styleKeys.indexOf('strokeDashoffset') >= 0).toBe(true);
      expect(styleKeys.indexOf('strokeDasharray') >= 0).toBe(true);
    });

    it('should have strokeDashoffset in px with no space before', () => {
      expect(circle.prop('style').strokeDashoffset.match(/[0-9]px/)).not.toBe(null);
    });
  });
});
