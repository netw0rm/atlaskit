import React, { Component } from 'react';
import PropTypes from 'prop-types';

import JiraToConfluenceXFlowProvider from './product-xflow-providers/JiraToConfluenceXFlowProvider';
import JiraToJSDXFlowProvider from './product-xflow-providers/JiraToJSDXFlowProvider';
import JiraToJCXFlowProvider from './product-xflow-providers/JiraToJCXFlowProvider';
import JiraToJSWXFlowProvider from './product-xflow-providers/JiraToJSWXFlowProvider';
import RequestOrStartTrial from './request-or-start-trial/index';

export function UnknownProductError() {}
UnknownProductError.prototype = Object.create(Error.prototype);

export default class XFlow extends Component {
  static propTypes = {
    sourceComponent: PropTypes.string.isRequired,
    sourceContext: PropTypes.string.isRequired,
    targetProduct: PropTypes.string.isRequired,
    onAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    onTrialRequested: PropTypes.func,
    onTrialActivating: PropTypes.func,
  };

  static getProviderForProductKey(productKey) {
    return {
      'confluence.ondemand': JiraToConfluenceXFlowProvider,
      'jira-servicedesk.ondemand': JiraToJSDXFlowProvider,
      'jira-core.ondemand': JiraToJCXFlowProvider,
      'jira-software.ondemand': JiraToJSWXFlowProvider,
    }[productKey];
  }

  render() {
    const { targetProduct, sourceComponent, sourceContext, onAnalyticsEvent, onComplete,
      onTrialActivating, onTrialRequested, ...props } = this.props;

    const XFlowProvider = XFlow.getProviderForProductKey(targetProduct);
    if (!XFlowProvider) {
      throw new UnknownProductError(`No XFlow provider for product ${targetProduct}`);
    }

    return (
      <XFlowProvider {...props}>
        <RequestOrStartTrial
          sourceComponent={sourceComponent}
          sourceContext={sourceContext}
          targetProduct={targetProduct}
          onAnalyticsEvent={onAnalyticsEvent}
          onComplete={onComplete}
          onTrialActivating={onTrialActivating}
          onTrialRequested={onTrialRequested}
        />
      </XFlowProvider>
    );
  }
}
