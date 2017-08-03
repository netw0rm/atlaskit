import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import BasicNavigation from '../BasicNavigation';
import NavigationItem from '../../../src/components/js/NavigationItem';
import BasicProjectSwitcher from './BasicProjectSwitcher';
import NucleusIcon from '../../components/NucleusIcon';

export default class NavigationWithProjectSwitcher extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    dropdownItems: PropTypes.node,
    containerTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
        containerTheme={this.props.containerTheme}
        onResizeCallback={this.onResize}
        containerHeaderComponent={() => (
          <BasicProjectSwitcher
            shouldFitContainer={this.state.isNavigationOpen}
            position={this.state.isNavigationOpen ? 'bottom left' : 'right top'}
          >
            {this.props.dropdownItems}
          </BasicProjectSwitcher>
        )}
      >
        <NavigationItem
          icon={<NucleusIcon />}
          text="Item with an icon"
          href="#2"
        />
        {this.props.children}
      </BasicNavigation>
    );
  }
}
