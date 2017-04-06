import styled from 'styled-components';
import {
    akGridSizeUnitless,
    akColorN40A,
 } from '@atlaskit/util-shared-styles';

const NavigationItemGroupHeader = styled.div`
  display: flex;
  margin-bottom: ${akGridSizeUnitless}px;
  margin-left: ${akGridSizeUnitless}px;
  margin-top: ${akGridSizeUnitless * 2}px;

  [data-__ak-navigation-container-closed="true"] & {
    margin-left: ${akGridSizeUnitless * 0.5}px;
    margin-right: ${akGridSizeUnitless * 0.5}px;
    border-top: 1px solid ${akColorN40A};
  }
`;

NavigationItemGroupHeader.displayName = 'NavigationItemGroupHeader';
export default NavigationItemGroupHeader;
