import React, { PureComponent, PropTypes } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import { ExpandIcon, ListIcon } from '@atlaskit/icon';
import BasicNavigation from './BasicNavigation';
import { AkNavigationItem } from '../../src/index';

const DropdownWrapper = styled.div`padding-bottom: 4px`;

export default class NavigationWithDropdown extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf({}).isRequired,
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
      >
        <DropdownWrapper>
          <AkDropdownMenu
            items={this.props.items}
            shouldFitContainer={this.state.isNavigationOpen}
            position={this.state.isNavigationOpen ? 'bottom left' : 'right top'}
          >
            <AkNavigationItem
              isDropdownTrigger
              icon={<ListIcon label="List" />}
              dropIcon={<ExpandIcon label="Chevron" />}
              text={this.state.isNavigationOpen ? 'Dropdown Menu' : ''}
            />
          </AkDropdownMenu>
        </DropdownWrapper>
        {this.props.children}
      </BasicNavigation>
    );
  }
}
