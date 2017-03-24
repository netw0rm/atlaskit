import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export default styled.div`
  box-sizing: border-box;
  height: ${akGridSizeUnitless * 5}px;
  position: relative;
  text-overflow: ellipsis;
  width: 100%;
`;
