import styled from 'styled-components';
import { layout } from '../../shared-variables';

export const ContentArea = styled.div`
transition: margin-top 220ms;
margin-top: ${props => (props.isFullWidth ? 0 : props.iconOffset - 16)}px;
`;

const DrawerContent = styled.div`
  box-sizing: border-box;
  padding: 0 ${layout.padding.side}px;
  width: 100%;
`;

DrawerContent.displayName = 'DrawerContent';
export default DrawerContent;
