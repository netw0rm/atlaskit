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

/**
 * Converts column sizes to gridsize multipliers required
 * @param columnSize tshirt sizing (medium/small supported)
 * @returns {number} Number representing gridsize multiplier required
 */
const spanWidth = columnSize => (columnSize === 'medium'
  ? 28
  : 21);

const ConfirmTrialAdminInfo = styled.div`
  @media all and (max-width: 800px) {
    margin: 0px ${math.multiply(gridSize, 2)}px;
    width: ${math.multiply(gridSize, 33.5)}px;
    
    span {
      padding-left: ${math.multiply(gridSize, 4)}px;
    }
  }
  
  width: ${props => math.multiply(gridSize, columnWidth(props.columnSize))}px;
  text-align: center;
  line-height: 1.33;
  font-size:12px;
  color: ${colors.N200};
  margin: ${math.multiply(gridSize, 2)}px;
  display: inline-block;
  
  span {
      display: block;
      width: ${props => math.multiply(gridSize, spanWidth(props.columnSize))}px;
      margin: auto;
  }
  
  a {
    text-decoration: none;
    
    &:focus {
      outline: 0;
    }
    
    span {
      display: inherit;
      padding: 0px;
      color: ${colors.N200};
      font-weight: bold;
    }
  }
`;

ConfirmTrialAdminInfo.displayName = 'ConfirmTrialAdminInfo';
export default ConfirmTrialAdminInfo;
