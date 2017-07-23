import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const ContainerNavigationInner = styled.div`
  background-color: ${({ theme }) => {
    const background = getProvided(theme).background;
    if (background.secondary) {
      return background.secondary;
    }

    return background.primary;
  }};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  flex-direction: column;
  padding-top: ${layout.padding.top}px;
  /* fill the entire space of the flex container */
  width: 100%;
`;

ContainerNavigationInner.displayName = 'ContainerNavigationInner';

export default ContainerNavigationInner;
