import React, { Component } from 'react';
import Lorem from 'react-lorem-component';
import Button from '@atlaskit/button';

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
          <Spotlight target="input" appearance="purple" onClick={console.log}>
            <div>This is an input</div>
            <button onClick={this.spotlightButton}>Tell me more</button>
          </Spotlight>
        );
      case 'button':
        return (
          <Spotlight target="button" position="top center" radius={4}>
            <div>This is a button</div>
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
        <br />
        <button onClick={this.startOnboarding}>Start Onboarding</button>
        {this.renderMode()}
      </div>
    );
  }
}

export default () => (
  <SpotlightManager>
    <Example />
  </SpotlightManager>
);
