import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import Button from 'ak-button';
import Flag, { FlagGroup } from '../../src';
import ExampleNavigation from './ExampleNavigation';
import GreenSuccessIcon from './GreenSuccessIcon';

// eslint-disable-next-line react/prefer-stateless-function
export default class AnimationDemo extends PureComponent {
  constructor() {
    super();
    this.state = {
      flags: [],
    };
  }

  addFlag = () => {
    const flags = this.state.flags.slice();
    flags.push({
      id: Date.now(),
      title: 'Whoa a new flag',
      description: 'Check it out it is a flag that flies in from the left!',
    });

    this.setState({ flags });
  }

  flagDismissed = (removedFlagId) => {
    action(`Flag.onDismissed fired for Flag.id '${removedFlagId}'`)();
    this.setState({
      flags: this.state.flags.filter(flag => flag.id !== removedFlagId),
    });
  }

  render() {
    return (
      <ExampleNavigation>
        <FlagGroup>
          {
            this.state.flags.map(flag => (
              <Flag
                id={flag.id}
                key={flag.id}
                icon={<GreenSuccessIcon />}
                title={flag.title}
                description={flag.description}
                onDismissed={this.flagDismissed}
              />
            ))
          }
        </FlagGroup>
        <p>
          Click the <em>Add another flag</em> button, then click the dismiss icon on the
          flag that appears.
        </p>
        <Button
          appearance="primary"
          onClick={this.addFlag}
        >
          Add another flag
        </Button>
      </ExampleNavigation>
    );
  }
}
