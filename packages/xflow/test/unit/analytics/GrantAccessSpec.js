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
  defaultSelectedRadio: 'everyone',
  optionItems: [
    {
      value: 'everyone',
      label: 'Everyone in JIRA Software',
    },
    {
      value: 'siteAdmins',
      label: 'Site admins only',
    },
    {
      value: 'specificUsers',
      label: 'Specific users',
    },
  ],
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
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.continue-button.clicked',
    expect.any(Object)
  );
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
        grantAccessToUsers={() => new Promise((_, reject) => setTimeout(reject, 500))}
      />
    )
  );
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.continue-button.failed-to-grant-access',
    expect.any(Object)
  );
  mountWrapper.find('#xflow-grant-access-continue-button').simulate('click');
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.skip-button.clicked',
    expect.any(Object)
  );
  return waitFor(() => {
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.failed-to-grant-access',
      expect.any(Object)
    );
    mountWrapper.find('#xflow-grant-access-skip-button').simulate('click');
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.skip-button.clicked', expect.any(Object));
  });
});

test('GrantAccess should fire an appropriate analytics event when the learn more button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(
    withAnalyticsSpy(
      spy,
      <GrantAccessBase {...defaultProps} changeUsers goToLearnMore={() => {}} />
    )
  );
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.learn-more-button.clicked',
    expect.any(Object)
  );
  mountWrapper.find('#xflow-grant-access-learn-more-button').simulate('click');
  return waitFor(() => {
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.learn-more-button.clicked',
      expect.any(Object)
    );
  });
});

test('GrantAccess should fire an appropriate analytics event when the change button is clicked', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.change-button.clicked',
    expect.any(Object)
  );
  mountWrapper.find('#xflow-grant-access-change-button').simulate('click');
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.change-button.clicked', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the radio option is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(
    withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} changeUsers />)
  );
  const mockResponse = { target: 'siteAdmins' };
  const onRadioChange = mountWrapper.find('FieldRadioGroup').prop('onRadioChange');
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.radio-option.changed',
    expect.any(Object)
  );
  onRadioChange(mockResponse);
  return waitFor(() => {
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.radio-option.changed', expect.any(Object));
  });
});

test('GrantAccess should fire an appropriate analytics event when the user select is opened', () => {
  const spy = jest.fn();
  const mountWrapper = mount(
    withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} changeUsers />)
  );
  const mockResponse = { isOpen: true };
  const onOpenChange = mountWrapper.find('MultiSelect').prop('onOpenChange');
  expect(spy).not.toHaveBeenCalledWith('xflow.grant-access.user-select.opened', expect.any(Object));
  onOpenChange(mockResponse);
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.user-select.opened', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the user select is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(
    withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} changeUsers />)
  );
  const mockResponse = { items: [] };
  const onSelectedChange = mountWrapper.find('MultiSelect').prop('onSelectedChange');
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.user-select.changed',
    expect.any(Object)
  );
  onSelectedChange(mockResponse);
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.user-select.changed', expect.any(Object))
  );
});

test('GrantAccess should fire an appropriate analytics event when the user select is invalid', () => {
  const userOptionId = 'specificUsers';
  const spy = jest.fn();
  const mountWrapper = mount(
    withAnalyticsSpy(
      spy,
      <GrantAccessBase
        {...defaultProps}
        changeUsers
        defaultSelectedRadio={userOptionId}
        userSelectIsInvalid
        usersOption={userOptionId}
      />
    )
  );
  const mockResponse = { selectedRadio: userOptionId, selectedUsers: [] };
  const onClick = mountWrapper.find('#xflow-grant-access-continue-button').prop('onClick');
  expect(spy).not.toHaveBeenCalledWith(
    'xflow.grant-access.continue-button.user-select.invalid',
    expect.any(Object)
  );
  onClick(mockResponse);
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.user-select.invalid',
      expect.any(Object)
    )
  );
});

test('GrantAccess should fire an appropriate analytics event when the notify users checkbox is changed', () => {
  const spy = jest.fn();
  const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
  const mockResponse = { target: { checked: false } };
  const onChange = mountWrapper.find('#xflow-grant-access-notify-users').prop('onChange');
  expect(spy).not.toHaveBeenCalledWith('xflow.grant-access.notify-users.changed');
  onChange(mockResponse);
  return waitFor(() =>
    expect(spy).toHaveBeenCalledWith('xflow.grant-access.notify-users.changed', {
      notifyUsers: false,
    })
  );
});
