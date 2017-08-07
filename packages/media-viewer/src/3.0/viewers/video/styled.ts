/* tslint:disable:variable-name */
import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  width: 1280px;
  height: 720px;
  background-color: #000; /* FIXME: */
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0 10px;
  display: none;
`;
