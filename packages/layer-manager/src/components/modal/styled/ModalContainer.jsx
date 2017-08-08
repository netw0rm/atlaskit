import styled from 'styled-components';
import { akColorN0, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  background-color: ${akColorN0};
  border-radius: ${akGridSizeUnitless / 2}px;
  display: flex;
  flex-direction: column;
  max-height: inherit;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 1px rgba(0, 0, 0, 0.1), 0 0 20px -6px rgba(0, 0, 0, 0.3);
`;
