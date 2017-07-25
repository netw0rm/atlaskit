import React, { Component } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Button from '@atlaskit/button';
import { getFlagData } from './utils';

// NOTE: Temp use internal Portal until LayerManager component is implemented
import Portal from './Portal';

export default class FlagGroupExample extends Component {
  state = { flags: [] }
  flagCount = 0

  addFlag = () => {
    const flags = this.state.flags.slice();
    flags.unshift(getFlagData(this.flagCount++));
    this.setState({ flags });
  }

  dismissFlag = (flagId) => {
    console.info(`Flag "${flagId + 1}" dismissed.`);
    this.setState(state => ({ flags: state.flags.slice(1) }));
    this.flagCount--;
  }

  render() {
    const actions = [
      { content: 'Nice one!', onClick: () => console.info('"Nice one!" clicked.') },
      { content: 'Not right now thanks', onClick: this.dismissFlag },
    ];

    return (
      <div>
        <Portal>
          <FlagGroup onDismissed={this.dismissFlag}>
            {this.state.flags.map(flag => (
              <Flag actions={actions} {...flag} />
            ))}
          </FlagGroup>
        </Portal>
        <Button onClick={this.addFlag}>Add Flag</Button>
      </div>
    );
  }
}
