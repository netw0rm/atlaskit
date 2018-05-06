import React from 'react';
import { mount } from 'enzyme';

import ProgressBar, { toPercentage } from '../../../../src/common/components/ProgressBar';
import ProgressBarBackground from '../../../../src/common/styled/ProgressBarBackground';
import ProgressBarValue from '../../../../src/common/styled/ProgressBarValue';

describe('<ProgressBar> Component', () => {
  let mockProps = null;

  beforeEach(() => {
    mockProps = {
      progress: 0.25,
      indeterminate: false,
      onComplete: jest.fn(),
    };
  });

  describe('toPercentage', () => {
    it('should return a percentage string to 1 decimal place for a range of progresses', () => {
      expect(toPercentage(0)).toBe('0.0%');
      expect(toPercentage(1)).toBe('100.0%');
      expect(toPercentage(0.5)).toBe('50.0%');
      expect(toPercentage(0.25)).toBe('25.0%');
      expect(toPercentage(0.125)).toBe('12.5%');
      expect(toPercentage(0.1312)).toBe('13.1%');
      expect(toPercentage(0.5666)).toBe('56.7%');
    });
  });

  describe('render', () => {
    it('should show a progress bar background', () => {
      const wrapper = mount(<ProgressBar {...mockProps} />);

      expect(wrapper.find(ProgressBarBackground).exists()).toBeTruthy();
    });

    it('should show a progress bar', () => {
      const wrapper = mount(<ProgressBar {...mockProps} />);

      const progressBar = wrapper.find(ProgressBarValue);
      expect(progressBar.exists()).toBeTruthy();
      expect(progressBar.props().style.width).toBe('25.0%');
    });

    it('should call on complete when the transition has ended on the progress bar' +
      'after completing progress', () => {
      const wrapper = mount(<ProgressBar {...mockProps} />);

      const progressBar = wrapper.find(ProgressBarValue);
      expect(progressBar.exists()).toBeTruthy();

      progressBar.props().onTransitionEnd();

      expect(mockProps.onComplete).not.toHaveBeenCalled();

      wrapper.setProps({ progress: 1 });

      progressBar.props().onTransitionEnd();

      expect(mockProps.onComplete).toHaveBeenCalled();
    });

    it('should have a component with aria-live=polite, for accessibility', () => {
      const wrapper = mount(<ProgressBar {...mockProps} />);

      const ariaComponent = wrapper.find('span');
      expect(ariaComponent.exists()).toBeTruthy();
      expect(ariaComponent.props()['aria-live']).toBe('polite');
      expect(ariaComponent.text()).toBe('25.0%');
    });

    it('should not show progress when indeterminate is true', () => {
      const wrapper = mount(<ProgressBar {...mockProps} indeterminate />);

      expect(wrapper.find(ProgressBarValue).exists()).toBeFalsy();

      const ariaComponent = wrapper.find('span');
      expect(ariaComponent.exists()).toBeTruthy();
      expect(ariaComponent.text()).toBe('');
    });
  });
});
