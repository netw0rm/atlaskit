/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akFontFamily, akColorN0, akColorN30, akColorN300 } from '@atlaskit/util-shared-styles';

import { Root, cardShadow, borderRadius, borderRadiusLeft, size, spaceAround, ellipsis } from '../styles/base';
import {MoreBtn as CardOverlayMoreBtn} from '../cardOverlay/styled';

export const Wrapper = styled(Root)`
  display: flex;
  user-select: none;
  background-color: ${akColorN0};
  font-family: ${akFontFamily};

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
  object-fit: cover;
`;

export const SquareThumbnail = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 116px;
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
  user-select: text;

  .ellipsed-text {
    font-size: 14px;
  }
`;

export const Description = styled.div`
  user-select: text;

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
  width: calc(100% - 10px);

  img {
    ${size(16)}
    margin-right: 5px;
  }

  a {
    user-select: text;
    display: block;
    font-size: 12px;
    color: ${akColorN300};

    ${ellipsis('100%')}
  }
`;

export const Menu = styled.div`
  position: relative;
`;

export const MenuButton = styled(CardOverlayMoreBtn)`
  cursor: pointer;
`;

export const Header = styled.div`

`;
export const Avatars = styled.div`
  float: right;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 20px;
`;

export const MemberAvatar = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 100%;
  border: 2px solid ${akColorN30};
  position: absolute;
  background: #607d8b;
`;

export const Lists = styled.div`
  ul {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  li {
    display: inline-block;
    margin: 0 5px;
    text-transform: capitalize;
  }
`;
