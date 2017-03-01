/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, size, center, centerX, antialiased, ellipsis, borderRadius } from '../styles/base';
import {
  akColorN20,
  akColorN30,
  akColorN70,
  akColorN900
} from '@atlaskit/util-shared-styles';

const imageBackground = 'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAQMAAAC3/F3+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABlBMVEXf39////8zI3BgAAAAEUlEQVQIW2Nk38mIjH5wICMAez4Iyz2C/F8AAAAASUVORK5CYII=") repeat;';

export const SmallCard = styled(Root)`
  ${cardShadow()}
  ${borderRadius()}
  background-color: ${akColorN20};
  font-family: sans-serif;
  cursor: pointer;
  box-sizing: border-box;
  height: 42px;
  padding: 5px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: ${akColorN30};

    .title {
      color: #0065FF;
    }
  }
  
  &.loading {
    background: transparent;
    box-shadow: none;

    .title, .size {
      ${borderRadius()}
      color: transparent;
      background-color: ${akColorN30};
    }
  }

  .error-icon {
    height: 20px;
  }
`;

export const Retry = styled.div`
  ${antialiased()}
  ${ellipsis('calc(100%)')}
  font-weight: bold;
  color: #0065FF;
  font-size: 12px;
  line-height: 15px;
  margin-top: 2px;
`;

export const ImgWrapper = styled.div`
  ${center()}
  width: 32px;
  height: 100%;
  overflow: hidden;
  position: relative;
  
  img {
    ${imageBackground}
    max-width: 100%;
    max-height: 100%;   
  }
`;

export const Error = styled.div`
  ${antialiased()}
  ${ellipsis('calc(100%)')}
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
`;

export const Title = styled.div`
  ${antialiased()}
  ${ellipsis('calc(100%)')}
  font-weight: bold;
  color: #091E42;
  font-size: 12px;
  line-height: 15px;
`;

export const Size = styled.div`
  ${ellipsis('calc(100%)')}
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  margin-top: 2px;
  text-transform: lowercase;
`;

export const RoundedBackground = styled.div`
  ${centerX()}
  ${borderRadius()}
  min-width: 32px;
  height: inherit;
  background-color: #FAFBFC;
  overflow: hidden;  
`;

export const InfoWrapper = styled.div`
  display: inline-block;
  padding-left: 8px;
  position: relative;
  max-width: calc(100% - 40px);
  vertical-align: middle;
`;

export const LoadingWrapper = styled.div`
  ${center()}
  ${size('100%')}
  color: #cfd4db;
  background-color: ${akColorN30};
`;

export const PlaceholderSmallWrapper = styled.div`
  ${size(32)}
  ${center()}
  position: relative;
  
  .file-type-icon {
    position: absolute;

    span {${size(12)}}
  }
`;
