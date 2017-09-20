import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import BasicNavigation from '../components/BasicNavigation';
import { AkNavigationItem } from '@atlaskit/navigation';
import NucleusIcon from '../components/NucleusIcon';
import JiraProjectSwitcher from '../components/JiraProjectSwitcher';
import JiraBoardSwitcher from '../components/JiraBoardSwitcher';
import JiraSearchIcon from '../components/JiraSearchIcon';
import Button from '@atlaskit/button';
import Config from './config';

import { Spotlight, SpotlightManager } from '../../src';

export default class JiraNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isNavigationOpen: true,
    currentStep: 'welcome',
  }

  onResize = (resizeState) => {
    this.setState({ isNavigationOpen: resizeState.isOpen });
  }

  createSpotlight = () => {
    const stepData = Config[this.state.currentStep];
    if (!stepData) return null;

    return (
      <Spotlight key={this.state.currentStep} {...stepData.spotlightConfig}>
        {stepData.spotlightContent}
        {
          stepData.spotlightConfig.targetOnClick ? null :
          <Button appearance="help" onClick={() => this.moveNextStep(stepData.nextStep)}>
            Next
          </Button>
        }

      </Spotlight>
    );
  }

  moveNextStep = (nextStep) => {
    this.setState({
      currentStep: nextStep,
    });
  }

  render() {
    return (
      <SpotlightManager>
        <div>
          <BasicNavigation
            onResizeCallback={this.onResize}
            containerHeaderComponent={() => <JiraProjectSwitcher />}
            globalSearchIcon={<JiraSearchIcon />}
          >
            <JiraBoardSwitcher isNavigationOpen={this.state.isNavigationOpen} />
            <AkNavigationItem
              icon={<NucleusIcon />}
              text="Item with an icon"
              href="#2"
            />
            {this.props.children}
          </BasicNavigation>
          {this.createSpotlight()}
        </div>
      </SpotlightManager>
    );
  }
}
