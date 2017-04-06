import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const NavigationItemInner = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 ${akGridSizeUnitless}px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

NavigationItemInner.displayName = NavigationItemInner;
export default NavigationItemInner;
