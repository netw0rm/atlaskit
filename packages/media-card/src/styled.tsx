/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root } from './styles/base';
import { easeInOutCubic } from './styles/easing';
import { fadeIn } from './styles/animations';

export const Card = styled(Root)`
  background: #fff;
  display: table;
  font-family: sans-serif;
  border-radius: 3px;
  cursor: pointer;
  line-height: normal;
  position: relative;
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
  
  .wrapper {
    background: #E5E8EC;
    display: block;
    height: inherit;
    overflow: hidden;
    position: relative;
    border-radius: 3px;

    .img-wrapper{
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 100%;
        max-width: 100%;
        display: block;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export const ProgressWrapper = styled.div`
  border-radius: 3px;
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

export const FadeinImage = styled.div`
  animation: ${fadeIn} .3s ${easeInOutCubic};
`;
