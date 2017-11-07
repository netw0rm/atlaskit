import React, { PureComponent } from 'react';
import styled from 'styled-components';
import AkDropdown, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Avatar from '@atlaskit/avatar';

export default class SiteSelectorMenu extends PureComponent {
  render() {
    const SiteSelectorContainer = styled.div`
      border: 1px solid #4A79BE;
      border-radius: 5px;
      width: 34px;
      height: 34px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      background-color: #0747A6;
      
      button {
        height: 34px;
        width: 34px;
      }
      
      &:hover {
        background-color: #1E3B7C;
      }
      
      .dropdown-site-name {
        margin-left: 5px;
      }
    `;

    return (
      <SiteSelectorContainer>
        <AkDropdown
          position="right bottom"
          triggerType="button"
          triggerButtonProps={{
            className: 'site-selector-dropdown-trigger',
            iconBefore: <MoreIcon label="" primaryColor="white" />,
          }}
        >
          <DropdownItemGroup title="Teams">
            <DropdownItem
              key="1"
              elemBefore={
                <Avatar
                  appearance="square"
                  name="Site Four"
                  enableTooltip={false}
                />
              }
            >
              <span className="dropdown-site-name">Site Four</span>
            </DropdownItem>
            <DropdownItem
              key="2"
              elemBefore={
                <Avatar
                  appearance="square"
                  name="Site Five"
                  enableTooltip={false}
                />
              }
            >
              <span className="dropdown-site-name">Site Five</span>
            </DropdownItem>
          </DropdownItemGroup>
        </AkDropdown>
      </SiteSelectorContainer>
    );
  }
}
