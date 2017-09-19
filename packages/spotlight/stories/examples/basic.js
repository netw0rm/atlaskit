import React, { Component } from 'react';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';
import Avatar from '@atlaskit/avatar';
import Button, { ButtonGroup } from '@atlaskit/button';
import Dropdown, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import LayerManager from '@atlaskit/layer-manager';

import { Pulse, Spotlight, SpotlightManager, SpotlightTarget } from '../../src';
import welcomeImage from '../assets/this-is-new-jira.png';

const Spacer = styled.div`
  margin-bottom: 16;
  margin-top: 16;
`;
const Title = styled.h5`
  margin-bottom: 8px;
`;
const dropdown = (
  <Dropdown
    appearance="tall"
    position="bottom left"
    trigger="Choices"
    triggerType="button"
  >
    <DropdownItemGroup title="Help">
      <DropdownItem>Documentation</DropdownItem>
      <DropdownItem>Learn Git</DropdownItem>
      <DropdownItem>Keyboard shortcuts</DropdownItem>
      <DropdownItem>Bitbucket tutorials</DropdownItem>
      <DropdownItem>API</DropdownItem>
      <DropdownItem>Support</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Information">
      <DropdownItem>Latest features</DropdownItem>
      <DropdownItem>Blog</DropdownItem>
      <DropdownItem>Plans & pricing</DropdownItem>
      <DropdownItem>Site status</DropdownItem>
      <DropdownItem>Version info</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Legal">
      <DropdownItem>Terms of service</DropdownItem>
      <DropdownItem>Privacy policy</DropdownItem>
    </DropdownItemGroup>
  </Dropdown>
);

class Example extends Component {
  state = { mode: null }
  setMode = (mode) => this.setState({ mode })
  startOnboarding = () => this.setMode('welcome')
  spotlightInput = () => this.setMode('dropdown')
  spotlightParagraph = () => this.setMode('parargraph')
  spotlightDropdown = () => this.setMode('avatar')
  finishOnboarding = () => this.setMode(null)
  renderMode() {
    const welcomeHeader = (
      <img
        alt="Welcome"
        src={welcomeImage}
        style={{
          height: 'auto',
          maxWidth: '100%',
        }}
      />
    );
    switch (this.state.mode) {
      // eslint-disable-next-line no-case-declarations
      case 'welcome':
        return (
          <Spotlight
            header={welcomeHeader}
            key="welcome"
          >
            <div style={{ textAlign: 'center' }}>
              <Title>Experience your new JIRA</Title>
              <p>Switch context, jump between project, and get back to work quickly with our new
                look and feel.</p>
              <p>Take it for a spin and let us know what you think.</p>
              <div style={{ paddingBottom: '1em', paddingTop: '1em' }}>
                <ButtonGroup>
                  <Button onClick={this.spotlightInput} appearance="help">
                    Switch to the new JIRA
                  </Button>
                  <Button onClick={this.spotlightInput} appearance="subtle">
                    Remind me later
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </Spotlight>
        );
      case 'dropdown':
        return (
          <Spotlight
            dialogPlacement="top left"
            key="dropdown"
            target="dropdown"
            targetBgColor="white"
            targetOnClick={console.log}
            targetRadius={3}
          >
            <Title>This is a dropdown</Title>
            <Lorem count={1} />
            <button onClick={this.spotlightParagraph}>Tell me more</button>
          </Spotlight>
        );
      case 'parargraph':
        return (
          <Spotlight
            key="parargraph"
            dialogPlacement="top center"
            target="parargraph"
            targetReplacementComponent={p => (
              <Pulse style={p}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    height: p.height,
                    width: p.width,
                  }}
                >
                  <h3>I am replacing a parargraph of text</h3>
                </div>
              </Pulse>
            )}
          >
            <Title>This is a replacement component</Title>
            <p>
              The consumer can use the <code>targetReplacementComponent</code> property to
              abort the clone operation and provide their own component.
            </p>
            <button onClick={this.spotlightInput}>Previous</button>
            <button onClick={this.spotlightDropdown}>Next</button>
          </Spotlight>
        );
      case 'avatar':
        return (
          <Spotlight
            dialogPlacement="right top"
            key="avatar"
            target="avatar"
            targetRadius={40}
          >
            <Title>This is an avatar</Title>
            <p>
              The consumer can provide a <code>targetRadius</code> property to support circles
              and rounded rectangles.
            </p>
            <button onClick={this.finishOnboarding}>I get it</button>
          </Spotlight>
        );
      default:
        return null;
    }
  }
  render() {
    const parargraphStyle = {
      background: 'papayawhip',
      margin: '2em',
      padding: '2em',
    };

    return (
      <div style={{ padding: 20, margin: '0 auto', width: 600 }}>
        <button onClick={this.startOnboarding}>Start Onboarding</button>
        <Spacer>
          <Lorem count={3} />
          <SpotlightTarget name="dropdown">
            <span style={{ display: 'inline-block' }}>
              {dropdown}
            </span>
          </SpotlightTarget>
        </Spacer>
        <Spacer style={{ textAlign: 'center' }}>
          <Lorem count={1} />
          <SpotlightTarget name="parargraph">
            <Lorem count={1} style={parargraphStyle} />
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
        <Lorem count={20} />
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
