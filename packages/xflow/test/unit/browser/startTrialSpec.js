import { expect } from 'chai';
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
  mount(<JiraToConfluenceXFlowProvider><div /></JiraToConfluenceXFlowProvider>)
    .find('XFlowProvider')
    .props()
    .config;

const defaultProps = {
  isProductInstalledOrActivating: async () => INACTIVE,
  canCurrentUserAddProduct: async () => false,
  retrieveUsers: () =>
    Promise.resolve([
      { name: 'lhunt', displayName: 'Lachlan Hunt', email: 'lhunt@example.com' },
      { name: 'awakeling', displayName: 'Andrew Wakeling', email: 'awakeling@example.com' },
      { name: 'ahammond', displayName: 'Andrew Hammond', email: 'ahammond@example.com' },
      { name: 'mtruong', displayName: 'Michael Truong', email: 'mtruong@example.com' },
      { name: 'gburrows', displayName: 'George Burrows', email: 'gburrows@example.com' },
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
};

describe('@atlaskit/xflow', () => {
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
      expect(xflow.length).to.equal(1, 'expect xflow to mount correctly');
    });

    it('should render Start Trial component when user has access', () =>
      // eventually render to start trial screen
      waitUntil(() => xflow.find(StartTrial).length === 1).then(() => {
        const confirmTrialHeading = getXFlowProviderConfig().startTrial.confirmTrialHeading;
        expect(xflow.find(StartTrial).text()).to.include(confirmTrialHeading);
      }));

    it('should render Grant Access component when user has not activated Confluence in the past', () =>
      // eventually render to start trial screen
      waitUntil(() => xflow.find(StartTrial).length === 1).then(() => {
        // click on confirm
        clickOnText(xflow.find(ConfirmTrial), 'Confirm');
        return waitUntil(() => xflow.find(GrantAccess).length === 1).then(() => {
          // render grant access screen
          const grantAccess = xflow.find(GrantAccess);
          const grantAccessHeading = getXFlowProviderConfig().startTrial.grantAccessHeading;
          expect(grantAccess.text()).to.include(grantAccessHeading);
          expect(grantAccess.text()).to.include(
            getXFlowProviderConfig().startTrial.grantAccessDefaultAccess
          );
        });
      }));

    it('should render Grant Access component with options', () =>
      // eventually render to start trial screen
      waitUntil(() => xflow.find(StartTrial).length === 1).then(() => {
        // click on confirm
        clickOnText(xflow.find(ConfirmTrial), 'Confirm');
        return waitUntil(() => xflow.find(GrantAccess).length === 1).then(() => {
          const grantAccess = xflow.find(GrantAccess);
          clickOnText(grantAccess, 'Change...');
          const grantAccessChooseOption = getXFlowProviderConfig()
            .startTrial
            .grantAccessChooseOption;
          expect(grantAccess.text()).to.include(grantAccessChooseOption);
          const everyoneLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(i => i.value === 'everyone')[0].label;
          expect(grantAccess.text()).to.include(everyoneLabel);
          const siteAdminsLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(i => i.value === 'site-admins')[0].label;
          expect(grantAccess.text()).to.include(siteAdminsLabel);
          const specificUsersLabel = getXFlowProviderConfig().startTrial.grantAccessOptionItems.filter(i => i.value === 'specific-users')[0].label;
          expect(grantAccess.text()).to.include(specificUsersLabel);

          expect(grantAccess.text()).to.include('How will this affect my bill?');

          // should render all users in retrieve users request
          expect(grantAccess.text()).to.include('Lachlan Hunt');
          expect(grantAccess.text()).to.include('Andrew Wakeling');
          expect(grantAccess.text()).to.include('Andrew Hammond');
          expect(grantAccess.text()).to.include('Michael Truong');
          expect(grantAccess.text()).to.include('George Burrows');
        });
      }));

    it('should render Loading Time component after grant access flow', () =>
      // eventually render to start trial screen
      waitUntil(() => xflow.find(StartTrial).length === 1).then(() => {
        // click on confirm
        clickOnText(xflow.find(ConfirmTrial), 'Confirm');
        return waitUntil(() => xflow.find(GrantAccess).length === 1).then(() => {
          // click on continue
          clickOnText(xflow.find(GrantAccess), 'Continue');
          return waitUntil(() => xflow.find(LoadingTime).length === 1).then(() => {
            const waitingScreen = xflow.find(LoadingTime);
            expect(waitingScreen.text()).to.include("We're turning some cogs...");
            expect(waitingScreen.text()).to.include('Where to find Confluence');
            expect(waitingScreen.text()).to.include(
              'Hit the menu icon near your profile image to switch between products.'
            );
            const goToProductButton = getXFlowProviderConfig()
              .startTrial
              .loadingProductGotoProductButton;
            expect(waitingScreen.text()).to.include(goToProductButton);
          });
        });
      }));
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
      expect(xflow.length).to.equal(1, 'expect xflow to mount correctly');
    });

    it('should skip Grant Access component when user has activated Confluence in the past', () =>
      // eventually render to start trial screen
      waitUntil(() => xflow.find(StartTrial).length === 1).then(() => {
        // click on confirm
        clickOnText(xflow.find(ConfirmTrial), 'Confirm');
        return waitUntil(() => xflow.find(LoadingTime).length === 1).then(() => {
          // render loading time screen, bypassing grant access screen
          const waitingScreen = xflow.find(LoadingTime);
          expect(waitingScreen.text()).to.include("We're turning some cogs...");
          expect(waitingScreen.text()).to.include('Where to find Confluence');
          expect(waitingScreen.text()).to.include(
            'Hit the menu icon near your profile image to switch between products.'
          );
          const goToProductButton = getXFlowProviderConfig()
            .startTrial
            .loadingProductGotoProductButton;
          expect(waitingScreen.text()).to.include(goToProductButton);
        });
      }));
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
      expect(xflow.length).to.equal(1, 'expect xflow to mount correctly');
    });

    it('should render Start Trial component with already activated message', () =>
      // eventually render to already started screen
      waitUntil(() => xflow.find(AlreadyStarted).length === 1).then(() => {
        expect(xflow.find(AlreadyStarted).text()).to.include(
          'A site administrator already started a trial.'
        );
        expect(xflow.find(ProgressIndicator).length).to.equal(
          0,
          'should not render a progress indicator'
        );
      }));
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
      expect(xflow.length).to.equal(1, 'expect xflow to mount correctly');
    });

    it('should render Start Trial component with already activated message', () =>
      // eventually render to already started screen
      waitUntil(() => xflow.find(AlreadyStarted).length === 1).then(() => {
        expect(xflow.find(AlreadyStarted).text()).to.include(
          'A site administrator already started a trial.'
        );
        expect(xflow.find(ProgressIndicator).length).to.equal(
          1,
          'should render a progress indicator'
        );
      }));
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
      expect(xflow.length).to.equal(1, 'expect xflow to mount correctly');
    });

    it('should render Start Trial component with already activated message', () =>
      // eventually render to error flag
      waitUntil(() => xflow.find(ErrorFlag).length === 1).then(() => {
        // should render error messages
        expect(xflow.find(ErrorFlag).text()).to.include('Error icon');
        expect(xflow.find(ErrorFlag).text()).to.include('Oops... Something went wrong');
        expect(xflow.find(ErrorFlag).text()).to.include('Dismiss flag');
        expect(xflow.find(ErrorFlag).text()).to.include("Let's try again.");
        expect(xflow.find(ErrorFlag).text()).to.include('Retry');
      }));
  });
});
