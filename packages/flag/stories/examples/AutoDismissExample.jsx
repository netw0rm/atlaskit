import React, { PureComponent } from 'react';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';

const appearances = ['error', 'info', 'normal', 'success', 'warning'];

export default class AutoDismissExample extends PureComponent {
  state = {
    flags: [],
  };

  componentDidMount() {
    this.addFlag();
  }

  handleDismiss = () => {
    this.setState({
      flags: this.state.flags.slice(1),
    });
  }

  addFlag = () => {
    const newFlagId = this.state.flags.length + 1;
    const flags = this.state.flags.slice();
    flags.splice(0, 0, newFlagId);

    this.setState({ flags });
  }

  render() {
    return (
      <div>
        <p style={{ padding: `${akGridSizeUnitless * 2}px` }}>
          <Button
            appearance="primary"
            onClick={this.addFlag}
          >Add another Flag</Button>
        </p>
        <FlagGroup onDismissed={this.handleDismiss}>
          {this.state.flags.map(flagId => (
            <AutoDismissFlag
              appearance={appearances[flagId % appearances.length]}
              id={flagId}
              key={flagId}
              title={`Flag #${flagId}`}
              description="I will auto dismiss after 15 seconds"
            />
          ))}
        </FlagGroup>
      </div>
    );
  }
}
