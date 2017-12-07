import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import InitializingScreen from '../../src/common/components/InitializingScreen';
import ErrorFlag from '../../src/common/components/ErrorFlag';
import { INACTIVE, DEACTIVATED, ACTIVE, ACTIVATING } from '../../src/common/productProvisioningStates';
import { RequestOrStartTrialBase as RequestOrStartTrial, Screens } from '../../src/request-or-start-trial';
import StartTrial from '../../src/request-or-start-trial/components/StartTrial';
import ContextualStartTrial from '../../src/request-or-start-trial/components/ContextualStartTrial';
import RequestTrial from '../../src/request-or-start-trial/components/RequestTrial';
import AlreadyStarted from '../../src/request-or-start-trial/components/AlreadyStarted';

describe('<RequestOrStartTrial> Component', () => {
  let mockProps = null;
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    mockProps = {
      sourceComponent: 'source-component',
      sourceContext: 'source-context',
      targetProduct: 'target-product',
      canCurrentUserAddProduct: jest.fn(),
      getProductActivationState: jest.fn(),
      waitForActivation: jest.fn(),
      firePrivateAnalyticsEvent: jest.fn(),
      onAnalyticsEvent: jest.fn(),
      onComplete: jest.fn(),
      onTrialRequested: jest.fn(),
      onTrialActivating: jest.fn(),
      checkProductRequestFlag: jest.fn(),
      contextInfo: {
        contextualImage: 'contextual-image',
        contextualHeading: 'contextual-header',
        contextualMessage: 'contextual-message',
        reactivateCTA: 'reactivate-cta',
        trialCTA: 'trial-cta',
      },
      grantAccessEnabled: true,
    };
  });

  afterEach(() => sandbox.restore());

  describe('render - screen: INITIALIZING', () => {
    it('should show the initializing screen', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      const initScreen = wrapper.find(InitializingScreen);
      expect(initScreen.exists()).toBeTruthy();
      expect(initScreen.props().isOpen).toBeTruthy();

      const errorFlag = wrapper.find(ErrorFlag);
      expect(errorFlag.exists()).toBeTruthy();
      expect(errorFlag.props().showFlag).toBeFalsy();
    });

    it('should show an error flag when there is an initialization error', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });

      const initScreen = wrapper.find(InitializingScreen);
      expect(initScreen).toHaveLength(1);
      expect(initScreen.props().isOpen).toBeFalsy();

      const errorFlag = wrapper.find(ErrorFlag);
      expect(errorFlag.exists()).toBeTruthy();
      expect(errorFlag.props().showFlag).toBeTruthy();
      expect(errorFlag.props().flagActions).toBe(wrapper.instance().flagActions);
    });

    it('should hide initialization error when error flag is dismissed', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });

      wrapper.find(ErrorFlag).props().onDismissed();

      expect(wrapper.state('showInitializationError')).toBeFalsy();
      expect(mockProps.onComplete).toBeCalled();
    });
  });

  describe('render - screen: START_TRIAL', () => {
    it('should render start trial dialog with grant access for INACTIVE product', () => {
      mockProps.contextInfo = null;

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.START_TRIAL,
        activationState: INACTIVE,
      });

      const startTrial = wrapper.find(StartTrial);
      expect(startTrial.exists()).toBeTruthy();
      expect(startTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialActivating: mockProps.onTrialActivating,
        showGrantAccess: true,
      });
    });

    it('should render start trial dialog without grant access for DEACTIVATED product', () => {
      mockProps.contextInfo = null;

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.START_TRIAL,
        activationState: DEACTIVATED,
      });

      const startTrial = wrapper.find(StartTrial);
      expect(startTrial.exists()).toBeTruthy();
      expect(startTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialActivating: mockProps.onTrialActivating,
        showGrantAccess: false,
      });
    });

    it('should render start trial dialog without grant access for INACTIVE product when'
      + 'grantAccessEnabled is false', () => {
      mockProps.contextInfo = null;

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} grantAccessEnabled={false} />);

      wrapper.setState({
        screen: Screens.START_TRIAL,
        activationState: INACTIVE,
      });

      const startTrial = wrapper.find(StartTrial);
      expect(startTrial.exists()).toBeTruthy();
      expect(startTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialActivating: mockProps.onTrialActivating,
        showGrantAccess: false,
      });
    });

    it('should render contextual start trial when context info is provided', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.START_TRIAL,
        activationState: INACTIVE,
      });

      const startTrial = wrapper.find(ContextualStartTrial);
      expect(startTrial.exists()).toBeTruthy();
      expect(startTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialActivating: mockProps.onTrialActivating,
        showGrantAccess: true,
        contextInfo: mockProps.contextInfo,
      });
    });
  });

  describe('render - screen: ALREADY_STARTED', () => {
    it('should render the already started component', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.ALREADY_STARTED,
      });

      const alreadyStarted = wrapper.find(AlreadyStarted);
      expect(alreadyStarted.exists()).toBeTruthy();
      expect(alreadyStarted.props().onComplete).toBe(mockProps.onComplete);
    });
  });

  describe('render - screen: REQUEST_TRIAL', () => {
    it('should render the request trial component - already requested', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.REQUEST_TRIAL,
        alreadyRequested: true,
      });

      const requestTrial = wrapper.find(RequestTrial);
      expect(requestTrial.exists()).toBeTruthy();
      expect(requestTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialRequested: mockProps.onTrialRequested,
        alreadyRequested: true,
        contextInfo: mockProps.contextInfo,
      });
    });

    it('should render the request trial component - not requested', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        screen: Screens.REQUEST_TRIAL,
        alreadyRequested: false,
      });

      const requestTrial = wrapper.find(RequestTrial);
      expect(requestTrial.exists()).toBeTruthy();
      expect(requestTrial.props()).toEqual({
        onComplete: mockProps.onComplete,
        onTrialRequested: mockProps.onTrialRequested,
        alreadyRequested: false,
        contextInfo: mockProps.contextInfo,
      });
    });
  });

  describe('Lifecycle', () => {
    it('should trigger a fetch of async data on being mounted', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'fetchAsyncData');

      instance.componentDidMount();

      expect(instance.fetchAsyncData.called).toBeTruthy();
    });
  });

  describe('fetchAsyncData', () => {
    it('should fetch request trial related async data for non-admins', async () => {
      mockProps.canCurrentUserAddProduct = jest.fn(async () => false);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'fetchAsyncRequestFlowData');

      await instance.fetchAsyncData().then(() => {
        expect(mockProps.canCurrentUserAddProduct).toBeCalled();
        expect(instance.fetchAsyncRequestFlowData.called).toBeTruthy();
      });
    });

    it('should fetch start trial related async data for non-admins', async () => {
      mockProps.canCurrentUserAddProduct = jest.fn(async () => true);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'fetchAsyncStartFlowData');

      await instance.fetchAsyncData().then(() => {
        expect(mockProps.canCurrentUserAddProduct).toBeCalled();
        expect(instance.fetchAsyncStartFlowData.called).toBeTruthy();
      });
    });

    it('should handle failure of canCurrentUserAddProduct', async () => {
      const mockError = new Error('failed');
      mockProps.canCurrentUserAddProduct = jest.fn(async () => { throw mockError; });

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'onFailure');

      await instance.fetchAsyncData().catch((e) => {
        expect(e).toBe(mockError);
        expect(mockProps.canCurrentUserAddProduct).toBeCalled();
        expect(instance.onFailure.calledWith('trusted-user-check')).toBeTruthy();
      });
    });
  });

  describe('fetchAsyncRequestFlowData', () => {
    it('should set alreadyRequested state based on the response to checkProductRequestFlag - already requested', async () => {
      mockProps.checkProductRequestFlag = jest.fn(async () => true);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncRequestFlowData().then(() => {
        expect(mockProps.checkProductRequestFlag).toBeCalled();
        expect(wrapper.state().alreadyRequested).toBeTruthy();
        expect(wrapper.state().screen).toBe(Screens.REQUEST_TRIAL);
        expect(wrapper.state().activationState).toBe(INACTIVE);
      });
    });

    it('should set alreadyRequested state based on the response to checkProductRequestFlag - not requested', async () => {
      mockProps.checkProductRequestFlag = jest.fn(async () => false);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncRequestFlowData().then(() => {
        expect(mockProps.checkProductRequestFlag).toBeCalled();
        expect(wrapper.state().alreadyRequested).toBeFalsy();
        expect(wrapper.state().screen).toBe(Screens.REQUEST_TRIAL);
        expect(wrapper.state().activationState).toBe(INACTIVE);
      });
    });

    it('should handle failure of checkProductRequestFlag', async () => {
      const mockError = new Error('failed');
      mockProps.checkProductRequestFlag = jest.fn(async () => { throw mockError; });

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'onFailure');

      await instance.fetchAsyncRequestFlowData().catch((e) => {
        expect(e).toBe(mockError);
        expect(mockProps.checkProductRequestFlag).toBeCalled();
        expect(instance.onFailure.calledWith('product-request-flag-check')).toBeTruthy();
      });
    });
  });

  describe('fetchAsyncStartFlowData', () => {
    it('should set correct activation state when ACTIVE', async () => {
      mockProps.getProductActivationState = jest.fn(async () => ACTIVE);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncStartFlowData().then(() => {
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(wrapper.state().screen).toBe(Screens.ALREADY_STARTED);
        expect(wrapper.state().activationState).toBe(ACTIVE);
      });
    });

    it('should set correct activation state when ACTIVATING', async () => {
      mockProps.getProductActivationState = jest.fn(async () => ACTIVATING);
      mockProps.waitForActivation = jest.fn(async () => undefined);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncStartFlowData().then(() => {
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(mockProps.waitForActivation).toBeCalled();
        expect(wrapper.state().screen).toBe(Screens.ALREADY_STARTED);
        expect(wrapper.state().activationState).toBe(ACTIVATING);
      });
    });

    it('should set correct activation state when INACTIVE', async () => {
      mockProps.getProductActivationState = jest.fn(async () => INACTIVE);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncStartFlowData().then(() => {
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(wrapper.state().screen).toBe(Screens.START_TRIAL);
        expect(wrapper.state().activationState).toBe(INACTIVE);
      });
    });

    it('should set correct activation state when DEACTIVATED', async () => {
      mockProps.getProductActivationState = jest.fn(async () => DEACTIVATED);

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      await wrapper.instance().fetchAsyncStartFlowData().then(() => {
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(wrapper.state().screen).toBe(Screens.START_TRIAL);
        expect(wrapper.state().activationState).toBe(DEACTIVATED);
      });
    });

    it('should handle when getProductActivationState fails', async () => {
      const mockError = new Error('failed');
      mockProps.getProductActivationState = jest.fn(async () => { throw mockError; });

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'onFailure');

      await instance.fetchAsyncStartFlowData().catch((e) => {
        expect(e).toBe(mockError);
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(instance.onFailure.calledWith('product-activation-state-check')).toBeTruthy();
      });
    });

    it('should handle when getProductActivationState returns an unknown state', async () => {
      mockProps.getProductActivationState = jest.fn(async () => 'GARBAGE_STATE');

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'onFailure');

      await instance.fetchAsyncStartFlowData().catch((e) => {
        expect(e.message).toEqual('unrecognized activation state!');
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(instance.onFailure.calledWith('product-activation-state-check')).toBeTruthy();
      });
    });

    it('should handle when waitForActivation fails', async () => {
      const mockError = new Error('failed');
      mockProps.getProductActivationState = jest.fn(async () => ACTIVATING);
      mockProps.waitForActivation = jest.fn(async () => {
        throw mockError;
      });

      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'onFailure');

      await instance.fetchAsyncStartFlowData().catch((e) => {
        expect(e).toBe(mockError);
        expect(mockProps.getProductActivationState).toBeCalled();
        expect(mockProps.waitForActivation).toBeCalled();
        expect(wrapper.state().screen).toBe(Screens.ALREADY_STARTED);
        expect(wrapper.state().activationState).toBe(ACTIVATING);
        expect(instance.onFailure.calledWith('wait-for-activation')).toBeTruthy();
      });
    });
  });

  describe('onFailure', () => {
    it('should fire an analytics event', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      const operationName = 'dance-off';

      instance.onFailure(operationName);

      expect(mockProps.firePrivateAnalyticsEvent)
        .toBeCalledWith(`xflow.request-or-start-trial.${operationName}.failed`);
    });

    it('should set state to indicate an error has occured', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const operationName = 'dance-off';

      wrapper.setState({
        initializingCheckFailed: false,
        showInitializationError: false,
      });

      wrapper.instance().onFailure(operationName);

      expect(wrapper.state().initializingCheckFailed).toBeTruthy();
      expect(wrapper.state().showInitializationError).toBeTruthy();
    });
  });

  describe('handleAnalyticsEvent', () => {
    it('should call onAnalyticsEvent with props', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();

      const mockEventName = 'my-amazing-event';
      const mockData = {
        apples: 'oranges',
        cost: 2,
        links: ['cabbage'],
      };

      instance.handleAnalyticsEvent(mockEventName, mockData);

      expect(mockProps.onAnalyticsEvent).toBeCalledWith(mockEventName, {
        ...mockData,
        sourceComponent: mockProps.sourceComponent,
        sourceContext: mockProps.sourceContext,
        targetProduct: mockProps.targetProduct,
      });
    });
  });

  describe('Flag Actions - Retry - onClick', () => {
    it('should clear the error state', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);

      wrapper.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });

      const retryFlag = wrapper.instance().flagActions[0];
      expect(retryFlag.content).toEqual('Retry'); // assert assumption that it's the first item

      retryFlag.onClick();

      expect(wrapper.state().initializingCheckFailed).toBeFalsy();
      expect(wrapper.state().showInitializationError).toBeFalsy();
    });

    it('should restart the async fetch', () => {
      const wrapper = shallow(<RequestOrStartTrial {...mockProps} />);
      const instance = wrapper.instance();
      sandbox.stub(instance, 'fetchAsyncData');

      wrapper.setState({
        initializingCheckFailed: true,
        showInitializationError: true,
      });

      const retryFlag = instance.flagActions[0];
      expect(retryFlag.content).toEqual('Retry'); // assert assumption that it's the first item

      retryFlag.onClick();

      expect(instance.fetchAsyncData.called).toBeTruthy();
    });
  });
});

