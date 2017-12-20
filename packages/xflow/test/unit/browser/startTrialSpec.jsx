import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Flag from '@atlaskit/flag';
import fetchMock from 'fetch-mock';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { Portal } from '@atlaskit/layer-manager';

import waitUntil from '../../util/wait-until';
import clickOnText from '../../util/click-on-text';
import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
} from '../../../src/common/productProvisioningStates';
import MockConfluenceXFlow from '../../../stories/helpers/MockConfluenceXFlowProvider';
import mockConfluenceStatusChecker from '../../../stories/helpers/mockProductStatusChecker';
import RequestOrStartTrial from '../../../src/request-or-start-trial';
import StartTrial from '../../../src/request-or-start-trial/components/StartTrial';
import ContextualStartTrial from '../../../src/request-or-start-trial/components/ContextualStartTrial';
import ConfirmTrial from '../../../src/request-or-start-trial/components/ConfirmTrial';
import GrantAccess from '../../../src/request-or-start-trial/components/GrantAccess';
import LoadingTime from '../../../src/request-or-start-trial/components/LoadingTime';
import AlreadyStarted from '../../../src/request-or-start-trial/components/AlreadyStarted';
import ProgressIndicator from '../../../src/request-or-start-trial/components/ProgressIndicator';
import ErrorFlag from '../../../src/common/components/ErrorFlag';
import JiraToConfluenceXFlowProvider from '../../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import XFlowIntlProvider from '../../../src/common/components/XFlowIntlProvider';
import XFlowAnalyticsListener from '../../../src/common/components/XFlowAnalyticsListener';

const noop = () => {};

// More tests should try to extract actual copy from the ProviderConfig,
// instead of being hardcoded in the test
const getXFlowProviderConfig = () =>
  mount(
    <JiraToConfluenceXFlowProvider>
      <div />
    </JiraToConfluenceXFlowProvider>
  )
    .find('XFlowProviderBase')
    .props().config;

const defaultProps = {
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
  closeLoadingDialog: async () => {},
  requestTrialWithNote: async () => {},
  cancelRequestTrial: async () => {},
  checkProductRequestFlag: async () => {},
  setProductRequestFlag: async () => {},
};

const defaultRequestOrStartTrialProps = {
  onAnalyticsEvent: noop,
  sourceComponent: 'storybook-example-component',
  sourceContext: 'storybook-example-context',
  targetProduct: 'storybook-example-product',
};

