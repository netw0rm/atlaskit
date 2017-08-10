import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';

const ContainerTitleDropdownIcon = styled.div`
  align-self: center;

  ${whenCollapsed`
    display: none;
  `}
`;

ContainerTitleDropdownIcon.displayName = 'ContainerTitleDropdownIcon';
export default ContainerTitleDropdownIcon;
