import styled from 'styled-components';
import ResizeAware from 'react-resize-aware';

const getFlexStyles = ({ shouldFillHeight }) => (shouldFillHeight ? `
  flex: 1 1 100%;
  flex-direction: column;
  height: 100%;
  display: flex;
` : '');

export const HeightDetectorRoot = styled.div`
  width: 100%;
  overflow: hidden;
  ${getFlexStyles}
`;

HeightDetectorRoot.displayName = 'HeightDetectorRoot';

const getOptionalResizeAwareStyles = props => (props.shouldFillHeight ? `
  flex: 1 0 100%;
  height: 100%;
` : '');

export const HeightDetectorResizeAware = styled(ResizeAware)`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  ${getOptionalResizeAwareStyles}
`;

HeightDetectorResizeAware.displayName = 'HeightDetectorResizeAware';
