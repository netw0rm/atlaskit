import styled from 'styled-components';
import { container } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  padding: 0 ${({ theme }) => (theme.isCollapsed ? 0 : container.padding.side)}px;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
