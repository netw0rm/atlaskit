import styled from 'styled-components';

export const Container = styled.div`
  border: none;
  flex: 1 0 100%;
  height: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
`;

export const Frame = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  top: -100%;
  width: 100%;
`;
