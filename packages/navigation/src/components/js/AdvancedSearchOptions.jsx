import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AkSearchResults } from '../../../src';

const noOp = () => {};

export default class AdvancedSearchOptions extends PureComponent {
  static propTypes = {
    isResultHoverStylesDisabled: PropTypes.bool,
    onResultMouseEnter: PropTypes.func,
    onResultMouseLeave: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        onClick: PropTypes.func.isRequired,
        icon: PropTypes.node,
        name: PropTypes.string.isRequired,
      })
    ),
    selectedItemId: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    isResultHoverStylesDisabled: false,
    onResultMouseEnter: noOp,
    onResultMouseLeave: noOp,
    options: [],
    title: 'Expand your search to',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options) {
      this.optionsAsSearchResults = this.formatOptionsToSearchResults(nextProps.options);
    }
  }

  formatOptionsToSearchResults = () => (
    [{
      title: this.props.title,
      items: this.props.options.map(option => ({
        resultId: option.resultId,
        type: 'advancedSearchOption',
        text: option.name,
        onClick: option.onClick,
        icon: option.icon,
      })),
    }]
  );

  optionsAsSearchResults = this.formatOptionsToSearchResults(this.props.options);

  render() {
    return (
      <AkSearchResults
        isResultHoverStylesDisabled={this.props.isResultHoverStylesDisabled}
        onResultMouseEnter={this.props.onResultMouseEnter}
        onResultMouseLeave={this.props.onResultMouseLeave}
        results={this.optionsAsSearchResults}
        selectedItemId={this.props.selectedItemId}
      />
    );
  }
}
