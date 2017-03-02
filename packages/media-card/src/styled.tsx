/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, centerSelf, borderRadius } from './styles/base';
import { akColorN30 } from '@atlaskit/util-shared-styles';

export const Card = styled(Root)`
  ${cardShadow()}
  ${borderRadius()}
  background: #fff;
  display: table;
  font-family: sans-serif;
  cursor: pointer;
  line-height: normal;
  position: relative;
  
  .wrapper {
    ${borderRadius()}
    background: ${akColorN30};
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper{
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        ${centerSelf()}
        max-height: 100%;
        max-width: 100%;
        display: block;
      }
    }
  }
`;

export const ProgressWrapper = styled.div`
  ${borderRadius()}
  z-index: 30;
  overflow: hidden;
  background-color: rgba(255,255,255,0.3);

  .progressBar{
    width: 0%;
    height: 3px;
    background-color: white;
  }
`;

// MEDIA-TODO: Use an icon for &.fallback icon
export const PlaceholderWrapper = styled.div`
  display: flex;
  color: #cfd4db;
  height: 100%;
  justify-content: center;

  &.fallback {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAAg0lEQVR4Ae2WsQ0DQQgEKXkb4FzGZZRBF/9l3FVAbuPMer/ESnbGBBCNVhuBxDJFEbUVstR3FNmuS8zjApKvipvoDoKtgtz1EKTAkALT4VcJ3aE7dIfuwCVMvJn10h+rhTthApMSkOOPCePIeTzKwjnwYpy3AgEv8IfdnBHc+OeEfX+eRtkEbLrqLcMAAAAASUVORK5CYII=) no-repeat center;
    background-size: initial;
    width: 100%;
    height: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  color: #cfd4db;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
