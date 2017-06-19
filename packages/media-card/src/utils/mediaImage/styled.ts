/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN20 } from '@atlaskit/util-shared-styles';
import { size, fadeIn } from '../../styles';

export const transparentFallbackBackground = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAQMAAAC3/F3+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABlBMVEXf39////8zI3BgAAAAEUlEQVQIW2Nk38mIjH5wICMAez4Iyz2C/F8AAAAASUVORK5CYII=")';

export const ImageViewWrapper = styled.div`
  ${size()}
  border-radius: inherit;
  background-repeat: no-repeat, repeat;
  background-position: center, center;
  background-size: contain, auto;
  background-color: ${akColorN20};

  &.crop {
    background-size: cover, auto;
  }

  &.fade-in {
    ${fadeIn}
  }
`;
