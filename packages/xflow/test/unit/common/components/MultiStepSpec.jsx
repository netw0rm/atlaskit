import React from 'react';
import { mount } from 'enzyme';

import MultiStep from '../../../../src/common/components/multi-step/MultiStep';
import Step from '../../../../src/common/components/multi-step/Step';

describe('<MultiStep> Component', () => {
  let firstStepElement = null;
  let secondStepElement = null;
  let thirdStepElement = null;
  let wrapper = null;
  let instance = null;
  let mockOnComplete = null;

  beforeEach(() => {
    firstStepElement = <div id={'first'} />;
    secondStepElement = <div id={'second'} />;
    thirdStepElement = <div id={'third'} />;

    mockOnComplete = jest.fn();

    wrapper = mount(
      <MultiStep onComplete={mockOnComplete}>
        <Step render={() => firstStepElement} />
        <Step render={() => secondStepElement} />
        <Step render={() => thirdStepElement} />
      </MultiStep>
    );

    instance = wrapper.instance();
  });

  describe('render', () => {
    it('should render the <Step> related to the current state', () => {
      expect(wrapper.contains(firstStepElement)).toBeTruthy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      wrapper.setState({ step: 1 });
      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeTruthy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      wrapper.setState({ step: 2 });
      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeTruthy();

      wrapper.setState({ step: 0 });
      expect(wrapper.contains(firstStepElement)).toBeTruthy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();
    });
  });

  describe('cancel', () => {
    it('should render as null when canceled', () => {
      expect(wrapper.contains(firstStepElement)).toBeTruthy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      instance.cancel();

      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      expect(mockOnComplete).toBeCalledWith(-1);
    });
  });

  describe('nextStep', () => {
    it('should render the next step after calling nextStep', () => {
      expect(wrapper.contains(firstStepElement)).toBeTruthy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      instance.nextStep();

      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeTruthy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      instance.nextStep();

      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeTruthy();

      instance.nextStep();

      expect(wrapper.contains(firstStepElement)).toBeFalsy();
      expect(wrapper.contains(secondStepElement)).toBeFalsy();
      expect(wrapper.contains(thirdStepElement)).toBeFalsy();

      expect(mockOnComplete).toBeCalledWith(3);
    });
  });
});
