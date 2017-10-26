import styled, { keyframes } from 'styled-components';
import {
  widths,
  widthTransition,
  animationTiming,
  animationSpeed,
} from '../../utils/drawer-style-variables';
import { getProvided } from '../../theme/util';
import { zIndex } from '../../shared-variables';

const entryAnimation = keyframes`
  from { transform: translateX(${props => widths[props.width].offScreenTranslateX}); }
  to { transform: translateX(0); }
`;

const exitAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(${props => widths[props.width].offScreenTranslateX}); }
`;

const DrawerInner = styled.div`
  animation: ${props => (props.isOpen ? entryAnimation : exitAnimation)} ${animationSpeed} ${animationTiming};
  animation-fill-mode: forwards;
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform: translateX(${props => widths[props.width].offScreenTranslateX});
  transition: ${widthTransition};
  width: ${({ width }) => widths[width].width};
  z-index: ${zIndex.drawer};
`;

DrawerInner.displayName = 'DrawerInner';
export default DrawerInner;
