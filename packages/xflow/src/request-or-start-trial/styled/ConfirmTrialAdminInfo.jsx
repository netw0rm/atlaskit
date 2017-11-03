import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

/**
 * Converts column sizes to gridsize multipliers required
 * @param columnSize tshirt sizing (medium/small supported)
 * @returns {number} Number representing gridsize multiplier required
 */
const columnWidth = columnSize => (columnSize === 'medium'
    ? 33.5
    : 21);

const ConfirmTrialAdminInfo = styled.div`
  width: ${props => math.multiply(gridSize, columnWidth(props.columnSize))}px;
  text-align: center;
  line-height: 1.33;
  font-size:12px;
  color: ${colors.N200};
  float: left;
  position: relative;
  margin: ${math.multiply(gridSize, 2)}px;
`;

ConfirmTrialAdminInfo.displayName = 'ConfirmTrialAdminInfo';
export default ConfirmTrialAdminInfo;
