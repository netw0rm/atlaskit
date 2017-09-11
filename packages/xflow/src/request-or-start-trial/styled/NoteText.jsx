import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const NoteText = styled.textarea`
  background-color: rgba(9, 30, 66, 0.02);
  border: solid 1px #ebedf0;
  border-radius: 3px;
  font-size: 14px;
  height: 100px;
  line-height: 1.43;
  margin-top: ${math.multiply(gridSize, 1.5)}px;
  max-height: 66px;
  max-width: 324px;
  padding: 12px 28px 32px 12px;
  width: 100%;
`;

NoteText.displayName = 'NoteText';
export default NoteText;
