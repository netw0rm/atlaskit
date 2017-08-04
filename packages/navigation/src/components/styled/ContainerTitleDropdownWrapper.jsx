import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided, isCollapsed } from '../../theme/util';
import { focusOutline } from '../../utils/mixins';

// Because ContainerTitle has a special padding 0 12px 0 12px
// so we need to re-adjust to make the hover style aligment
const getPadding = ({ theme }) => {
  if (isCollapsed(theme)) {
    return `${gridSize / 2}px ${gridSize / 2}px 0`;
  }

  return `${gridSize}px ${gridSize}px ${gridSize / 2}px 0`;
};

const ContainerTitleDropdownWrapper = styled.div`
  padding: ${getPadding};
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
    ${focusOutline(({ theme }) => getProvided(theme).dropdown.focus.outline)};
    background-color: ${({ theme }) => getProvided(theme).dropdown.focus.background};
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).dropdown.active.background};
  }
`;

ContainerTitleDropdownWrapper.displayName = 'ContainerTitleDropdownWrapper';
export default ContainerTitleDropdownWrapper;
