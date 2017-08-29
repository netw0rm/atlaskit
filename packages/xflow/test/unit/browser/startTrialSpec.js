import React from 'react';
import { mount } from 'enzyme';
import waitUntil from '../../util/wait-until';
import clickOnText from '../../util/click-on-text';
import setupStorybookAnalytics from '../../../stories/util/setupStorybookAnalytics';
import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
} from '../../../src/common/productProvisioningStates';
import MockConfluenceXFlow from '../../../stories/providers/MockConfluenceXFlowProvider';
import mockConfluenceStatusChecker from '../../../stories/providers/mockConfluenceStatusChecker';
import RequestOrStartTrial from '../../../src/common/components/RequestOrStartTrial';
import StartTrial from '../../../src/start-trial/components/StartTrial';
import ConfirmTrial from '../../../src/start-trial/components/ConfirmTrial';
import GrantAccess from '../../../src/start-trial/components/GrantAccess';
import LoadingTime from '../../../src/start-trial/components/LoadingTime';
import AlreadyStarted from '../../../src/start-trial/components/AlreadyStarted';
import ProgressIndicator from '../../../src/start-trial/components/ProgressIndicator';
import ErrorFlag from '../../../src/start-trial/components/ErrorFlag';
import JiraToConfluenceXFlowProvider from '../../../src/jira-confluence/JiraToConfluenceXFlowProvider';

const noop = () => {};

// More tests should try to extract actual copy from the ProviderConfig,
// instead of being hardcoded in the test
const getXFlowProviderConfig = () =>
  mount(
    <JiraToConfluenceXFlowProvider>
      <div />
    </JiraToConfluenceXFlowProvider>
  )
    .find('XFlowProvider')
    .props().config;

const defaultProps = {
  isProductInstalledOrActivating: async () => INACTIVE,
  canCurrentUserAddProduct: async () => false,
  retrieveUsers: () =>
    Promise.resolve([
      {
        name: 'lhunt',
        'display-name': 'Lachlan Hunt',
        email: 'lhunt@example.com',
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
        name: 'awakeling',
        'display-name': 'Andrew Wakeling',
        email: 'awakeling@example.com',
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
        name: 'ahammond',
        'display-name': 'Andrew Hammond',
        email: 'ahammond@example.com',
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
        name: 'mtruong',
        'display-name': 'Michael Truong',
        email: 'mtruong@example.com',
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
        name: 'gburrows',
        'display-name': 'George Burrows',
        email: 'gburrows@example.com',
        attributes: {
          attributes: [
            {
              name: 'atlassianid.openid.identity',
              values: ['https://id.atlassian.com/openid/v2/u/5'],
            },
          ],
        },
      },
    ]),
  startProductTrial: async () => {},
  cancelStartProductTrial: async () => {},
  grantAccessToUsers: async () => {},
  goToProduct: async () => {},
  goToLearnMore: async () => {},
  closeLoadingDialog: async () => {},
  requestTrialAccess: async () => {},
  requestTrialAccessWithNote: async () => {},
  requestTrialAccessWithoutNote: async () => {},
  cancelRequestTrialAccess: async () => {},
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: noop,
  sourceComponent: 'storybook-example-compontent',
  sourceContext: 'storybook-example-context',
};

