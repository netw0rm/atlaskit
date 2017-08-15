import React, { PureComponent } from 'react';
import Tooltip from '@atlaskit/tooltip';
import Button from '@atlaskit/button';

const POSITIONS = ['bottom', 'left', 'top', 'right'];

export default class BasicExample extends PureComponent {
  state = { position: 0 }

  changeDirection = () => this.setState(state => ({
    position: (state.position + 1) % POSITIONS.length,
  }))

  render() {
    const position = POSITIONS[this.state.position];

    return (
      <Tooltip description={position} position={position}>
        <Button onClick={this.changeDirection}>
          Click to toggle position
        </Button>
      </Tooltip>
    );
  }
}
