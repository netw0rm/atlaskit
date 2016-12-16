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
    this.state = {
      flags: [
        this.newFlag(),
        this.newFlag(5),
      ],
      now: Date.now(),
    };
  }

  componentDidMount() {
    this.nowInterval = setInterval(() => {
      this.setState({
        now: Date.now(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.nowInterval);
  }

  randomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

  newFlag = (timeOffset = 0) => ({
    title: 'Whoa a new flag',
    description: this.randomDescription(),
    created: Date.now() - (timeOffset * 1000),
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
            this.state.flags.map((flag, idx) => (
              <Flag
                id={flag.created}
                key={idx}
                icon={<GreenSuccessIcon />}
                title={flag.title}
                description={`Created ${Math.ceil((now - flag.created) / 1000)} seconds ago. ${flag.description}`}
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
