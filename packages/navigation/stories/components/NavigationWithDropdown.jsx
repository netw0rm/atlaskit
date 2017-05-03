import React, { PureComponent, PropTypes } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import { ExpandIcon, ListIcon } from '@atlaskit/icon';
import BasicNavigation from './BasicNavigation';
import { AkNavigationItem } from '../../src/index';

const DropdownWrapper = styled.div`padding-bottom: 4px`;

export default class NavigationWithDropdown extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    dropdownProps: PropTypes.shape({}),
    navigationItemProps: PropTypes.shape({}),
  }

  state = {
    isNavigationOpen: true,
  }

  onResize = (resizeState) => {
    this.setState({ isNavigationOpen: resizeState.isOpen });
  }

  render() {
    const dropdownTriggerText = this.props.navigationItemProps.text || 'Dropdown Menu'; // eslint-disable-line react/prop-types
    return (
      <BasicNavigation
        onResizeCallback={this.onResize}
      >
        <DropdownWrapper>
          <AkDropdownMenu
            shouldFitContainer={this.state.isNavigationOpen}
            position={this.state.isNavigationOpen ? 'bottom left' : 'right top'}
            {...this.props.dropdownProps}
          >
            <AkNavigationItem
              isDropdownTrigger
              icon={<ListIcon label="List" />}
              dropIcon={<ExpandIcon label="Chevron" />}
              {...this.props.navigationItemProps}
              text={this.state.isNavigationOpen ? dropdownTriggerText : ''}
            />
          </AkDropdownMenu>
        </DropdownWrapper>
        {this.props.children}
      </BasicNavigation>
    );
  }
}
