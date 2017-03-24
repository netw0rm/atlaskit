import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: ${akGridSizeUnitless}px;
  top: 0;

  [data-__ak-navigation-container-closed="true"] & {
    opacity: 0;
  }
`;
