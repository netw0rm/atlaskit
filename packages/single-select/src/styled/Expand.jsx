import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const Expand = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 ${gridSize() * 3}px;
  justify-content: center;
  margin: 0px ${gridSize}px;
`;

Expand.displayName = 'SingleSelectExpand';

export default Expand;
