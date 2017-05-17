import styled from 'styled-components';
import {
  akColorB400,
  akColorN0,
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';
import { foundationLargeWidth, gridSize, setAnchorStates } from './util/style';

const headerHeight = gridSize * 11;

export const HeaderWrapper = styled.div`
  *, *::before, *::after {
      box-sizing: inherit;
  }
  .row {
    max-width: 75rem;
    margin-left: auto;
    margin-right: auto;

    &:before, &:after {
      content: ' ';
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  @media screen and (min-width: 64em) {
    .large-12 {
      width: 100%;
    }
  }

  @media screen and (min-width: 40em) {
    .column, .columns {
      padding-left: 0.9375rem;
      padding-right: 0.9375rem;
    }
  }
`;

/* eslint-disable no-confusing-arrow */
export const PrimaryFullWidthWrapper = styled.div`
  background-color: ${akColorB400};
  height: auto;
  padding: 0 ${gridSize}px;
  position: relative;
  width: 100%;

  @media screen and (min-width: ${foundationLargeWidth}) {
    height: ${headerHeight}px;
  }
  
  &.show-for-large {
    @media screen and (max-width: 63.9375em) {
      display: none !important;
    }
  }
`;
/* eslint-enable no-confusing-arrow */

export const Row = styled.div`
  height: 100%;
`;

export const Column = styled.div`
  align-items: baseline;
  color: ${akColorN0};
  display: flex;
  height: 100%;

  ${setAnchorStates`
    color: inherit;
  `}
`;

export const Title = styled.h1`
  ${akTypographyMixins.h700}
  margin-top: ${gridSize * 4}px;
  padding-right: ${gridSize * 2}px;

  ${setAnchorStates`
    text-decoration: none;
    white-space: nowrap;
  `}
`;

/* eslint-disable no-confusing-arrow */
export const ScreenHeightWrapper = styled.div`
  height: ${props => props.isOpen ? '100vh' : `${headerHeight}px`};
  overflow: hidden;
  transition: height 0.5s;

  @media screen and (min-width: 64em) {
    display: none !important;
  }
`;
/* eslint-enable no-confusing-arrow */

export const Dropdown = styled.div`
  height: calc(100% - ${headerHeight}px + 1px);
`;

export const StyledDiv = styled.div`
  position: relative;
  top: ${gridSize}px;
`;

// TODO RAD-26 Ask Atlaskit team why @atlaskit/logo doesn't properly align on the baseline.
export const StyledAnchor = styled.a`
  position: relative;
  top: ${gridSize}px;
`;

export const MobileTitle = styled.span`
  ${akTypographyMixins.h700}
  display: inline;
  font-size: 20px;
  margin: ${gridSize * 4}px ${gridSize}px;

  ${setAnchorStates`
    text-decoration: none;
  `}
`;

export const SecondaryFullWidthWrapper = styled.div`
  background-color: #F1F2F6;
  height: 100%;
  width: 100%;
  padding: ${gridSize}px;
`;

export const SecondaryLink = styled.a`
  color: white;

  &:hover {
    color: white;
    text-decoration: underline !important;
  }
`;

export const SecondaryLinksWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45px;

  & > * {
    margin-left: ${gridSize * 2}px;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;
