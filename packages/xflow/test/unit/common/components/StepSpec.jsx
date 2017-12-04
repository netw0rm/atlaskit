import React from 'react';
import { shallow } from 'enzyme';

import Step from '../../../../src/common/components/multi-step/Step';

describe('<Step> Component', () => {
  let mockElement = null;
  let mockRender = null;
  let mockContext = null;
  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    mockElement = <div />;
    mockRender = jest.fn(() => mockElement);
    mockContext = {
      nextStep: jest.fn(),
      cancel: jest.fn(),
    };

    wrapper = shallow(<Step render={mockRender} />, { context: mockContext });
    instance = wrapper.instance();
  });

  describe('render', () => {
    it('should call the render props callback when rendering', () => {
      expect(wrapper.contains(mockElement)).toBeTruthy();
      expect(mockRender).toBeCalledWith(instance.nextStep, instance.cancel);
    });
  });

  describe('nextStep', () => {
    it('should invoke context\'s nextStep when called', () => {
      instance.nextStep();
      expect(mockContext.nextStep).toBeCalledWith(1);

      instance.nextStep(20);
      expect(mockContext.nextStep).toBeCalledWith(20);
    });
  });

  describe('cancel', () => {
    it('should invoke context\'s cancel when called', () => {
      instance.cancel();
      expect(mockContext.cancel).toBeCalled();
    });
  });
});
