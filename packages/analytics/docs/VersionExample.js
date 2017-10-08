import React, { Component } from 'react';

import {
  AnalyticsListener,
  AnalyticsDecorator,
  cleanProps,
  withAnalytics,
} from '../src';

/* eslint-disable react/no-multi-comp */
class Button extends Component {
  onClick = (e) => {
    const {
      fireAnalyticsEvent,
      firePrivateAnalyticsEvent,
      getParentAnalyticsData,
    } = this.props;

    // Firing an event without a version will use the analyticsVersion
    fireAnalyticsEvent('click');

    // Firing an event with a version will override the analyticsVersion
    fireAnalyticsEvent('click.v1', {}, 1);

    // Private events do not use the analyticsVersion
    firePrivateAnalyticsEvent('private.button.click', {});
    firePrivateAnalyticsEvent('private.button.click.v1', {}, 1);

    // Getting parent data without a version will use the analyticsVersion
    console.log('Parent data', getParentAnalyticsData('click'));

    // Getting parent data with a version will override the analyticsVersion
    console.log('V1 Parent data', getParentAnalyticsData('click', 1));

    if (this.props.onClick) this.props.onClick(e);
  };
  render() {
    const { children, ...props } = this.props;
    return (
      <button {...cleanProps(props)} onClick={this.onClick}>
        {children}
      </button>
    );
  }
}

const VersionButton = withAnalytics(Button);
/* eslint-disable react/no-multi-comp */

export default class VersionExample extends Component {
  onEvent = (eventName: string, eventData: Object) => {
    console.log(eventName, eventData);
  };

  onV1Event = (eventName: string, eventData: Object) => {
    console.log('V1', eventName, eventData);
  };

  render() {
    return (
      <AnalyticsListener onEvent={this.onV1Event} matchVersion={1}>
        <AnalyticsListener onEvent={this.onEvent}>
          <AnalyticsDecorator data={{ data: Date.now() }}>
            <AnalyticsDecorator data={{ 'data-v1': Date.now() }} matchVersion={1}>
              <div>
                <VersionButton analyticsId="version.button.with.analyticsVersion">
              Version button without analyticsVersion
                </VersionButton>
                <br />
                <VersionButton
                  analyticsId="version.button.without.analyticsVersion"
                  analyticsVersion={1}
                >
              Version button with analyticsVersion
                </VersionButton>
              </div>
            </AnalyticsDecorator>
          </AnalyticsDecorator>
        </AnalyticsListener>
      </AnalyticsListener>
    );
  }
}

