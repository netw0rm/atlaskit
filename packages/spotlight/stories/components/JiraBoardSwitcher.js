import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import styled from 'styled-components';
import { AkNavigationItem } from '@atlaskit/navigation';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import ListIcon from '@atlaskit/icon/glyph/list';

const DropdownWrapper = styled.div`padding-bottom: 4px`;
const DropdownListIcon = <ListIcon label="List" size="medium" />;

export default class JiraBoardSwitcher extends PureComponent {
  static propTypes = {
    isNavigationOpen: PropTypes.bool,
  }

  static defaultProps = {
    isNavigationOpen: true,
  }

  render() {
    return (
      <DropdownWrapper>
        <AkDropdownMenu
          shouldFitContainer={this.props.isNavigationOpen}
          position={this.props.isNavigationOpen ? 'bottom left' : 'right top'}
          trigger={
            this.props.isNavigationOpen ? (
              <AkNavigationItem
                isDropdownTrigger
                icon={DropdownListIcon}
                dropIcon={<ExpandIcon label="Chevron" size="medium" />}
                text="Dropdown menu"
              />
            ) : (
              <AkNavigationItem
                isDropdownTrigger
                text={DropdownListIcon}
              />
            )
          }
        >
          <AkNavigationItem
            text="Test page 1"
            icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          />
          <AkNavigationItem
            text="Test page 3"
            icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          />
          <AkNavigationItem
            text="Test page 4"
            icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          />
        </AkDropdownMenu>
      </DropdownWrapper>
    );
  }
}
