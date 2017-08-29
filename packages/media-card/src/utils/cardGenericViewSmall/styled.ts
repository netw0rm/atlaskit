/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, center, antialiased, ellipsis, borderRadius, easeOutExpo } from '../../styles';
import {
  akColorN20,
  akColorN70
} from '@atlaskit/util-shared-styles';

const imgSize = 32;

export const SmallCard = styled(Root)`
  ${borderRadius}
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  align-items: stretch;
  transition: .8s background-color ${easeOutExpo};

  &:hover {
    background-color: ${akColorN20};
  }

  &.loading {
    background: transparent;
    box-shadow: none;
    cursor: default;

    .title, .subtitle {
      ${borderRadius}
      color: transparent;
      background-color: ${akColorN20};
      height: 10px;
    }

    .subtitle {
      width: 50%;
    }

  }

`;

export const Retry = styled.div`
  ${antialiased}
  ${ellipsis()}
  font-weight: bold;
  color: #0065FF;
  font-size: 12px;
  line-height: 15px;
  margin-top: 2px;
`;

export interface ImgWrapperProps {
  shadow: boolean;
}

export const ImgWrapper = styled.div`
  ${center}
  ${borderRadius}
  width: ${imgSize}px;
  height: 100%;
  overflow: hidden;
  position: relative;
  float: left;

  .media-card.loading & {
    box-shadow: none;
  }

  ${({shadow}: ImgWrapperProps) => shadow && cardShadow || ''}

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ErrorWrapper = styled.div`
  ${center}
`;

export const Error = styled.div`
  ${antialiased}
  ${ellipsis()}
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding-left: 8px;
  position: relative;
  width: 0;
  flex: 1;
  overflow: hidden;

  .media-card.loading & {
    height: 100%;
  }

`;

export const ActionsWrapper = styled.div`
  display: flex;
  ${center}
`;
