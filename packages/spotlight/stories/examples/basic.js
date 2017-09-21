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
  spotlightDropdown = () => this.setMode('dropdown')
  spotlightParagraph = () => this.setMode('parargraph')
  spotlightAvatar = () => this.setMode('avatar')
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
    const variants = {
      welcome: (
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
                <Button onClick={this.spotlightDropdown} appearance="help">
                  Switch to the new JIRA
                </Button>
                <Button onClick={this.spotlightDropdown} appearance="subtle">
                  Remind me later
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Spotlight>
      ),
      dropdown: (
        <Spotlight
          dialogPlacement="top left"
          key="dropdown"
          target="dropdown"
          targetBgColor="white"
          targetOnClick={console.log}
          targetRadius={3}
        >
          <p>
            The spotlight component uses react-dom{"'"}s <code>findDOMNode</code> so you don{"'"}t have to pass refs around.
          </p>
          <p style={{ marginBottom: '1em' }}>
            Sometimes the target inherits its background color from an ancestor, which
            can look strange once the blanket is rendered. To avoid this a consumer can
            provide a <code>targetBgColor</code> to the cloned node.
          </p>
          <Button appearance="help" onClick={this.spotlightParagraph}>
            Tell me more
          </Button>
        </Spotlight>
      ),
      parargraph: (
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
          <p style={{ marginBottom: '1em' }}>
            The consumer can use the <code>targetReplacementComponent</code> property to
            circumvent the clone operation and provide their own component.
          </p>
          <ButtonGroup>
            <Button onClick={this.spotlightDropdown} appearance="help">
              Prev
            </Button>
            <Button onClick={this.spotlightAvatar} appearance="help">
              Next
            </Button>
          </ButtonGroup>
        </Spotlight>
      ),
      avatar: (
        <Spotlight
          dialogPlacement="right top"
          key="avatar"
          target="avatar"
          targetRadius={40}
        >
          <p style={{ marginBottom: '1em' }}>
            For round targets the consumer can provide a <code>targetRadius</code> property,
            which is passed on to the wrapping element, providing support for circles and
            rounded rectangles.
          </p>
          <Button onClick={this.finishOnboarding} appearance="help">
            Got it
          </Button>
        </Spotlight>
      ),
    };

    return variants[this.state.mode];
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
