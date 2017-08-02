import React from 'react';
import { mount } from 'enzyme';
import { GrantAccessBase } from '../../../src/start-trial/components/GrantAccess';
import { withAnalyticsSpy, waitFor } from '../../util';
import {
  ACTIVE, //eslint-disable-line
  ACTIVATING,
  INACTIVE, //eslint-disable-line
  UNKNOWN, //eslint-disable-line
} from '../../../src/common/productProvisioningStates';

const noop = () => {};

const defaultProps = {
  productLogo: <div />,
  onComplete: noop,
  progress: 0,
  status: ACTIVATING,
  heading: '',
};

test('GrantAccess should fire an appropriate analytics event when it is mounted', () => {
  const spy = jest.fn();
  mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.displayed', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event if retrieving users failed', () => {
  const spy = jest.fn();
  mount(
    withAnalyticsSpy(
      spy,
      <GrantAccessBase
        {...defaultProps}
        retrieveUsers={() => Promise.reject(new Error('Error retrieving users.'))}
      />
    )
  );
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.retrieving.users.failed',
      expect.any(Object)
    )
  );
});

test('GrantAccess should fire an appropriate analytics event when the continue button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-continue-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.clicked',
      expect.any(Object)
    )
  );
});

test('GrantAccess should fire an appropriate analytics event if granting access failed and using the skip button', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-skip-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.clicked',
      expect.any(Object)
    )
  );
});

// test('ConfirmTrial should fire an appropriate analytics...', () => {
//   const spy = jest.fn();
//   const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
//   mountWrapper.find('#xflow-confirm-trial-cancel-button').simulate('click');
//   return waitFor(() =>
//     expect(spy).toHaveBeenCalledWith(
//       'xflow.confirm-trial.cancel-button.clicked',
//       expect.any(Object)
//     )
//   );
// });
