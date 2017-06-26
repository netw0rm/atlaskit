import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AkQuickSearch, AkSearchResults } from '../../../src';

const flattenResults = results => (
  results.reduce((flatArray, group) => (
    flatArray.concat(group.items)
  ), [])
);

/**
 * The value, null, is used to represent 'no selection'.  Please remember to
 * appropriately check for null when using the selectedItemId state
 */

export const withKeyboardControls = QuickSearchComp => (
  class WithKeyboardControls extends Component {
    static propTypes = {
      results: AkSearchResults.propTypes.results,
      onResultClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
      results: [],
    }

    flatResults = flattenResults(this.props.results);

    /**
     * Get the ID of an item by its index in the flatResults array
     * Returns null for a failed index or if id is empty|undefined
     */
    getItemIdByIndex = index => (this.flatResults[index] && this.flatResults[index].id) || null;

    /**
     * Get an item's index in the flatResults array by its ID
     * Returns a numberic index or null
     */
    getItemIndexById = (id) => {
      const item = this.getItemById(id);
      const index = this.flatResults.indexOf(item);
      return index >= 0 ? index : null;
    }

    /**
     * Find an item in the flatResults array by its ID
     * Returns the item object or null
     */
    getItemById = id => this.flatResults.find(item => item.id === id) || null;

    state = {
      selectedItemId: this.getItemIdByIndex(0),
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.results) {
        this.flatResults = flattenResults(nextProps.results);
        this.setState({
          selectedItemId: this.getItemIdByIndex(0),
        });
      }
    }

    selectNext = () => {
      // Don't bother if results is empty
      if (this.props.results.length === 0) return;

      let newIdx;
      const currentIdx = this.getItemIndexById(this.state.selectedItemId);
      // If nothing is selected, select the first element
      // Otherwise, select the next element, wrapping around to the top if necessary
      if (this.state.selectedItemId === null || currentIdx === null) {
        newIdx = 0;
      } else {
        newIdx = (currentIdx + 1 < this.flatResults.length) ? currentIdx + 1 : 0;
      }
      this.setState({
        selectedItemId: this.getItemIdByIndex(newIdx),
      });
    };

    selectPrevious = () => {
      // Don't bother if results is empty
      if (this.props.results.length === 0) return;

      let newIdx;
      const currentIdx = this.getItemIndexById(this.state.selectedItemId);
      // If nothing is selected, select the last element
      // Otherwise, select the previous element, wrapping around to the bottom if necessary
      if (this.state.selectedItemId === null || currentIdx === null) {
        newIdx = this.flatResults.length - 1;
      } else {
        newIdx = (currentIdx > 0) ? currentIdx - 1 : this.flatResults.length - 1;
      }
      this.setState({
        selectedItemId: this.getItemIdByIndex(newIdx),
      });
    };

    handleSearchKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectPrevious();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectNext();
      } else if (event.key === 'Enter' && this.state.selectedItemId) {
        event.preventDefault(); // Don't fire submit event from input
        this.props.onResultClick(this.getItemById(this.state.selectedItemId));
      }
    };

    render() {
      return (
        <QuickSearchComp
          {...this.props}
          onSearchKeyDown={this.handleSearchKeyDown}
          selectedItemId={this.state.selectedItemId}
        />
      );
    }
  }
);
export default withKeyboardControls(AkQuickSearch);
