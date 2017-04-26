import React, { PropTypes, Component } from 'react';

import { AbstractResource, SearchSubscriber } from '../../api/SearchResource';
import uniqueId from '../../util/id';

/** TS: ResultsList: WrappedCmpnt */
const withSearchResource = WrappedComponent =>
  class ResourcedResultsList extends Component {

    static propTypes = {
      searchResource: PropTypes.instanceOf(AbstractResource).isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        items: null,
        resultsType: 'recent',
      };
      this.searchSubscriber = new SearchSubscriber({
        subscriberKey: uniqueId('ak-quick-search-resourced-results'),
        changeHandler: this.onSearchResultUpdate,
        errorHandler: this.filterError,
      });
    }

    componentDidMount = () => {
      this.searchSubscriber.subscribe(this.props.searchResource);
    }

    componentWillUnmount() {
      this.searchSubscriber.unsubscribe(this.props.searchResource);
    }

    onSearchResultUpdate = (resultType, items) => {
      this.setState({ resultType, items });
    }

    filterError = (err) => {
      this.setState({
        items: [],
        resultType: 'error',
      });
      // eslint-disable-next-line no-console
      console.log('ak-quick-search.filterError', err);
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { searchResource, ...passThroughProps } = this.props;
      return (
        <WrappedComponent
          resultsType={this.state.resultsType}
          resultGroups={this.state.items}
          {...passThroughProps}
        />
      );
    }
};

export default withSearchResource;
