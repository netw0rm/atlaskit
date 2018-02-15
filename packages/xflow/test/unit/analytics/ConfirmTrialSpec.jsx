import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import { ConfirmTrialBase } from '../../../src/request-or-start-trial/components/ConfirmTrial';
import { withAnalyticsSpy, waitFor } from '../../util';

import { INACTIVE } from '../../../src/common/productProvisioningStates';

// eslint-disable-next-line global-require
jest.mock('@atlaskit/modal-dialog', () => require('../__mocks__/modal-dialog-mock'));

describe('<ConfirmTrial> analytics', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

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

  it('should fire an appropriate analytics event when it is mounted', () => {
    const spy = jest.fn();
    mount(withAnalyticsSpy(spy, <ConfirmTrialBase {...defaultProps} />));
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.confirm-trial.displayed', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event when the confirm button is clicked', () => {
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

  it('should fire an appropriate analytics event when the cancel button is clicked', () => {
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
});
