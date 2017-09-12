import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import BasicNavigation from '../components/BasicNavigation';
import { AkNavigationItem } from '@atlaskit/navigation';
import NucleusIcon from '../components/NucleusIcon';
import JiraProjectSwitcher from '../components/JiraProjectSwitcher';
import JiraBoardSwitcher from '../components/JiraBoardSwitcher';
import JiraSearchIcon from '../components/JiraSearchIcon';

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
    );
  }
}
