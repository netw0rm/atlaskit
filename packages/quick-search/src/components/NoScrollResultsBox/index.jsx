import React, { PropTypes, PureComponent } from 'react';
import { Result } from '../Result';

export default class NoScrollResultsBox extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.instanceOf(Result)),
    minItems: PropTypes.number,
  }

  static defaultProps = {
    minItems: 3,
  }

  itemsTheresSpaceFor = () => {
    const availableGridUnits = parseInt(this.props.height / 8, 10);
    const gridUnitsPerItem = 4.5;
    return parseInt(availableGridUnits / gridUnitsPerItem, 10);
  }

  render = () => (
    <div>
      {
        this.props.results
        && this.props.results.length
        && this.props.results.slice(0, Math.max(this.props.minItems, this.itemsTheresSpaceFor()))
      }
    </div>
  );
}
