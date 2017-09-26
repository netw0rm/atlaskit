import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAnalytics } from '@atlaskit/analytics';
import { AkSearch } from '../../../../src';

export const ATLASKIT_QUICKSEARCH_NS = '@atlaskit/navigation/quick-search';

const noOp = () => {};

/** Flatten a AkNavigationItemGroups of results into a plain array of results */
const flattenChildren = children => (
  React.Children
    .toArray(children)
    .reduce((flatArray, childGroup) => (
      flatArray.concat(React.Children.toArray(childGroup.props.children))
    ), [])
);

/**
 * Get the result ID of a result by its index in the flatResults array
 * Returns null for a failed index or if resultId is empty|undefined
 */
const getResultIdByIndex = (array, index) => (
  (array && array[index] && array[index].props && array[index].props.resultId)
);

/**
 * Find a result in the flatResults array by its ID
 * Returns the result object or null
 */
const getResultById = (array, id) => (
  array && array.find(result => result.props && (result.props.resultId === id))
  ) || null;

/**
 * Get a result's index in the flatResults array by its ID
 * Returns a numeric index or null
 */
const getResultIndexById = (array, id) => {
  if (!array) {
    return null;
  }
  const result = getResultById(array, id);
  const index = array.indexOf(result);
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
  if (currentIndex == null) {
    return adjustment > 0 ? 0 : arrayLength - 1;
  }
  // Adjust current index, wrapping around if necessary
  const adjustedIndex = (currentIndex + adjustment) % arrayLength;
  // Correct for negative indices
  return adjustedIndex >= 0 ? adjustedIndex : adjustedIndex + arrayLength;
};

export class QuickSearch extends Component {
  static propTypes = {
    /** Search results in the form of AkNavigationItemGroups containing Result components */
    children: PropTypes.node,
    /** Set search loading state */
    isLoading: PropTypes.bool,
    /** onBlur callback for search input */
    onSearchBlur: PropTypes.func,
    /** onInput callback for search input */
    onSearchInput: PropTypes.func.isRequired,
    /** onKeyDown callback for search input */
    onSearchKeyDown: PropTypes.func,
    /** Placeholder text for search input field */
    placeholder: PropTypes.string,
    /** Value of the search input field */
    value: PropTypes.string,
    /** Corresponds to the `resultId` of the selected result */
    selectedResultId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // Internal: injected by withAnalytics(). Fire a private analytics event
    firePrivateAnalyticsEvent: PropTypes.func,
  }

  static defaultProps = {
    children: [],
    firePrivateAnalyticsEvent: noOp,
    isLoading: false,
    onSearchBlur: noOp,
    onSearchKeyDown: noOp,
    placeholder: 'Search',
    value: '',
  }

  // eslint-disable-next-line react/sort-comp
  flatResults = flattenChildren(this.props.children);

  /** Select first result by default if `selectedResultId` prop is not provider */
  state = {
    selectedResultId: this.props.selectedResultId || getResultIdByIndex(this.flatResults, 0),
  }

  componentDidMount() {
    this.props.firePrivateAnalyticsEvent(`${ATLASKIT_QUICKSEARCH_NS}/open`);
  }

  componentWillUnmount() {
    this.props.firePrivateAnalyticsEvent(`${ATLASKIT_QUICKSEARCH_NS}/close`);
  }

  /** Update flatResults array whenever `children` prop changes */
  componentWillReceiveProps(nextProps) {
    if (nextProps.children) {
      this.flatResults = flattenChildren(nextProps.children);
      this.setState({
        selectedResultId: nextProps.selectedResultId || getResultIdByIndex(this.flatResults, 0),
      });
    }

    /**
     * Capture whether user needed to query in order to find their target result.
     * Only fire once per mount. Only fire when a search term is entered and the previous search
     * term was empty.
     */
    if (!this.hasSearchQueryEventFired && !this.props.value && nextProps.value) {
      this.hasSearchQueryEventFired = true;
      this.props.firePrivateAnalyticsEvent(`${ATLASKIT_QUICKSEARCH_NS}/query-entered`);
    }
  }