describe.skip('@atlaskit/xflow', () => {
  describe('new to confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        setupStorybookAnalytics(
          <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => true}>
            <RequestOrStartTrial
              {...defaultRequestOrStartTrialProps}
              onTrialActivating={() => true}
            />
          </MockConfluenceXFlow>
        )
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Start Trial component when user has access', async () => {
      // eventually render to start trial screen
      await waitUntil(() => xflow.find(StartTrial).length === 1);
      const confirmTrialHeading = getXFlowProviderConfig().startTrial.confirmTrialHeading;
      expect(xflow.find(StartTrial).text()).toMatch(confirmTrialHeading);
    });

    it('should render Grant Access component when user has not activated Confluence in the past', async () => {
      // eventually render to start trial screen
      await waitUntil(() => xflow.find(StartTrial).length === 1);
      // click on confirm
      clickOnText(xflow.find(ConfirmTrial), 'Confirm');

      await waitUntil(() => xflow.find(GrantAccess).length === 1);
      // render grant access screen
      const grantAccess = xflow.find(GrantAccess);
      const grantAccessHeading = getXFlowProviderConfig().startTrial.grantAccessHeading;
      expect(grantAccess.text()).toMatch(grantAccessHeading);
      expect(grantAccess.text()).toMatch(
        getXFlowProviderConfig().startTrial.grantAccessDefaultAccess
      );
    });

    it('should render Grant Access component with options', async () => {
      // eventually render to start trial screen
      await waitUntil(() => xflow.find(StartTrial).length === 1);
      // click on confirm
      clickOnText(xflow.find(ConfirmTrial), 'Confirm');

      await waitUntil(() => xflow.find(GrantAccess).length === 1);

      const grantAccess = xflow.find(GrantAccess);
      clickOnText(grantAccess, 'Manage');

      const everyoneLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(
        i => i.value === 'everyone'
      )[0].label;
      expect(grantAccess.text()).toMatch(everyoneLabel);

      const siteAdminsLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(
        i => i.value === 'site-admins'
      )[0].label;
      expect(grantAccess.text()).toMatch(siteAdminsLabel);

      const specificUsersLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(
        i => i.value === 'specific-users'
      )[0].label;
      expect(grantAccess.text()).toMatch(specificUsersLabel);

      expect(grantAccess.text()).toMatch('How will this affect my bill?');

      // should render all users in retrieve users request
      expect(grantAccess.text()).toMatch('Lachlan Hunt');
      expect(grantAccess.text()).toMatch('Andrew Wakeling');
      expect(grantAccess.text()).toMatch('Andrew Hammond');
      expect(grantAccess.text()).toMatch('Michael Truong');
      expect(grantAccess.text()).toMatch('George Burrows');
    });

    it('should render Loading Time component after grant access flow', async () => {
      // eventually render to start trial screen
      await waitUntil(() => xflow.find(StartTrial).length === 1);
      // click on confirm
      clickOnText(xflow.find(ConfirmTrial), 'Confirm');

      await waitUntil(() => xflow.find(GrantAccess).length === 1);
      // click on continue
      clickOnText(xflow.find(GrantAccess), 'Continue');

      await waitUntil(() => xflow.find(LoadingTime).length === 1);
      const waitingScreen = xflow.find(LoadingTime);
      expect(waitingScreen.text()).toMatch("We're turning some cogs...");
      expect(waitingScreen.text()).toMatch('Where to find Confluence');
      expect(waitingScreen.text()).toMatch(
        'Hit the menu icon near your profile image to switch between products.'
      );
      const goToProductButton = getXFlowProviderConfig().startTrial.loadingProductGotoProductButton;
      expect(waitingScreen.text()).toMatch(goToProductButton);
    });
  });

  describe('returning to confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        setupStorybookAnalytics(
          <MockConfluenceXFlow
            {...defaultProps}
            canCurrentUserAddProduct={async () => true}
            productStatusChecker={mockConfluenceStatusChecker(DEACTIVATED)}
          >
            <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
          </MockConfluenceXFlow>
        )
      );
      expect(xflow.length).toBe(1);
    });

    it('should skip Grant Access component when user has activated Confluence in the past', async () => {
      // eventually render to start trial screen
      await waitUntil(() => xflow.find(StartTrial).length === 1);
      // click on confirm
      clickOnText(xflow.find(ConfirmTrial), 'Confirm');

      await waitUntil(() => xflow.find(LoadingTime).length === 1);
      // render loading time screen, bypassing grant access screen
      const waitingScreen = xflow.find(LoadingTime);
      expect(waitingScreen.text()).toMatch("We're turning some cogs...");
      expect(waitingScreen.text()).toMatch('Where to find Confluence');
      expect(waitingScreen.text()).toMatch(
        'Hit the menu icon near your profile image to switch between products.'
      );
      const goToProductButton = getXFlowProviderConfig().startTrial.loadingProductGotoProductButton;
      expect(waitingScreen.text()).toMatch(goToProductButton);
    });
  });

  describe('already activated confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        setupStorybookAnalytics(
          <MockConfluenceXFlow
            {...defaultProps}
            productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
            canCurrentUserAddProduct={async () => true}
          >
            <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
          </MockConfluenceXFlow>
        )
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Start Trial component with already activated message', async () => {
      // eventually render to already started screen
      await waitUntil(() => xflow.find(AlreadyStarted).length === 1);
      expect(xflow.find(AlreadyStarted).text()).toMatch(
        'A site administrator already started a trial.'
      );
      expect(xflow.find(ProgressIndicator).length).toBe(0);
    });
  });

  describe('currently activating confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        setupStorybookAnalytics(
          <MockConfluenceXFlow
            {...defaultProps}
            productStatusChecker={mockConfluenceStatusChecker(ACTIVATING)}
            canCurrentUserAddProduct={async () => true}
          >
            <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
          </MockConfluenceXFlow>
        )
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Start Trial component with already activated message', async () => {
      // eventually render to already started screen
      await waitUntil(() => xflow.find(AlreadyStarted).length === 1);
      expect(xflow.find(AlreadyStarted).text()).toMatch(
        'A site administrator already started a trial.'
      );
      expect(xflow.find(ProgressIndicator).length).toBe(1);
    });
  });

  describe('error activating confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        setupStorybookAnalytics(
          <MockConfluenceXFlow
            {...defaultProps}
            canCurrentUserAddProduct={() => Promise.reject(new Error('Misc'))}
            requestTrialAccess={async () => true}
            productStatusChecker={mockConfluenceStatusChecker(INACTIVE)}
          >
            <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
          </MockConfluenceXFlow>
        )
      );
      expect(xflow.length).toBe(1);
    });

    it('should render Start Trial component with already activated message', async () => {
      // eventually render to error flag
      await waitUntil(() => xflow.find(ErrorFlag).length === 1);
      // should render error messages
      expect(xflow.find(ErrorFlag).text()).toMatch('Error icon');
      expect(xflow.find(ErrorFlag).text()).toMatch('Oops... Something went wrong');
      expect(xflow.find(ErrorFlag).text()).toMatch('Dismiss flag');
      expect(xflow.find(ErrorFlag).text()).toMatch("Let's try again.");
      expect(xflow.find(ErrorFlag).text()).toMatch('Retry');
    });
  });
});
