/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN30, akColorN300 } from '@atlaskit/util-shared-styles';

import { Root, cardShadow, borderRadius, borderRadiusLeft, size, spaceAround, ellipsis } from '../styles/base';
import {MoreBtn as CardOverlayMoreBtn} from '../cardOverlay/styled';

export const Wrapper = styled(Root)`
  display: flex;

  ${borderRadius()}
  ${cardShadow()}

  &.square {
    flex-direction: column;

    .details {
      height: 116px;
      flex-grow: 0;
    }
  }
`;

export const HorizontalThumbnail = styled.img`
  flex-shrink: 0;
  ${size(116)}
  ${borderRadiusLeft()}
`;

export const SquareThumbnail = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex: 1;
  width: 100%;
`;

 // min-width required in Details to get proper text wrapping in IE11
export const Details = styled.div`
  ${spaceAround()}
  flex-grow: 1;
  min-width: 150px;

  padding: 10px;
  background-color: ${akColorN30};
`;

export const Title = styled.div`
  .ellipsed-text {
    font-size: 14px;
  }
`;

export const Description = styled.div`
  .ellipsed-text {
    font-size: 12px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;

  img {
    ${size(16)}
    margin-right: 5px;
  }

  a {
    display: block;
    font-size: 12px;
    color: ${akColorN300};

    ${ellipsis(150)}
  }
`;

export const Menu = styled.div`
  position: relative;
`;

export const MenuButton = styled(CardOverlayMoreBtn)`
  cursor: pointer;
`;

export const DropdownWrapper = styled.div`;
  display: block;
  position: absolute;
  left: calc(100% - 37px);
  top: 105%;

  z-index: 100;
`;

;
