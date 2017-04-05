import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  margin-right: ${akGridSizeUnitless}px;
  
  [data-__ak-navigation-container-closed="true"] & {
    visibility: hidden;
  }
`;
