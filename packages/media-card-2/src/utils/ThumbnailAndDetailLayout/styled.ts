/* tslint:disable: variable-name */
import styled from 'styled-components';

const thumnailWidth = 116;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const ThumbnailWrapper = styled.div`
  flex-shrink: 0;
  width: ${thumnailWidth}px;
  background-color: orange;
`;

export const DetailWrapper = styled.div`
  flex-grow: 1;
  max-width: calc(100% - ${thumnailWidth}px);
  background-color: yellow;
`;
