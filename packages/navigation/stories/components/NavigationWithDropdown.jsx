import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import ListIcon from '@atlaskit/icon/glyph/list';
import BasicNavigation from './BasicNavigation';
import NavigationItem from '../../src/components/js/NavigationItem';

const DropdownWrapper = styled.div`padding-bottom: 4px`;

const DropdownListIcon = <ListIcon label="List" size="medium" />;

export default class NavigationWithDropdown extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    dropdownItems: PropTypes.node,
    navigationItemProps: PropTypes.shape({}),
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
      >
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
            {this.props.dropdownItems}
          </AkDropdownMenu>
        </DropdownWrapper>
        {this.props.children}
      </BasicNavigation>
    );
  }
}
