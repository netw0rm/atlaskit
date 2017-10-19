import React, { PureComponent } from 'react';
import Tooltip from '../src/';
import { Target } from './styled';

const VALID_PLACEMENTS = ['top', 'right', 'bottom', 'left'];

export default class PositionExample extends PureComponent {
  // we'll store the direction as an index and pull it from the list above,
  // just to simplify the `changeDirection` logic
  state = { placement: 0 }

  changeDirection = () => {
    this.setState({
      placement: (this.state.placement + 1) % VALID_PLACEMENTS.length,
    });
  }

  render() {
    const placement = VALID_PLACEMENTS[this.state.placement];

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={this.changeDirection}>
        <Tooltip content={placement} placement={placement}>
          <Target color={this.props.color}>Target</Target>
        </Tooltip>
      </div>
    );
  }
}
