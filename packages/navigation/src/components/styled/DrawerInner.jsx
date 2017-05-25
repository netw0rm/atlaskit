import {
  akGridSizeUnitless,
  akColorN0,
  akColorN50A,
  akColorN500,
  akZIndexNavigation,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import {
  widths,
  widthTransition,
  transformTransition,
  boxShadowSpread,
} from '../../utils/drawer-style-variables';

const boxShadow = `${-akGridSizeUnitless * 4}px 0 ${akGridSizeUnitless * 4}px ${boxShadowSpread}px ${akColorN50A}`;

const DrawerInner = styled.div`
  background: ${akColorN0};
  box-shadow: ${({ isOpen }) => (isOpen ? boxShadow : 'none')};
  color: ${akColorN500};
  display: flex;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform: ${({ width, isOpen }) => (isOpen ? 'translateX(0)' : `translateX(${widths[width].offScreenTranslateX})`)}
  transition: ${transformTransition}, ${widthTransition};
  width: ${({ width }) => widths[width].width};
  /* needs to sit on top of navigation */
  z-index: ${akZIndexNavigation + 1};
`;

DrawerInner.displayName = 'DrawerInner';
export default DrawerInner;
