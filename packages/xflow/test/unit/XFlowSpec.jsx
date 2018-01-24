import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import XFlow, { UnknownProductError } from '../../src/XFlow';
import JiraToConfluenceXFlowProvider from '../../src/product-xflow-providers/JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from '../../src/product-xflow-providers/JiraToJSDXFlowProvider';
import JiraToJCXFlowProvider from '../../src/product-xflow-providers/JiraToJCXFlowProvider';
import JiraToJSWXFlowProvider from '../../src/product-xflow-providers/JiraToJSWXFlowProvider';
import RequestOrStartTrial from '../../src/request-or-start-trial/index';

describe('<XFlow> Component', () => {
  let mockProps = null;
  let mockProviderOverrides = null;
  let mockRequestOrStartTrialProps = null;
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    mockProviderOverrides = {
      grantAccessEnabled: false,
      goToProduct: sandbox.stub(),
    };

    mockRequestOrStartTrialProps = {
      sourceComponent: 'mockSourceComponent',
      sourceContext: 'mockSourceContext',
      targetProduct: 'mockTargetProduct',
      onAnalyticsEvent: sandbox.stub(),
      onComplete: sandbox.stub(),
      onTrialRequested: sandbox.stub(),
      onTrialActivating: sandbox.stub(),
    };

    mockProps = {
      ...mockRequestOrStartTrialProps,
      ...mockProviderOverrides,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  const PROVIDER_MAP =
    {
      'jira-servicedesk.ondemand': JiraToJSDXFlowProvider,
      'jira-core.ondemand': JiraToJCXFlowProvider,
      'jira-software.ondemand': JiraToJSWXFlowProvider,
      'confluence.ondemand': JiraToConfluenceXFlowProvider,
    };

  describe('render', () => {
    Object.keys(PROVIDER_MAP).forEach((productKey) => {
      const Provider = PROVIDER_MAP[productKey];

      it(`should use the correct XFlowProvider for product key ${productKey}`, () => {
        mockProps.targetProduct = productKey;

        const wrapper = shallow(<XFlow {...mockProps} />);

        const provider = wrapper.find(Provider);
        expect(provider.exists()).toBeTruthy();
        expect(provider.props()).toEqual(
          expect.objectContaining(mockProviderOverrides)
        );

        const requestOrStartTrial = wrapper.find(RequestOrStartTrial);
        expect(requestOrStartTrial.exists()).toBeTruthy();
        expect(requestOrStartTrial.props()).toEqual(
          expect.objectContaining({
            ...mockRequestOrStartTrialProps,
            targetProduct: productKey,
          })
        );
      });
    });

    it('should throw when provided an unsupported product key', () => {
      mockProps.targetProduct = 'nonsenseKey';

      expect(() => {
        shallow(<XFlow {...mockProps} />);
      }).toThrow(UnknownProductError);
    });
  });
});
