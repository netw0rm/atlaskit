import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AkQuickSearch, AkSearchResults } from '../../../src';

const flattenResults = results => (
  results.reduce((flatArray, group) => (
    flatArray.concat(group.items)
  ), [])
);

/**
 * Get the ID of an item by its index in the flatResults array
 * Returns null for a failed index or if id is empty|undefined
 */
const getItemIdByIndex = (array, index) => (array && array[index] && array[index].id) || null;

/**
 * Find an item in the flatResults array by its ID
 * Returns the item object or null
 */
const getItemById = (array, id) => (array && array.find(item => item.id === id)) || null;

/**
 * Get an item's index in the flatResults array by its ID
 * Returns a numberic index or null
 */
const getItemIndexById = (array, id) => {
  if (!array) {
    return null;
  }
  const item = getItemById(array, id);
  const index = array.indexOf(item);
  return index >= 0 ? index : null;
};

const adjustIndex = (arrayLength, currentIndex, adjustment) => {
  if (arrayLength === 0) {
    return null;
  }
  if (adjustment === 0) {
    return currentIndex;
  }

  // If nothing is selected, select the element on the end
  if (currentIndex === null) {
    return adjustment > 0 ? 0 : arrayLength - 1;
  }
  // Adjust current index, wrapping around if necessary
  const adjustedIndex = (currentIndex + adjustment) % arrayLength;
  // Correct for negative indices
  return adjustedIndex >= 0 ? adjustedIndex : adjustedIndex + arrayLength;
};

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

    state = {
      selectedItemId: getItemIdByIndex(this.flatResults, 0),
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.results) {
        this.flatResults = flattenResults(nextProps.results);
        this.setState({
          selectedItemId: getItemIdByIndex(this.flatResults, 0),
        });
      }
    }

    /**
     * Uses the virtual list, this.flatResults, to move the selection across grouped results as if
     * results were in a single, circular list.
     *
     * Process:
     * 1. Finds the index of the selected item in the flatResults array,
     * 2. Increments or decrements this index by the supplied adjustment amount,
     * 3. Sets the new selectedItemId based on the modifed index
     */
    adjustSelectedItemIndex = (adjustment) => {
      const currentIndex = getItemIndexById(this.flatResults, this.state.selectedItemId);
      const newIndex = adjustIndex(this.flatResults.length, currentIndex, adjustment);
      this.setState({
        selectedItemId: getItemIdByIndex(this.flatResults, newIndex),
      });
    }

    selectNext = () => { this.adjustSelectedItemIndex(+1); };

    selectPrevious = () => { this.adjustSelectedItemIndex(-1); };

    handleSearchKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectPrevious();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault(); // Don't move cursor around in search input field
        this.selectNext();
      } else if (event.key === 'Enter' && this.state.selectedItemId) {
        event.preventDefault(); // Don't fire submit event from input
        this.props.onResultClick(getItemById(this.flatResults, this.state.selectedItemId));
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
