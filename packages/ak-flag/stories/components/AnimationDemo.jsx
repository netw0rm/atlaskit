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
        this.newFlag(5),
        this.newFlag(),
      ].reverse(),
      now: Date.now(),
    };
  }

  componentDidMount() {
    this.nowInterval = setInterval(() => {
      this.setState({
        now: Date.now(),
      });
    }, 1000);

    this.addFlagInterval = setInterval(this.addFlag, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.nowInterval);
    clearInterval(this.addFlagInterval);
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

  flagDismissed = () => {
    action('Flag.onDismissed fired for first Flag')();
    this.setState({
      flags: this.state.flags.slice(1),
    });
  }

  render() {
    const { now } = this.state;
    return (
      <ExampleNavigation>
        <FlagGroup onDismissed={this.flagDismissed}>
          {
            this.state.flags.map(flag => (
              <Flag
                id={flag.created}
                key={flag.key}
                icon={<GreenSuccessIcon />}
                title={`${flag.key}: ${flag.title}`}
                description={`Created ${Math.ceil((now - flag.created) / 1000)} seconds ago. ${flag.description}`}
              />
            ))
          }
        </FlagGroup>
        <p>
          A new flag will be added every 10 seconds.
          Try clicking the <em>dismiss</em> icon on a flag to remove it.
        </p>
        <div>
          <Button
            appearance="primary"
            onClick={this.addFlag}
          >
            Add another flag
          </Button>
        </div>
      </ExampleNavigation>
    );
  }
}
