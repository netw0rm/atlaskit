// @flow

import { action } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import LayerManager from '@atlaskit/layer-manager';

import Flag, { FlagGroup } from '../../src';
import ExamplePage from '../components/ExamplePage';
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

type State = {
  useLayerManager: boolean;
  flags: any[],
  chosenAppearance: any
}

export default class FlagWithinPage extends PureComponent<{}, State> {
  createdFlagCount = 0; // eslint-disable-line react/sort-comp
  state = {
    chosenAppearance: Flag.defaultProps.appearance,
    flags: [],
    useLayerManager: true,
  };

  componentDidMount() { this.addFlag(); }

  newFlag = (timeOffset: number = 0) => ({
    appearance: this.state.chosenAppearance,
    created: Date.now() - (timeOffset * 1000),
    description: 'Test description',
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

  toggleLayerManager = () => {
    this.setState({
      useLayerManager: !this.state.useLayerManager,
    });
  }

  render() {
    console.log(this.state.flags.map(flag => flag.appearance));

    const { useLayerManager } = this.state;

    const Wrapper = useLayerManager ? LayerManager : 'div';

    return (
      <Wrapper>
        <ExamplePage>
          <div>
            <p>Flags are rendered to the Layer Manager ancestor component if one exists.</p>
            <p>Flags are appended to the body when no ancestor Layer Manager exists.</p>
            <p>
              <Button appearance="primary" onClick={this.toggleLayerManager}>Toggle Layer Manager</Button>
            </p>
            <p>Layer Manager status: <b>{ useLayerManager ? 'Exists' : 'Does not exist' }</b></p>
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
        </ExamplePage>
      </Wrapper>
    );
  }
}
