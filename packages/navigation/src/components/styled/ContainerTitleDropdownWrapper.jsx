import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const ContainerTitleDropdownWrapper = styled.div`
  padding: ${gridSize}px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  border-radius: ${gridSize / 2}px;
  max-width: 100%;
  min-width: 0;

  &:hover {
    background-color: ${({ theme }) => getProvided(theme).dropdown.hover.background};
  }

  &:focus {
    background-color: ${({ theme }) => getProvided(theme).dropdown.focus.background};
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).dropdown.active.background};
  }
`;

ContainerTitleDropdownWrapper.displayName = 'ContainerTitleDropdownWrapper';
export default ContainerTitleDropdownWrapper;
