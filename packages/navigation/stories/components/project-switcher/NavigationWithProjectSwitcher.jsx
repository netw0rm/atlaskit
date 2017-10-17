import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled, { ThemeProvider } from 'styled-components';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ListIcon from '@atlaskit/icon/glyph/list';
import { itemThemeNamespace } from '@atlaskit/item';
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
    containerTheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
    projectSwictherProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
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
            {...this.props.projectSwictherProps}
            text="Project Switcher very long text"
            icon={<NucleusIcon label="nucleus icon" />}
            subText="Software project"
          >
            {this.props.dropdownItems}
          </BasicProjectSwitcher>
        )}
      >
        <NavigationItem
          icon={<NucleusIcon label="nucleus icon" />}
          text="Item with an icon"
          href="#2"
        />
        <DropdownWrapper>
          <AkDropdownMenu
            shouldFitContainer={this.state.isNavigationOpen}
            position={this.state.isNavigationOpen ? 'bottom left' : 'right top'}
            trigger={
              <ThemeProvider
                theme={theme => {
                  const original = theme[itemThemeNamespace];
                  if (!original || !original.padding) {
                    return theme;
                  }
                  const newTheme = JSON.parse(JSON.stringify(original));
                  newTheme.padding.default.right = 4;

                  return {
                    ...theme,
                    [itemThemeNamespace]: newTheme,
                  };
                }}
              >
                {this.state.isNavigationOpen ? (
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
                )}
              </ThemeProvider>
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
