import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

import { GrantAccessBase } from '../../../src/request-or-start-trial/components/GrantAccess';
import { withAnalyticsSpy, waitFor, waitUntil } from '../../util';
import { ACTIVATING } from '../../../src/common/productProvisioningStates';

// eslint-disable-next-line global-require
jest.mock('@atlaskit/modal-dialog', () => require('../__mocks__/modal-dialog-mock'));

describe('<GrantAccess> analytics', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  const noop = () => { };

  const defaultProps = {
    productLogo: <div />,
    onComplete: noop,
    progress: 0,
    status: ACTIVATING,
    heading: '',

    defaultSelectedRadio: 'everyone',
    usersOption: 'specific-users',
    optionItems: [
      {
        value: 'everyone',
        label: 'Everyone',
      },
      {
        value: 'site-admins',
        label: 'Site admins only',
      },
      {
        value: 'specific-users',
        label: 'Specific users',
      },
    ],
    learnMoreLink: 'https://atlassian.com',
    retrieveCurrentUserIsTrusted: async () => false,
    getAtlassianAccountId: async () => 123,
  };

  it('should fire an appropriate analytics event when it is mounted', () => {
    const spy = jest.fn();
    mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.grant-access.displayed', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event if retrieving users failed', () => {
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

  it('should fire an appropriate analytics event when the continue button is clicked', async () => {
    const spy = jest.fn();
    const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.clicked',
      expect.any(Object)
    );

    const continueButton = mountWrapper.find('#xflow-grant-access-continue-button');
    await waitUntil(() => continueButton.not('[disabled]'));
    // Trying to get continueButton.prop(...) doesn't work.
    // So, we find the component again after it has enabled because
    // enzyme loses the original component after prop changes cause rerender.
    mountWrapper.find('#xflow-grant-access-continue-button').prop('onClick')(); // Simulate click

    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.continue-button.clicked',
        expect.any(Object)
      )
    );
  });

  it('should fire an appropriate analytics event when granting access is successful', async () => {
    const spy = jest.fn();
    let mockGrantAccessResolvedPromise;
    const mockGrantAccessResolve = jest.fn(() => {
      mockGrantAccessResolvedPromise = new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      return mockGrantAccessResolvedPromise;
    });
    const mountWrapper = mount(withAnalyticsSpy(spy,
      <GrantAccessBase
        {...defaultProps} retrieveUsers={() => Promise.resolve(
          [
            {
              userName: 'lhunt',
              displayName: 'Lachlan Hunt',
              id: 123,
              emails: [{ value: 'lhunt@example.com' }],
              attributes: {
                attributes: [
                  {
                    name: 'atlassianid.openid.identity',
                    values: ['https://id.atlassian.com/openid/v2/u/1'],
                  },
                ],
              },
            },
            {
              userName: 'awakeling',
              displayName: 'Andrew Wakeling',
              id: 234,
              emails: [{ value: 'awakeling@example.com' }],
              attributes: {
                attributes: [
                  {
                    name: 'atlassianid.openid.identity',
                    values: ['https://id.atlassian.com/openid/v2/u/2'],
                  },
                ],
              },
            },
            {
              userName: 'ahammond',
              displayName: 'Andrew Hammond',
              id: 345,
              emails: [{ value: 'ahammond@example.com' }],
              attributes: {
                attributes: [
                  {
                    name: 'atlassianid.openid.identity',
                    values: ['https://id.atlassian.com/openid/v2/u/3'],
                  },
                ],
              },
            },
            {
              userName: 'mtruong',
              displayName: 'Michael Truong',
              id: 456,
              emails: [{ value: 'mtruong@example.com' }],
              attributes: {
                attributes: [
                  {
                    name: 'atlassianid.openid.identity',
                    values: ['https://id.atlassian.com/openid/v2/u/4'],
                  },
                ],
              },
            },
            {
              userName: 'gburrows',
              displayName: 'George Burrows',
              id: 567,
              emails: [{ value: 'gburrows@example.com' }],
              attributes: {
                attributes: [
                  {
                    name: 'atlassianid.openid.identity',
                    values: ['https://id.atlassian.com/openid/v2/u/5'],
                  },
                ],
              },
            },
          ])}
        retrieveAdminIds={() =>
          Promise.resolve([123, 234])}
        grantAccessToUsers={mockGrantAccessResolve}
      />));
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.grant-access-successful',
      expect.any(Object)
    );

    const continueButton = mountWrapper.find('#xflow-grant-access-continue-button');
    await waitUntil(() => continueButton.not('[disabled]'));
    mountWrapper.find('#xflow-grant-access-continue-button').prop('onClick')();
    // Ensure that the grant access promise has resolved
    // before checking for consequential events
    await mockGrantAccessResolvedPromise;
    return waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.continue-button.grant-access-successful',
        expect.objectContaining({
          atlassianAccountIds: [
            'https://id.atlassian.com/openid/v2/u/1',
            'https://id.atlassian.com/openid/v2/u/2',
            'https://id.atlassian.com/openid/v2/u/3',
            'https://id.atlassian.com/openid/v2/u/4',
            'https://id.atlassian.com/openid/v2/u/5',
          ].join(','),
        })
      );
    });
  });

  it('should fire an appropriate analytics event if granting access failed and using the skip button', async () => {
    const spy = jest.fn();
    let mockGrantAccessRejectionPromise;
    const mockGrantAccessRejection = jest.fn(() => {
      mockGrantAccessRejectionPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Failed to Grant Access to Users')), 500);
      });
      return mockGrantAccessRejectionPromise;
    });
    const mountWrapper = mount(
      withAnalyticsSpy(
        spy,
        <GrantAccessBase
          {...defaultProps}
          grantAccessToUsers={mockGrantAccessRejection}
        />
      )
    );
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.continue-button.failed-to-grant-access',
      expect.any(Object)
    );

    const continueButton = mountWrapper.find('#xflow-grant-access-continue-button');
    await waitUntil(() => continueButton.not('[disabled]'));
    mountWrapper.find('#xflow-grant-access-continue-button').prop('onClick')();
    try {
      await mockGrantAccessRejectionPromise;
    } catch (e) {
      // expected
    }
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.continue-button.failed-to-grant-access',
        expect.any(Object)
      );
    });

    mountWrapper.find('#xflow-grant-access-skip-button').simulate('click');

    expect(spy).toHaveBeenCalledWith('xflow.grant-access.skip-button.clicked', expect.any(Object));
  });

  it('should fire an appropriate analytics event when the learn more button is clicked', () => {
    const spy = jest.fn();
    const mountWrapper = mount(
      withAnalyticsSpy(
        spy,
        <GrantAccessBase {...defaultProps} changeUsers learnMoreLink="//atlassian.com" />
      )
    );
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.learn-more-button.clicked',
      expect.any(Object)
    );
    mountWrapper.find('#xflow-grant-access-learn-more-span').prop('onMouseDown')({ button: 1 });
    return waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.learn-more-button.clicked',
        expect.any(Object)
      );
    });
  });

  it('should fire an appropriate analytics event when the manage button is clicked', async () => {
    const spy = jest.fn();
    const mountWrapper = mount(withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} />));
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.manage-button.clicked',
      expect.any(Object)
    );

    const manageButton = mountWrapper.find('#xflow-grant-access-manage-button');
    await waitFor(() => manageButton.not('[disabled]'));
    mountWrapper.find('#xflow-grant-access-manage-button').prop('onClick')();

    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.manage-button.clicked',
        expect.any(Object)
      )
    );
  });

  it('should fire an appropriate analytics event when the radio option is changed', () => {
    const spy = jest.fn();
    const mountWrapper = mount(
      withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} changeUsers />)
    );
    const mockResponse = { target: 'site-admins' };
    const onRadioChange = mountWrapper.find(AkFieldRadioGroup).prop('onRadioChange');

    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.radio-option.changed',
      expect.any(Object)
    );
    onRadioChange(mockResponse);
    return waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        'xflow.grant-access.radio-option.changed',
        expect.any(Object)
      );
    });
  });

  it('should fire an appropriate analytics event when the user select is opened', () => {
    const spy = jest.fn();
    const mountWrapper = mount(
      withAnalyticsSpy(spy, <GrantAccessBase {...defaultProps} changeUsers />)
    );
    const mockResponse = { isOpen: true };
    const onOpenChange = mountWrapper.find('MultiSelect').prop('onOpenChange');
    expect(spy).not.toHaveBeenCalledWith(
      'xflow.grant-access.user-select.opened',
      expect.any(Object)
    );
    onOpenChange(mockResponse);
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.grant-access.user-select.opened', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event when the user select is changed', () => {
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

  it('should fire an appropriate analytics event when the user select is invalid', () => {
    const userOptionId = 'specific-users';
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

  it('should fire an appropriate analytics event when the notify users checkbox is changed', () => {
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
});
