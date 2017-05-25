import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { getIsCollapsed } from '../../theme/util';

const ContainerNavigationChildren = styled.div`
  padding: 0 ${({ theme }) => (getIsCollapsed(theme) ? 0 : layout.padding.side)}px;
`;

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';

export default ContainerNavigationChildren;
