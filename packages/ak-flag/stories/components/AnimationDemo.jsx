import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import Button from 'ak-button';
import Flag, { FlagGroup } from '../../src';
import ExampleNavigation from './ExampleNavigation';
import GreenSuccessIcon from './GreenSuccessIcon';

const descriptions = [
  'Marzipan croissant pie. Jelly beans gingerbread caramels brownie icing.',
  'Fruitcake topping wafer pie candy dragée sesame snaps cake. Cake cake cheesecake. Pie tiramisu carrot cake tart tart dessert cookie. Lemon drops cookie tootsie roll marzipan liquorice cotton candy brownie halvah.',
];

// eslint-disable-next-line react/prefer-stateless-function
export default class AnimationDemo extends PureComponent {
  constructor() {
    super();
    this.createdFlagCount = 0;
    this.state = {
      flags: [
        this.newFlag(),
        this.newFlag(5),
      ],
    };
  }

  randomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

  newFlag = (timeOffset = 0) => ({
    title: 'Whoa a new flag',
    description: this.randomDescription(),
    created: Date.now() - (timeOffset * 1000),
    key: this.createdFlagCount++,
  })

  addFlag = () => {
    const flags = this.state.flags.slice();
    flags.splice(0, 0, this.newFlag());
    this.setState({ flags });
  }

  flagDismissed = (flagId) => {
    action(`Flag.onDismissed fired for first Flag id "${flagId}"`)();
    this.setState({
      flags: this.state.flags.slice(1),
    });
  }

  render() {
    return (
      <ExampleNavigation>
        <FlagGroup onDismissed={this.flagDismissed}>
          {
            this.state.flags.map(flag => (
              <Flag
                id={flag.key}
                key={flag.key}
                icon={<GreenSuccessIcon />}
                title={`${flag.key}: ${flag.title}`}
                description={flag.description}
                actions={[
                  { content: 'Nice one!', onClick: action('Nice one!') },
                  { content: 'Not right now thanks', onClick: action('Not right now thanks') },
                ]}
              />
            ))
          }
        </FlagGroup>
        <div>
          <p>Add some flags then try clicking the <em>Dismiss</em> icon.</p>
          <p>When a flag is dismissed, an event should be shown in the action logger panel.</p>
          <p>
            <Button
              appearance="primary"
              onClick={this.addFlag}
            >
              Add another flag
            </Button>
          </p>
        </div>
      </ExampleNavigation>
    );
  }
}
