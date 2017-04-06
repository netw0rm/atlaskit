import {
  akGridSizeUnitless,
  akColorN0,
  akColorN500,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import {
  widths,
  widthTransition,
  transformTransition,
  boxShadowSpread,
} from '../../utils/drawer-style-variables';

const boxShadow = `${-akGridSizeUnitless * 4}px 0 ${akGridSizeUnitless * 4}px ${boxShadowSpread}px rgba(23,43,77,0.24)`;
export default styled.div`
  background: ${akColorN0};
  box-shadow: ${({ isOpen }) => (isOpen ? boxShadow : 'none')};
  color: ${akColorN500};
  display: flex;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  transform: ${({ width, isOpen }) => (isOpen ? 'translateX(0)' : `translateX(calc(${widths[width].offScreenTranslateX}))`)}
  transition: ${transformTransition}, ${widthTransition};
  width: ${({ width }) => widths[width].width};
`;
