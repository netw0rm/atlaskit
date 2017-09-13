import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import LayerManager from '@atlaskit/layer-manager';

import {
  Spotlight,
  SpotlightManager,
  SpotlightTarget,
} from '../../src';

const Spacer = ({ style, ...props }) => (
  <div style={{ marginBottom: 16, marginTop: 16, ...style }} {...props} />
);

class Example extends Component {
  state = { mode: null }
  setMode = (mode) => this.setState({ mode })
  startOnboarding = () => this.setMode('welcome')
  spotlightInput = () => this.setMode('input')
  spotlightButton = () => this.setMode('button')
  spotlightDropdown = () => this.setMode('avatar')
  finishOnboarding = () => this.setMode(null)
  renderMode() {
    switch (this.state.mode) {
      // eslint-disable-next-line no-case-declarations
      case 'welcome':
        return (
          <Spotlight>
            <h3>Experience you new Jira</h3>
            <Lorem count={1} />
            <button onClick={this.spotlightInput}>Continue</button>
          </Spotlight>
        );
      case 'input':
        return (
          <Spotlight target="input" dialogAppearance="purple" targetOnClick={console.log} dialogWidth="small">
            <h4>This is an input</h4>
            <Lorem count={1} />
            <button onClick={this.spotlightButton}>Tell me more</button>
          </Spotlight>
        );
      case 'button':
        return (
          <Spotlight target="button" dialogPlacement="top center" targetRadius={4}>
            <h4>This is a button</h4>
            <Lorem count={1} />
            <button onClick={this.spotlightInput}>Previous</button>
            <button onClick={this.spotlightDropdown}>Next</button>
          </Spotlight>
        );
      case 'avatar':
        return (
          <Spotlight target="avatar" dialogPlacement="left top" targetRadius={40}>
            <h4>This is a avatar</h4>
            <Lorem count={1} />
            <button onClick={this.finishOnboarding}>I get it</button>
          </Spotlight>
        );
      default:
        return null;
    }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Spacer>
          <Lorem count={1} />
          <SpotlightTarget name="input">
            <input
              type="text"
              defaultValue="abcd 1234"
            />
          </SpotlightTarget>
        </Spacer>
        <Spacer style={{ textAlign: 'center' }}>
          <Lorem count={1} />
          <SpotlightTarget name="button">
            <Button appearance="primary">Button</Button>
          </SpotlightTarget>
        </Spacer>
        <Spacer style={{ flexDirection: 'column', display: 'flex', alignItems: 'flex-end' }}>
          <Lorem count={1} />
          <div>
            <SpotlightTarget name="avatar">
              <Avatar
                src="https://pbs.twimg.com/profile_images/441404933183520768/yYSTbI10_400x400.png"
              />
            </SpotlightTarget>
          </div>
        </Spacer>
        <br />
        <button onClick={this.startOnboarding}>Start Onboarding</button>
        {this.renderMode()}
      </div>
    );
  }
}

export default () => (
  <LayerManager>
    <SpotlightManager>
      <Example />
    </SpotlightManager>
  </LayerManager>
);
