// @flow

import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import LayerManager from '@atlaskit/layer-manager';
import Flag, { FlagGroup } from '../../src';
import ExamplePage from './ExamplePage';
import { AppearanceArray } from '../../src/types';

const appearanceItems = AppearanceArray.map(val => (
  { name: val, value: val, label: val, defaultSelected: val === Flag.defaultProps.appearance }
));

const color = {
  error: colors.R400,
  info: colors.N500,
  normal: colors.N0,
  success: colors.G400,
  warning: colors.Y200,
};

function getRandomDescription() {
  const descriptions = [
    'Marzipan croissant pie. Jelly beans gingerbread caramels brownie icing.',
    'Fruitcake topping wafer pie candy dragée sesame snaps cake. Cake cake cheesecake. Pie tiramisu carrot cake tart tart dessert cookie. Lemon drops cookie tootsie roll marzipan liquorice cotton candy brownie halvah.',
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export default class AnimationDemo extends PureComponent {
  createdFlagCount = 0; // eslint-disable-line react/sort-comp
  state = {
    chosenAppearance: Flag.defaultProps.appearance,
    flags: [],
  };

  componentDidMount() { this.addFlag(); }

  newFlag = (timeOffset: number = 0) => ({
    appearance: this.state.chosenAppearance,
    created: Date.now() - (timeOffset * 1000),
    description: getRandomDescription(),
    index: this.createdFlagCount++,
    title: 'Whoa a new flag',
  })

  addFlag = () => {
    const flags = this.state.flags.slice();
    flags.splice(0, 0, this.newFlag());
    this.setState({ flags });
  }

  flagDismissed = (flagId: any) => {
    action('Flag.onDismissed fired for id')(flagId);

    this.setState(state => ({ flags: state.flags.slice(1) }));
  }

  render() {
    console.log(this.state.flags.map(flag => flag.appearance));

    return (
      <LayerManager>
        <div>
          <ExamplePage>
            <div>
              <p>Add some flags then try clicking the <em>Dismiss</em> icon.</p>
              <p>When a flag is dismissed, an event should be shown in the action logger panel.</p>
              <FieldRadioGroup
                items={appearanceItems}
                label="Pick your new flag appearance:"
                onRadioChange={(e) => {
                  this.setState({ chosenAppearance: e.target.value });
                }}
              />
              <p>
                <Button
                  appearance="primary"
                  onClick={this.addFlag}
                >
                  Add another flag
                </Button>
              </p>
            </div>
          </ExamplePage>
          <FlagGroup onDismissed={this.flagDismissed}>
            {this.state.flags.map(flag => (
              <Flag
                appearance={flag.appearance}
                actions={[
                  { content: 'Nice one!', onClick: action('Nice one!') },
                  { content: 'Not right now thanks', onClick: action('Not right now thanks') },
                ]}
                description={flag.description}
                icon={<SuccessIcon
                  secondaryColor={color[flag.appearance]}
                  label="Success"
                />}
                id={flag.index}
                key={flag.index}
                title={`${flag.index}: ${flag.title}`}
              />
            )
          )}
          </FlagGroup>
        </div>
      </LayerManager>
    );
  }
}
