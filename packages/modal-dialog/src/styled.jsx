import styled from 'styled-components';
import {
  akGridSize,
  akZIndexBlanket,
  akBorderRadius,
  akColorN0,
} from '@atlaskit/util-shared-styles';

const grid = parseInt(akGridSize, 10) / 2;
const viewportMargin = grid * 15;

const width = {
  small: 400,
  medium: 600,
  large: 800,
  'x-large': 968,
};

const padding = {
  none: 0,
  default: grid * 4,
};

export const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (width[props.width] ? `${width[props.width]}px` : props.width)};
  max-width: calc(100% - ${2 * viewportMargin}px); 
  max-height: calc(100% - ${2 * viewportMargin}px);
  z-index: ${akZIndexBlanket + 10};
  background-color: ${akColorN0};
  border-radius: ${akBorderRadius};
  padding: ${props => padding[props.padding]}px;
`;

export const HeaderWrapper = styled.div`
  flex: 0 1 auto;
  padding-bottom: ${props => padding[props.padding]}px;
`;

export const ContentWrapper = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  min-height: 0px;
`;

export const FooterWrapper = styled.div`
  flex: 0 1 auto;
  padding-top: ${props => padding[props.padding]}px;
`;
