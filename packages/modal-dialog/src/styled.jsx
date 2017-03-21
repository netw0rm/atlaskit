import styled from 'styled-components';
import {
  akGridSize,
  akZIndexBlanket,
  akBorderRadius,
  akColorB400,
  akColorN90,
  akColorN100,
  akColorN0,
} from '@atlaskit/util-shared-styles';

const width = {
  small: 400,
  medium: 600,
  large: 800,
  'x-large': 968,
};

const akZIndexModal = akZIndexBlanket + 10;
const grid = parseInt(akGridSize, 10) / 2;
const viewportMargin = grid * 15;

export const ModalWrapper = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${akZIndexBlanket};
`;

export const ModalPositioner = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => {
    const w = width[props.width] ? `${width[props.width]}px` : props.width;
    console.log(w);
    return w;
  }};
  max-width: calc(100% - ${2 * viewportMargin}px); 
  margin: 0 auto;
  height: calc(100% - ${2 * viewportMargin}px); 
  margin-top: ${viewportMargin}px;
  position: relative;
  z-index: ${akZIndexModal};
`;

export const Modal = styled.div`
  background-color: ${akColorN0};
  border-radius: ${akBorderRadius};
`;

export const HeaderWrapper = styled.div`
  flex: 0 0 auto;
  padding: ${grid * 4}px;
`;

export const ContentWrapper = styled.div`
  flex: 0 1 auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0 ${grid * 4}px;
  position: relative;
`;

export const FooterWrapper = styled.div`
  flex: 0 0 auto;
  padding: ${grid * 4}px;
`;
