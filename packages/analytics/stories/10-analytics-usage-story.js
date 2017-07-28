import { storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';

import {
  AnalyticsDecorator,
  AnalyticsListener,
  cleanProps,
  withAnalytics,
} from '../src/index';

import { name } from '../package.json';

const ButtonWithWrappedAnalytics = withAnalytics(
  ({ children, ...props }) =>
    <button {...cleanProps(props)}>
      {children}
    </button>,
  { onClick: 'click' }
);

class IntegratedButton extends Component {
  onClick = (e) => {
    const { fireAnalyticsEvent, firePrivateAnalyticsEvent } = this.props;
    fireAnalyticsEvent('click');
    const { clientX, clientY } = e;
    firePrivateAnalyticsEvent('private.button.click', { clientX, clientY });
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

const ButtonWithIntegratedAnalytics = withAnalytics(IntegratedButton);

function handleAnalyticsEvent(eventName, eventData) {
  console.log('Analytics Event:', eventName, eventData);
}
function handlePrivateEvent(eventName, eventData) {
  console.log('Private Event:', eventName, eventData);
}

storiesOf(name, module).addCodeExampleStory('analytics', () =>
  <div>
    <h1>Analytics</h1>
    <div>
      <AnalyticsListener onEvent={handleAnalyticsEvent}>
        <AnalyticsListener matchPrivate onEvent={handlePrivateEvent}>
          <AnalyticsDecorator data={{ time: Date.now() }}>
            <ButtonWithWrappedAnalytics analyticsId="wrapped.button">
              Wrapped Analytics
            </ButtonWithWrappedAnalytics>
            <ButtonWithIntegratedAnalytics analyticsId="integrated.button">
              Integrated Analytics
            </ButtonWithIntegratedAnalytics>
          </AnalyticsDecorator>
        </AnalyticsListener>
      </AnalyticsListener>
    </div>
  </div>
);
