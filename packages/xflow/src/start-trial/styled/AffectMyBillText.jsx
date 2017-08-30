import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

// NOTE: font-size deliberately smaller than default of 14px as this is info text

const AffectMyBillText = styled.p`
  color: ${colors.N300};
  font-size: 12px;
  margin: 12px 0px;
  padding-left: ${math.multiply(gridSize, 1.75)}px;
`;

AffectMyBillText.displayName = 'AffectMyBillText';
export default AffectMyBillText;
