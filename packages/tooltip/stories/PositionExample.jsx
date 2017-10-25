import React, { PureComponent } from 'react';
import Tooltip from '../src/';
import { Target } from './styled';

const positions = ['top', 'right', 'bottom', 'left'];

export default class PositionExample extends PureComponent {
  // we'll store the direction as an index and pull it from the list above,
  // just to simplify the `changeDirection` logic
  state = { position: 0 }

  changeDirection = () => {
    this.setState({
      position: (this.state.position + 1) % positions.length,
    });
  }

  render() {
    const position = positions[this.state.position];
    const { trigger } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={this.changeDirection}>
        <Tooltip description={position} position={position} trigger={trigger}>
          <Target>Click Me!</Target>
        </Tooltip>
      </div>
    );
  }
}
