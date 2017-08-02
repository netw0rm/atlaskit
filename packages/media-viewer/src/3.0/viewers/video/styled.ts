/* tslint:disable:variable-name */
import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Video = styled.video`
  max-height: 100%;
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0 10px;
  display: none;
`;
