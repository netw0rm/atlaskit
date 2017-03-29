import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
  margin-left: ${akGridSizeUnitless}px;
  width: 100%;
  min-width: 0;

  [data-__ak-navigation-container-closed="true"] & {
    display: none;
  }
`;
