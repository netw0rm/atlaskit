import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: ${akGridSizeUnitless * 2}px ${akGridSizeUnitless}px 0 ${akGridSizeUnitless}px;
  position: relative;
  width: 100%;
`;
