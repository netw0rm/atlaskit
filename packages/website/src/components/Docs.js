import styled from 'styled-components';
import { theme } from '../../../theme';

// eslint-disable-next-line
export const CodeBlock = styled.pre`
  background-color: ${p => theme(p).colors.DN50};
  border-radius: 5px;
  margin: 14px 0;
  padding: ${p => theme(p).base.gridSize}px;
`;
