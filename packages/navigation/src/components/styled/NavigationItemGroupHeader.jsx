import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided, whenCollapsed } from '../../theme/util';

const NavigationItemGroupHeader = styled.div`
  display: flex;
  margin-left: -${gridSize}px;
  margin-top: ${gridSize}px;

  ${whenCollapsed`
    margin-left: -${gridSize}px;
    margin-right: -${gridSize}px;
    margin-bottom: ${gridSize}px;
    border-top: 1px solid ${({ theme }) => getProvided(theme).keyline};
  `}
`;

NavigationItemGroupHeader.displayName = 'NavigationItemGroupHeader';
export default NavigationItemGroupHeader;
