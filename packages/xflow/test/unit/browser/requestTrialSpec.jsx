import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import Flag from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { Portal } from '@atlaskit/layer-manager';

import waitUntil from '../../util/wait-until';
import clickOnText from '../../util/click-on-text';
import { userPreferencesEndpoint } from '../../../src/common/services/alreadyRequestedFlag';
import MockConfluenceXFlow from '../../../stories/helpers/MockConfluenceXFlowProvider';
import RequestOrStartTrial from '../../../src/request-or-start-trial';
import ConfirmRequest from '../../../src/request-or-start-trial/components/ConfirmRequest';
import RequestTrialNote from '../../../src/request-or-start-trial/components/RequestTrialNote';
import ErrorFlag from '../../../src/common/components/ErrorFlag';
import SuccessFlag from '../../../src/common/components/SuccessFlag';
import JiraToConfluenceXFlowProvider from '../../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import XFlowIntlProvider from '../../../src/common/components/XFlowIntlProvider';
import XFlowAnalyticsListener from '../../../src/common/components/XFlowAnalyticsListener';
import { INACTIVE } from '../../../src/common/productProvisioningStates';

// eslint-disable-next-line global-require
jest.mock('@atlaskit/modal-dialog', () => require('../__mocks__/modal-dialog-mock'));

const noop = () => {};

const getXFlowProviderConfig = () =>
  mount(
    <JiraToConfluenceXFlowProvider>
      <div />
    </JiraToConfluenceXFlowProvider>
  )
    .find('XFlowProviderBase')
    .props().config;

const defaultProps = {
  status: INACTIVE,
  requestTrialWithNote: async () => {},
  cancelRequestTrial: async () => {},
  onTrialActivating: () => true,
  checkProductRequestFlag: async () => {},
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: noop,
  sourceComponent: 'storybook-example-component',
  sourceContext: 'storybook-example-context',
  targetProduct: 'storybook-example-product',
  retrieveIsOptOutEnabled: async () => false,
  retrieveCanManageSubscriptions: async () => true,
};

describe('RequestOrStartTrial', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => sandbox.restore());

  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  describe('new to confluence', () => {
    let xflow;

    beforeEach(() => {
      fetchMock.putOnce(userPreferencesEndpoint('confluence.ondemand'), 200);

      sandbox.spy(defaultProps, 'requestTrialWithNote');
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => false}>
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Request Trial Access component when user doesn’t have access', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      const requestTrialHeading = getXFlowProviderConfig().requestTrial.accessHeading;
      expect(xflow.find(ConfirmRequest).text()).toMatch(requestTrialHeading);
    });

    it('should render Request Trial with Note', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      // click on Request a trial
      clickOnText(xflow.find(ConfirmRequest), 'Request a trial');

      await waitUntil(() => xflow.find(RequestTrialNote).length === 1);
      const requestTrialNotePrompt = getXFlowProviderConfig().requestTrial.notePrompt;
      expect(xflow.find(RequestTrialNote).text()).toMatch(requestTrialNotePrompt);
    });

    it('should render Success Flag', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      clickOnText(xflow.find(ConfirmRequest), 'Request a trial');

      await waitUntil(() => xflow.find(RequestTrialNote).length === 1);
      clickOnText(xflow.find(RequestTrialNote), 'Send note');
      await waitUntil(() => xflow.find(SuccessFlag).length === 1);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = xflow.find(SuccessFlag).find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.find(CheckCircleIcon).props().label).toMatch('Success icon');
      expect(flag.text()).toMatch("That's sent!");
      expect(flag.text()).toMatch("We'll let your admin know right away.");
      sinon.assert.calledWith(
        defaultProps.requestTrialWithNote,
        "Hi! I'd like to try Confluence. It helps give the team more context on anything happening in Jira - and there's a free 30 day trial."
      );
    });

    it('should send a custom note', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      clickOnText(xflow.find(ConfirmRequest), 'Request a trial');

      await waitUntil(() => xflow.find(RequestTrialNote).length === 1);
      xflow.find('textarea').node.value = 'Hey, look a custom note';
      clickOnText(xflow.find(RequestTrialNote), 'Send note');
      await waitUntil(() => xflow.find(SuccessFlag).length === 1);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = xflow.find(SuccessFlag).find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.find(CheckCircleIcon).props().label).toMatch('Success icon');
      expect(flag.text()).toMatch("That's sent!");
      expect(flag.text()).toMatch("We'll let your admin know right away.");
      sinon.assert.calledWith(defaultProps.requestTrialWithNote, 'Hey, look a custom note');
    });
  });

  describe('error activating confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow
              {...defaultProps}
              canCurrentUserAddProduct={async () => false}
              requestTrialWithNote={() =>
                new Promise((_, reject) => reject(new Error("It's borked")))
              }
            >
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Error Flag', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      clickOnText(xflow.find(ConfirmRequest), 'Request a trial');

      await waitUntil(() => xflow.find(RequestTrialNote).length === 1);
      clickOnText(xflow.find(RequestTrialNote), 'Send note');
      await waitUntil(() => xflow.find(ErrorFlag).length === 1);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = xflow.find(ErrorFlag).find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.find(ErrorIcon).props().label).toMatch('Error icon');
      expect(flag.text()).toMatch("Uh oh. That didn't work");
      expect(flag.text()).toMatch("Your trial request wasn't sent.");
    });
  });

  describe('already requested', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => false}>
              <RequestOrStartTrial
                {...defaultRequestOrStartTrialProps}
                checkProductRequestFlag={() => true}
              />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Already Requested version if the user has already raised a request', async () => {
      // eventually render to request trial screen
      await waitUntil(() => xflow.find(ConfirmRequest).length === 1);
      expect(xflow.find(ConfirmRequest).text()).toMatch('Requested');
      expect(xflow.find(ConfirmRequest).text()).toMatch('Learn more');
    });
  });
});
