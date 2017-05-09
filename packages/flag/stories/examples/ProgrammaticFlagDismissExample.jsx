import React, { PureComponent } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';

export default class ProgrammaticFlagDismissExample extends PureComponent {
  state = {
    isFlagVisible: true,
    shouldDismiss: false,
  };

  dismissFlag = () => {
    this.setState({ shouldDismiss: true });
  }

  flagDismissed = () => {
    this.setState({ isFlagVisible: false });
  }

  render() {
    return (
      <div>
        <p style={{ padding: `${akGridSizeUnitless * 2}px` }}>
          <Button
            appearance="primary"
            onClick={this.dismissFlag}
          >Dismiss the Flag</Button>
        </p>
        <FlagGroup onDismissed={this.flagDismissed}>
          {
            this.state.isFlagVisible ? (
              <Flag
                id="1"
                title="Can I leave yet?"
                description="Dismiss me by clicking the button on the page"
                shouldDismiss={this.state.shouldDismiss}
              />
            ) : null
          }
        </FlagGroup>
      </div>
    );
  }
}
