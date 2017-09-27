import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnalyticsDecorator } from '@atlaskit/analytics';
import { QS_ANALYTICS_EV_SUBMIT } from './constants';

const escapeRegexString = (regexString) => regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default (WrappedQuickSearch) =>
  class extends Component {
    static propTypes = {
      /** Search results in the form of AkNavigationItemGroups containing Result components */
      children: PropTypes.node,
      /** Value of the search input field */
      value: PropTypes.string,
    }

    static defaultProps = {
      children: [],
      value: '',
    }

    countChildren = () => React.Children.toArray(this.props.children).reduce(
      (total, group) => (total + React.Children.toArray(group.props.children).length)
      , 0);

    render() {
      return (
        <AnalyticsDecorator
          matchPrivate
          match={RegExp(`${escapeRegexString(QS_ANALYTICS_EV_SUBMIT)}`)}
          data={{
            resultCount: this.countChildren(),
            queryLength: this.props.value.length,
          }}
        >
          <WrappedQuickSearch {...this.props} />
        </AnalyticsDecorator>
      );
    }
  };
