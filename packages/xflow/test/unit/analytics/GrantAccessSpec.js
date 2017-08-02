import React from 'react';
import { mount } from 'enzyme';
import { GrantAccessBase } from '../../../src/start-trial/components/GrantAccess';
import { withAnalyticsSpy, waitFor } from '../../util';
import { ACTIVATING } from '../../../src/common/productProvisioningStates';

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
  const mountWrapper = mount(
    withAnalyticsSpy(
      spy,
      <GrantAccessBase
        {...defaultProps}
        grantAccessToUsers={() => new Promise((_, reject) => setTimeout(reject))}
      />
    )
  );
  mountWrapper.find('#xflow-grant-access-skip-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.skip-button.clicked', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the learn more button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-learn-more-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.learn-more-button.clicked',
      expect.any(Object)
    )
  );
});

test('GrantAccess should fire an appropriate analytics event when the change button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-change-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.change-button.clicked', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the radio option is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  // TODO: simulate a radio change
  mountWrapper.find('#xflow-specific-radio-option').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.radio-option.changed', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the user select is opened', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-user-select').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.user-select.opened', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the user select is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-user-select').simulate('click');
  // TODO: simulate choosing a new user
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.user-select.changed', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the notify users checkbox is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  mountWrapper.find('#xflow-grant-access-notify-users').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.notify-users.changed', expect.any(Object))
  );
});
