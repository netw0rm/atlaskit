import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener } from '@atlaskit/analytics';
import addSupportedLocaleData from '../addSupportedLocaleData';
import { withXFlowProvider } from './XFlowProvider';

addSupportedLocaleData();

const getLanguageFromLocale = locale => (locale ? locale.substring(0, locale.indexOf('_')) : '');

const noop = () => {};

export class AppBase extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node,
    languagePacks: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    onAnalyticsEvent: PropTypes.func,
  };

  render() {
    const { onAnalyticsEvent, languagePacks } = this.props;
    return (
      <AnalyticsListener matchPrivate match="xflow." onEvent={onAnalyticsEvent || noop}>
        <IntlProvider
          messages={languagePacks[this.props.locale]}
          locale={getLanguageFromLocale(this.props.locale)}
        >
          {this.props.children}
        </IntlProvider>
      </AnalyticsListener>
    );
  }
}

export default withXFlowProvider(AppBase, ({ xFlow: { config: { languagePacks } } }) => ({
  languagePacks,
}));
