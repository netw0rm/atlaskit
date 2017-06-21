import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AkQuickSearch, AkSearchResults } from '../../../src';

const flattenResults = results => (
  results.reduce((flatArray, group) => (
    flatArray.concat(group.items)
  ), [])
);

export const withKeyboardControls = QuickSearchComp => (
  class WithKeyboardControls extends Component {
    static propTypes = {
      results: AkSearchResults.propTypes.results,
      onResultClick: PropTypes.func.isRequired,
    }

    flatResults = flattenResults(this.props.results);

    state = {
      selectedItem: this.flatResults[0] || null,
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.results) {
        this.flatResults = flattenResults(nextProps.results);
        this.setState({
          selectedItem: this.flatResults[0],
        });
      }
    }

    selectedItemIndex = () => {
      const currendIdx = this.flatResults.indexOf(this.state.selectedItem);
      return currendIdx >= 0 ? currendIdx : null;
    }

    selectNext = () => {
      const currentIdx = this.selectedItemIndex();
      const newIdx = (currentIdx + 1) < this.flatResults.length ? currentIdx + 1 : 0;
      this.setState({
        selectedItem: this.flatResults[newIdx],
      });
    };

    selectPrevious = () => {
      const currentIdx = this.selectedItemIndex();
      const newIdx = currentIdx > 0 ? currentIdx - 1 : this.flatResults.length - 1;
      this.setState({
        selectedItem: this.flatResults[newIdx],
      });
    }

    handleSearchKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectPrevious();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectNext();
      } else if (event.key === 'Enter') {
        this.props.onResultClick(this.state.selectedItem);
      }
    };

    render() {
      return (
        <QuickSearchComp
          {...this.props}
          onSearchKeyDown={this.handleSearchKeyDown}
          selectedItemId={this.state.selectedItem && this.state.selectedItem.id}
        />
      );
    }
  }
);
export default withKeyboardControls(AkQuickSearch);
