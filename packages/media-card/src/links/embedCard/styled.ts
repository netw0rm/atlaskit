/* tslint:disable variable-name */
import styled from 'styled-components';

export const defaultWidth = 480;
export const defaultHeight = 180;
export const maxWidth = 480;
export const maxHeight = 360;

export interface WrapperProps {
  aspectRatio?: number;
  width?: number;
  height?: number;
}

export const Wrapper = styled.div`
  position: relative;
  ${({aspectRatio, width, height}: WrapperProps) => {

    if (width || height) {
      return `
        width: ${width || defaultWidth}px;
        height: ${height || defaultHeight}px;
        max-width: ${maxWidth}px;
        max-height: ${maxHeight}px;
      `;
    }

    if (aspectRatio) {
      // TODO: handle aspectRatio that are too will result in embed that is heigher than the default
      return `
        width: ${defaultWidth}px;
        height: 0;
        padding-bottom: ${1/aspectRatio*100}%;
      `;
    }

    return `
      width: ${defaultWidth}px;
      height: ${defaultHeight}px;
    `;

  }}
`;

export const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
`;
