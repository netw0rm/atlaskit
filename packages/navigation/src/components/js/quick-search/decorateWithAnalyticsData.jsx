import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnalyticsDecorator } from '@atlaskit/analytics';

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
          match={/(submit)/}
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
