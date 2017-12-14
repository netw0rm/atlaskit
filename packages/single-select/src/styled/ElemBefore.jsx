import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const ElemBefore = styled.div`
  display: flex;
  padding-right: ${gridSize}px;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
  order: ${({ isHidden }) => (isHidden ? 1 : 0)};
`;

ElemBefore.displayName = 'TriggerElemBefore';

export default ElemBefore;
