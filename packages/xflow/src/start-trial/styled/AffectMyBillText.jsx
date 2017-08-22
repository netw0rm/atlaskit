import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

// NOTE: font-size deliberately smaller than default of 14px as this is info text

const AffectMyBillText = styled.p`
  font-size: 12px;
  color: ${colors.N300};
`;

AffectMyBillText.displayName = 'AffectMyBillText';
export default AffectMyBillText;
