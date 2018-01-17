import styled from 'styled-components';

import { borderRadius, colors, fontSize } from '@atlaskit/theme';

const HEIGHT_OF_40_PX_WITH_PADDING = 40;
const WIDTH_OF_368_PX_WITH_PADDING = 328;

const NoteText = styled.textarea`
  background-color: ${colors.N10};
  border: solid 1px ${colors.N30};
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  font-family: inherit;
  height: 100px;
  line-height: 1.43;
  max-height: ${HEIGHT_OF_40_PX_WITH_PADDING}px;
  max-width: ${WIDTH_OF_368_PX_WITH_PADDING}px;
  padding: 12px 28px 32px 12px;
  width: 100%;
`;

NoteText.displayName = 'NoteText';
export default NoteText;
