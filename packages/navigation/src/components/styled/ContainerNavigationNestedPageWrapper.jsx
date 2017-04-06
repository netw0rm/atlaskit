import styled from 'styled-components';
import {
    akGridSizeUnitless,
 } from '@atlaskit/util-shared-styles';

const ContainerNavigationNestedPageWrapper = styled.div`
  flex: 1 0 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 ${akGridSizeUnitless}px;
`;

ContainerNavigationNestedPageWrapper.displayName = ContainerNavigationNestedPageWrapper;
export default ContainerNavigationNestedPageWrapper;
