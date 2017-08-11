/* tslint:disable:variable-name */
import styled from 'styled-components';

export const ImageViewerWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-height: 100%;
  transition: transform .3s;
`;
