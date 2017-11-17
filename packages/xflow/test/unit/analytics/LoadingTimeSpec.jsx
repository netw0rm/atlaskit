import React from 'react';
import { mount } from 'enzyme';
import { LoadingTimeBase } from '../../../src/request-or-start-trial/components/LoadingTime';
import { withAnalyticsSpy, waitFor } from '../../util';
import { ACTIVATING, ACTIVE } from '../../../src/common/productProvisioningStates';

describe('<LoadingTime> analytics', () => {
  const noop = () => {
  };

  const defaultProps = {
    productLogo: <div />,
    onComplete: noop,
    goToProduct: noop,
    progress: 0,
    status: ACTIVATING,
    heading: '',
  };

  it('should fire an appropriate analytics event when it is mounted', () => {
    const spy = jest.fn();
    mount(withAnalyticsSpy(spy, <LoadingTimeBase {...defaultProps} />));
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.loading-product-trial.displayed', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event when loading timed out', () => {
    const spy = jest.fn();
    mount(withAnalyticsSpy(spy, <LoadingTimeBase {...defaultProps} progress={100} />));
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.loading-product-trial.timed.out', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event when loading finished', () => {
    const spy = jest.fn();
    mount(
      withAnalyticsSpy(spy, <LoadingTimeBase {...defaultProps} progress={100} status={ACTIVE} />)
    );
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        'xflow.loading-product-trial.loading.finished',
        expect.any(Object)
      )
    );
  });

  it('should fire an appropriate analytics event the close button is clicked', () => {
    const spy = jest.fn();
    const mountWrapper = mount(withAnalyticsSpy(spy, <LoadingTimeBase {...defaultProps} />));
    mountWrapper.find('#xflow-loading-close-button').simulate('click');
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith('xflow.loading-product-trial.close', expect.any(Object))
    );
  });

  it('should fire an appropriate analytics event the go to product button is clicked', () => {
    const spy = jest.fn();
    const mountWrapper = mount(
      withAnalyticsSpy(spy, <LoadingTimeBase {...defaultProps} progress={100} status={ACTIVE} />)
    );
    mountWrapper.find('#xflow-loading-go-to-product-button').simulate('click');
    return waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        'xflow.loading-product-trial.go.to.product',
        expect.any(Object)
      )
    );
  });
});
