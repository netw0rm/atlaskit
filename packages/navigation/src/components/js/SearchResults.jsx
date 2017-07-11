import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PersonResult, RoomResult } from './results';
import { AkNavigationItemGroup } from '../../../src';

/**
 * Enumerate the result types available to SearchResults
 */
const availableResultTypes = {
  person: PersonResult,
  room: RoomResult,
};

/**
 * From the perspective of SearchResults, result items consist only of a unique id and result type
 */
const resultPropType = {
  id: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(availableResultTypes)),
};

export const resultGroupPropType = {
  items: PropTypes.arrayOf(PropTypes.shape(resultPropType)),
  title: PropTypes.string,
};

export default class SearchResults extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    results: PropTypes.arrayOf(PropTypes.shape(resultGroupPropType)),
    selectedItemId: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
    results: [],
    selectedItemId: null,
  }

  renderResultItem = (props) => {
    const Result = availableResultTypes[props.type];
    const isSelected = props.id === this.props.selectedItemId;
    return Result ? (
      <Result
        {...props}
        key={props.id}
        isSelected={isSelected}
        onClick={this.props.onClick}
      />
     ) : null;
  }

  renderResultGroup = (group, index) => (
    group.items && group.items.length > 0 ? (
      <AkNavigationItemGroup key={group.title || index} title={group.title}>
        {group.items.map(this.renderResultItem)}
      </AkNavigationItemGroup>
    ) : null
  );

  render() {
    return (
      <div>
        {this.props.results.map(this.renderResultGroup)}
      </div>
    );
  }
}