  /**
   * Uses the virtual list, this.flatResults, to move the selection across grouped results as if
   * results were in a single, circular list.
   *
   * Process:
   * 1. Finds the index of the selected result in the flatResults array,
   * 2. Increments or decrements this index by the supplied adjustment amount,
   * 3. Sets the new selectedResultId based on the modifed index
   */
  adjustSelectedResultIndex = (adjustment) => {
    const currentIndex = getResultIndexById(this.flatResults, this.state.selectedResultId);
    const newIndex = adjustIndex(this.flatResults.length, currentIndex, adjustment);
    this.setState({
      selectedResultId: getResultIdByIndex(this.flatResults, newIndex),
    });
  }

  /** Select next result */
  selectNext = () => { this.adjustSelectedResultIndex(+1); };

  /** Select previous result */
  selectPrevious = () => { this.adjustSelectedResultIndex(-1); };

  /**
   * Callback for mouseEnter events on individual results
   * Move selection to hovered result
   */
  handleResultMouseEnter = (resultData) => {
    this.setState({ selectedResultId: resultData && resultData.resultId });
  }

  /**
   * Callback for mouseLeave events on individual results
   * Clear result selection
   */
  handleResultMouseLeave = () => {
    this.setState({ selectedResultId: null });
  }

  /**
   * Clear result selection when search input is blurred
   */
  handleSearchBlur = () => {
    this.props.onSearchBlur();
    this.setState({ selectedResultId: null });
  }

  /**
   * Keyboard controls
   * Up - Select previous result
   * Down - Select next result
   * Enter - Submit selected result
   */
  handleSearchKeyDown = (event) => {
    const { firePrivateAnalyticsEvent } = this.props;
    this.props.onSearchKeyDown();

    // Capture whether users are using keyboard controls
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
      if (!this.hasKeyDownEventFired) {
        this.hasKeyDownEventFired = true;
        firePrivateAnalyticsEvent(`${ATLASKIT_QUICKSEARCH_NS}/keyboard-controls-used`, { key: event.key });
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault(); // Don't move cursor around in search input field
      this.selectPrevious();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault(); // Don't move cursor around in search input field
      this.selectNext();
    } else if (event.key === 'Enter' && this.state.selectedResultId) {
      event.preventDefault(); // Don't fire submit event from input
      const result = getResultById(this.flatResults, this.state.selectedResultId);

      // Capture when users are using the keyboard to submit
      if (typeof firePrivateAnalyticsEvent === 'function') {
        firePrivateAnalyticsEvent(
          `${ATLASKIT_QUICKSEARCH_NS}/submit/keyboard`,
          {
            index: this.flatResults.indexOf(result),
            total: this.flatResults.length,
            method: 'keyboard',
            type: result.props.type,
          }
        );
      }

      if (!result.props) {
        return;
      }
      if (result.props.onClick) {
        result.props.onClick({
          resultId: result.props.resultId,
          type: result.props.type,
        });
      }
      if (result.props.href) {
        window.location.assign(result.props.href);
      }
    }
  };

  /**
   * Render QuickSearch's children, attaching extra props for interactions
   */
  renderChildren() {
    /** Attach mouse interaction handlers and determine whether this result is selected */
    const renderResult = (result) => {
      const isSelected = Boolean(result.props) &&
        result.props.resultId === this.state.selectedResultId;
      return React.cloneElement(
        result,
        {
          isSelected,
          onMouseEnter: this.handleResultMouseEnter,
          onMouseLeave: this.handleResultMouseLeave,
          sendAnalytics: this.props.firePrivateAnalyticsEvent,
        }
      );
    };

    /** Process a group of results */
    const renderGroup = group => (
      React.cloneElement(
        group,
        null,
        React.Children.map(group.props.children, renderResult)
      )
    );

    return React.Children.map(this.props.children, renderGroup);
  }

  render() {
    return (
      <AkSearch
        isLoading={this.props.isLoading}
        onBlur={this.handleSearchBlur}
        onInput={this.props.onSearchInput}
        onKeyDown={this.handleSearchKeyDown}
        placeholder={this.props.placeholder}
        value={this.props.value}
      >
        {this.renderChildren()}
      </AkSearch>
    );
  }
}

export default withAnalytics(QuickSearch, {}, { analyticsId: 'atlaskit/navigation/quicksearch' });
