import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

// this indent is special because the container title image is
// larger (40px) than the normal icons (24px) and we need to keep
// the text aligned correctly
const titlePadding = `0 ${gridSize * 1.5}px 0 ${gridSize * 1.5}px`;

const ContainerTitleWrapper = styled.div`
  margin-bottom: ${gridSize / 2}px;
  padding: ${titlePadding};

  ${whenCollapsed`
    padding: 0;
  `}
`;

ContainerTitleWrapper.displayName = 'ContainerTitleWrapper';
export default ContainerTitleWrapper;
