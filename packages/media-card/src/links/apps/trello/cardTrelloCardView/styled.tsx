/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akFontFamily, akColorN0, akColorN30, akColorN300 } from '@atlaskit/util-shared-styles';

import { Root, cardShadow, borderRadius, borderRadiusLeft, size, spaceAround, ellipsis } from '../../../../styles';

export const Wrapper = styled(Root)`
  display: flex;
  user-select: none;
  background-color: ${akColorN0};
  font-family: ${akFontFamily};

  ${borderRadius}
  ${cardShadow}

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
  ${borderRadiusLeft}
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
  ${spaceAround}
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

    ${ellipsis()}
  }
`;

export const Menu = styled.div`
  position: relative;
`;

export const Header = styled.div`
`;

export const Lists = styled.div`
  ul {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 5px;
    text-transform: capitalize;
  }
`;
