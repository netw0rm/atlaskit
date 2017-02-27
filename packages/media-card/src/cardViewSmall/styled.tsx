/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, size } from '../styles/base';
import {
  akColorN20,
  akColorN30,
  akColorN70
} from '@atlaskit/util-shared-styles';

export const SmallCard = styled(Root)`
  background-color: ${akColorN20};
  border-radius: 3px;
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

  .error-icon {
    height: 20px;
  }
`;

export const Retry = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: #0065FF;
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: calc(100%);
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
`;

export const ImgWrapper = styled.div`
  width: 32px;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 100%;
    max-width: 100%;
    display: block;
    transform: translate(-50%, -50%);
  }
`;

export const Error = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: calc(100%);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Title = styled.div`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  color: #091E42;
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: calc(100%);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Size = styled.div`
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  overflow: hidden;
  max-width: calc(100%);
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
`;

export const RoundedBackground = styled.div`
  min-width: 32px;
  height: inherit;
  background-color: #FAFBFC;
  border-radius: 3px;
`;

export const InfoWrapper = styled.div`
  display: inline-block;
  padding-left: 8px;
  position: relative;
  max-width: calc(100% - 40px);
  vertical-align: middle;
`;

export const LoadingWrapper = styled.div`
  color: #cfd4db;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderSmallWrapper = styled.div`
  ${size(32)}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .file-type-icon {
    position: absolute;

    span {${size(12)}}
  }
`;
