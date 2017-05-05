import React, { PropTypes, Component } from 'react';

import { AbstractResource, SearchSubscriber } from '../../api/SearchResource';
import uniqueId from '../../util/id';
import getDisplayName from '../../util/getDisplayName';

const withSearchResource = WrappedComponent =>
  class WithSearchResource extends Component {

    static propTypes = {
      searchResource: PropTypes.instanceOf(AbstractResource).isRequired,
      searchSubscriber: PropTypes.instanceOf(SearchSubscriber),
    }

    static displayName = `WithSearchResource(${getDisplayName(WrappedComponent)})`

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

    onSearchResultUpdate = (resultsType, items) => {
      console.log('items', items);
      this.setState({ resultsType, items });
    }

    filterError = (err) => {
      this.setState({
        items: {},
        resultsType: 'error',
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
