import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const NothingWasFoundElement = styled.div`
  padding: 6px ${gridSize() * 3}px;
`;

NothingWasFoundElement.displayName = 'NothingWasFoundElement';

export default NothingWasFoundElement;
