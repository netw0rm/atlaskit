import styled from 'styled-components';
import { layout } from '../../shared-variables';

const ContainerNavigationChildren = styled.div`
  padding: 0 ${({ theme }) => (theme.isCollapsed ? 0 : layout.padding.side)}px;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
