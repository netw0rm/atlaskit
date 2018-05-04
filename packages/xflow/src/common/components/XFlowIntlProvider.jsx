import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import addSupportedLocaleData from '../addSupportedLocaleData';
import languagePacks from '../../language-packs.json';

const getLanguageFromLocale = locale => (locale ? locale.substring(0, locale.indexOf('_')) : '');

addSupportedLocaleData();

export default class XFlowIntlProvider extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return (
      <IntlProvider
        messages={languagePacks[this.props.locale]}
        locale={getLanguageFromLocale(this.props.locale)}
      >
        { children }
      </IntlProvider>);
  }
}
