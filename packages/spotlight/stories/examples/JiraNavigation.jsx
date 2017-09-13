import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Lorem from 'react-lorem-component';
import BasicNavigation from '../components/BasicNavigation';
import { AkNavigationItem } from '@atlaskit/navigation';
import NucleusIcon from '../components/NucleusIcon';
import JiraProjectSwitcher from '../components/JiraProjectSwitcher';
import JiraBoardSwitcher from '../components/JiraBoardSwitcher';
import JiraSearchIcon from '../components/JiraSearchIcon';

import { Spotlight, SpotlightManager } from '../../src';

export default class JiraNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isNavigationOpen: true,
  }

  onResize = (resizeState) => {
    this.setState({ isNavigationOpen: resizeState.isOpen });
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
          <Spotlight
            dialogPlacement="right top"
            target="jira-project-switcher"
            targetRadius={4}
            targetBgColor="white"
            targetOnClick={console.log}
          >
            <h3>Spotlight title</h3>
            <Lorem />
          </Spotlight>
        </div>
      </SpotlightManager>
    );
  }
}