describe('@atlaskit/xflow', () => {
  beforeEach(() => fetchMock.catch(417));
  afterEach(fetchMock.restore);

  describe('new to confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => true}>
              <RequestOrStartTrial
                {...defaultRequestOrStartTrialProps}
                onTrialActivating={() => true}
              />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
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
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow
              {...defaultProps}
              canCurrentUserAddProduct={async () => true}
              productStatusChecker={mockConfluenceStatusChecker(DEACTIVATED)}
            >
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
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

  describe('rendering contextual start trial', () => {
    let xflow;

    describe('new to confluence', () => {
      beforeEach(() => {
        xflow = mount(
          <XFlowIntlProvider locale="en_US">
            <XFlowAnalyticsListener onEvent={noop}>
              <MockConfluenceXFlow {...defaultProps} canCurrentUserAddProduct={async () => true}>
                <RequestOrStartTrial
                  {...defaultRequestOrStartTrialProps}
                  onTrialActivating={() => true}
                  contextInfo={{
                    contextualHeading: 'Project pages are powered by Confluence',
                    contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
                    reactivateCTA: 'Reactivate Confluence',
                    trialCTA: 'Try Confluence free for 30 days',
                  }}
                />
              </MockConfluenceXFlow>
            </XFlowAnalyticsListener>
          </XFlowIntlProvider>
        );
        expect(xflow.length).toBe(1);
      });

      it('should render Start Trial component with contextual information', async () => {
        // eventually render to start trial screen
        await waitUntil(() => xflow.find(ContextualStartTrial).length === 1);
        // contextual heading
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Project pages are powered by Confluence');
        // contextual message
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Create, share, and collaborate on all your project docs in one place, with Confluence pages.');
        // contextual cta
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Try Confluence free for 30 days');
        // trial info footer
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Once your trial finishes, billing will start.');
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Your billing contact will be emailed three days before');
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Cancel your trial at any time in Manage subscriptions.');
      });
    });

    describe('returning to confluence', () => {
      beforeEach(() => {
        xflow = mount(
          <XFlowIntlProvider locale="en_US">
            <XFlowAnalyticsListener onEvent={noop}>
              <MockConfluenceXFlow
                {...defaultProps}
                canCurrentUserAddProduct={async () => true}
                productStatusChecker={mockConfluenceStatusChecker(DEACTIVATED)}
              >
                <RequestOrStartTrial
                  {...defaultRequestOrStartTrialProps}
                  contextInfo={{
                    contextualHeading: 'Project pages are powered by Confluence',
                    contextualMessage: 'Create, share, and collaborate on all your project docs in one place, with Confluence pages.',
                    reactivateCTA: 'Reactivate Confluence',
                    trialCTA: 'Try Confluence free for 30 days',
                  }}
                />
              </MockConfluenceXFlow>
            </XFlowAnalyticsListener>
          </XFlowIntlProvider>
        );
        expect(xflow.length).toBe(1);
      });

      it('should render Start Trial component with contextual information', async () => {
        // eventually render to start trial screen
        await waitUntil(() => xflow.find(ContextualStartTrial).length === 1);
        // contextual heading
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Project pages are powered by Confluence');
        // contextual message
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Create, share, and collaborate on all your project docs in one place, with Confluence pages.');
        // contextual reactivate cta
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Reactivate Confluence');
        // reactivation info footer
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Once your subscription reactivates, billing will resume.');
        expect(xflow.find(ContextualStartTrial).text()).toMatch('Cancel your subscription at any time in Manage subscriptions.');
      });
    });
  });

  describe('already activated confluence', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow
              {...defaultProps}
              productStatusChecker={mockConfluenceStatusChecker(ACTIVE)}
              canCurrentUserAddProduct={async () => true}
            >
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
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
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow
              {...defaultProps}
              productStatusChecker={mockConfluenceStatusChecker(ACTIVATING)}
              canCurrentUserAddProduct={async () => true}
            >
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
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

  describe('error retrieving canCurrentUserAddProduct', () => {
    let xflow;

    beforeEach(() => {
      xflow = mount(
        <XFlowIntlProvider locale="en_US">
          <XFlowAnalyticsListener onEvent={noop}>
            <MockConfluenceXFlow
              {...defaultProps}
              canCurrentUserAddProduct={() => Promise.reject(new Error('Misc'))}
              productStatusChecker={mockConfluenceStatusChecker(INACTIVE)}
            >
              <RequestOrStartTrial {...defaultRequestOrStartTrialProps} />
            </MockConfluenceXFlow>
          </XFlowAnalyticsListener>
        </XFlowIntlProvider>
      );
      expect(xflow.length).toBe(1);
    });

    it('should render an error flag', async () => {
      // eventually render to error flag
      await waitUntil(() => xflow.find(ErrorFlag).length === 1);
      // finding the portal
      // please refer: https://github.com/airbnb/enzyme/issues/536#issuecomment-239311682
      const portal = xflow.find(Portal);
      const portalWrapper = new ReactWrapper(portal.node.props.children);
      const flag = portalWrapper.find(Flag);
      expect(flag.find(ErrorIcon).props().label).toMatch('Error icon');
      expect(flag.text()).toMatch('Oops... Something went wrong');
      expect(flag.text()).toMatch('Let\'s try again.');
      expect(flag.text()).toMatch('Retry');
    });
  });
});
