import React from 'react';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { akColorN50, akColorN20A, akColorN40A, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const TriggerDiv = styled.div`
  border: 1px solid ${akColorN50};
  padding: ${akGridSizeUnitless}px;

  &:hover {
    background-color: ${akColorN20A};
  }

  &:active {
    background-color: ${akColorN40A};
  }
`;

export default () => (
  <DropdownMenu
    shouldFitContainer
    trigger={
      <TriggerDiv>This is the trigger</TriggerDiv>
    }
  >
    <DropdownItemGroup>
      <DropdownItem>Status project</DropdownItem>
      <DropdownItem>Move to done</DropdownItem>
      <DropdownItem>View workflow</DropdownItem>
    </DropdownItemGroup>
  </DropdownMenu>
);
