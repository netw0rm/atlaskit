import React from 'react';
import { mount } from 'enzyme';
import { ConfirmTrialBase } from '../../../src/request-or-start-trial/components/ConfirmTrial';
import { withAnalyticsSpy, waitFor } from '../../util';

import { INACTIVE } from '../../../src/common/productProvisioningStates';

const noop = () => {};

const defaultProps = {
  productLogo: <div />,
  onComplete: noop,
  onCancel: noop,
  status: INACTIVE,
  trialHeading: '',
  trialMessage: '',
  reactivateHeading: '',
  reactivateMessage: '',
};

test('ConfirmTrial should fire an appropriate analytics event when it is mounted', () => {
  const spy = jest.fn();
  mount(withAnalyticsSpy(spy, <ConfirmTrialBase {...defaultProps} />));
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.confirm-trial.displayed', expect.any(Object))
  );
});

test('ConfirmTrial should fire an appropriate analytics event when the confirm button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <ConfirmTrialBase {...defaultProps} />));
  mountWrapper.find('#xflow-confirm-trial-confirm-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.confirm-trial.confirm-button.clicked',
      expect.any(Object)
    )
  );
});

test('ConfirmTrial should fire an appropriate analytics event when the cancel button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <ConfirmTrialBase {...defaultProps} />));
  mountWrapper.find('#xflow-confirm-trial-cancel-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.confirm-trial.cancel-button.clicked',
      expect.any(Object)
    )
  );
});
