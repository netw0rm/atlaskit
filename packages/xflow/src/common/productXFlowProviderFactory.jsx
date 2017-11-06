import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { XFlowProvider } from './components/XFlowProvider';
import XFlowIntlProvider from './components/XFlowIntlProvider';

function createProviderBase(defaultProps) {
  return class extends Component {
    static propTypes = {
      intl: intlShape,
    };

    render() {
      const { intl } = this.props;
      const props = {
        ...defaultProps(intl),
        ...this.props,
      };

      return <XFlowProvider {...props} />;
    }
  };
}

function createProviderBaseWithIntl(defaultProps) {
  return injectIntl(createProviderBase(defaultProps));
}

export default (defaultProps) => {
  const ProviderWithIntl = createProviderBaseWithIntl(defaultProps);

// eslint-disable-next-line react/no-multi-comp
  return class extends Component {

    static propTypes = {
      locale: PropTypes.string,
    };

    static defaultProps = {
      locale: 'en_US',
    };

    render() {
      const { locale, ...otherProps } = this.props;

      return (
        <XFlowIntlProvider locale={locale}>
          <ProviderWithIntl {...otherProps} />
        </XFlowIntlProvider>
      );
    }
    };
};
