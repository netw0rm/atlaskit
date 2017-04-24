import styled from 'styled-components';
import { containerNav } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  padding: 0 ${({ theme }) => (theme.isCollapsed ? 0 : containerNav.padding.horizontal)}px;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
