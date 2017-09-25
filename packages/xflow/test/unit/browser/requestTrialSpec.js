import React from 'react';
import { mount } from 'enzyme';
import waitUntil from '../../util/wait-until';
import clickOnText from '../../util/click-on-text';
import MockConfluenceXFlow from '../../../stories/providers/MockConfluenceXFlowProvider';
import RequestOrStartTrial from '../../../src/common/components/RequestOrStartTrial';
import ConfirmRequest from '../../../src/request-or-start-trial/components/ConfirmRequest';
import RequestTrialNote from '../../../src/request-or-start-trial/components/RequestTrialNote';
import ErrorFlag from '../../../src/common/components/ErrorFlag';
import SuccessFlag from '../../../src/common/components/SuccessFlag';
import JiraToConfluenceXFlowProvider from '../../../src/jira-confluence/JiraToConfluenceXFlowProvider';
import XFlowIntlProvider from '../../../src/common/components/XFlowIntlProvider';
import XFlowAnalyticsListener from '../../../src/common/components/XFlowAnalyticsListener';
import { INACTIVE } from '../../../src/common/productProvisioningStates';

const noop = () => {};

const getXFlowProviderConfig = () =>
  mount(
    <JiraToConfluenceXFlowProvider>
      <div />
    </JiraToConfluenceXFlowProvider>
  )
    .find('XFlowProvider')
    .props().config;

const defaultProps = {
  status: INACTIVE,
  requestTrialWithNote: async () => Promise.resolve(),
  cancelRequestTrial: async () => {},
  onTrialActivating: () => true,
  checkProductRequestFlag: async () => Promise.resolve(),
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: noop,
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
};

describe('@atlaskit/xflow', () => {
  describe('new to confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => false}>
              <RequestOrStartTrial
                {...defaultRequestOrStartTrialProps}
              />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Request Trial Access component when user doesn\'t have access', async () => {
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
      expect(xflow.find(SuccessFlag).text()).toMatch('Success icon');
      expect(xflow.find(SuccessFlag).text()).toMatch('That\'s sent!');
      expect(xflow.find(SuccessFlag).text()).toMatch('We\'ll let your admin know right away.');
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
              requestTrialWithNote={
                () => new Promise((_, reject) =>
                reject(new Error('It\'s borked')))}
            >
              <RequestOrStartTrial
                {...defaultRequestOrStartTrialProps}
              />
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
      expect(xflow.find(ErrorFlag).text()).toMatch('Error icon');
      expect(xflow.find(ErrorFlag).text()).toMatch('Uh oh, something\'s up');
      expect(xflow.find(ErrorFlag).text()).toMatch('That request didn\'t make it through. Shall we try again?');
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
