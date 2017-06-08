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
const resultPropType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(availableResultTypes)),
});

const resultGroupPropType = PropTypes.shape({
  items: PropTypes.arrayOf(PropTypes.shape(resultPropType)),
  title: PropTypes.string.isRequired,
});

export default class SearchResults extends PureComponent {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape(resultGroupPropType)),
  }

  static defaultProps = {
    results: [],
  }

  renderResultItem = ({ type, id, ...props }) => {
    const Result = availableResultTypes[type];
    return Result ? <Result key={id} {...props} /> : null;
  }

  renderResultGroup = group => (
    <AkNavigationItemGroup key={group.title} title={group.title}>
      {group.items.map(this.renderResultItem)}
    </AkNavigationItemGroup>
  );

  render() {
    return (
      <div>
        {this.props.results.map(this.renderResultGroup)}
      </div>
    );
  }
}
