import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const columnSizes = {
  small: 21,
  medium: 33.5,
  large: 71,
};

const spanSizes = {
  small: 21,
  medium: 28,
  large: 56,
};
const validOrDefaultSize = (size) => {
  return (size in columnSizes) ? size : 'small';
};

/**
 * Converts column sizes to gridsize multipliers required
 * @param columnSize tshirt sizing (medium/small supported)
 * @returns {number} Number representing gridsize multiplier required
 */
const columnWidth = (columnSize = 'small') => (columnSizes[validOrDefaultSize(columnSize)]);

/**
 * Converts column sizes to gridsize multipliers required
 * @param columnSize tshirt sizing (medium/small supported)
 * @returns {number} Number representing gridsize multiplier required
 */
const spanWidth = (columnSize = 'small') => (spanSizes[validOrDefaultSize(columnSize)]);

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
