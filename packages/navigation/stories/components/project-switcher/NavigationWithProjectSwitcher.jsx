import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ListIcon from '@atlaskit/icon/glyph/list';
import BasicNavigation from '../BasicNavigation';
import NavigationItem from '../../../src/components/js/NavigationItem';
import BasicProjectSwitcher from './BasicProjectSwitcher';
import NucleusIcon from '../../components/NucleusIcon';

const DropdownWrapper = styled.div`padding-bottom: 4px`;
const DropdownListIcon = <ListIcon label="List" size="medium" />;

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
            text="Project Switcher very long text"
            icon={<NucleusIcon />}
            subText="Software project"
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
        <DropdownWrapper>
          <AkDropdownMenu
            shouldFitContainer={this.state.isNavigationOpen}
            position={this.state.isNavigationOpen ? 'bottom left' : 'right top'}
            trigger={
              this.state.isNavigationOpen ? (
                <NavigationItem
                  isDropdownTrigger
                  icon={DropdownListIcon}
                  dropIcon={<ExpandIcon label="Chevron" size="medium" />}
                  {...this.props.navigationItemProps}
                  text="Dropdown menu"
                />
              ) : (
                <NavigationItem
                  isDropdownTrigger
                  text={DropdownListIcon}
                  {...this.props.navigationItemProps}
                />
              )
            }
          >
            <NavigationItem
              text="Test page 1"
              icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
            />
            <NavigationItem
              text="Test page 3"
              icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
            />
            <NavigationItem
              text="Test page 4"
              icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
            />
          </AkDropdownMenu>
        </DropdownWrapper>
        {this.props.children}
      </BasicNavigation>
    );
  }
}
