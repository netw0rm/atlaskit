import styled from 'styled-components';
import { containerNav } from '../../shared-variables';

const ContainerNoHeader = styled.div`
  height: ${containerNav.padding.vertical}px;
`;

ContainerNoHeader.displayName = 'ContainerNoHeader';

export default ContainerNoHeader;
