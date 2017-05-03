import styled from 'styled-components';
import { akColorN40 } from '@atlaskit/util-shared-styles';
import { AVATAR_SIZES, PRESENCE_OFFSET, PRESENCE_BORDER_WIDTH, PRESENCE_SIZES } from './constants';

// MAIN CONTAINER
export const getSize = ({ size }) => AVATAR_SIZES[size]; // for testing
const getAvatarDimensions = ({ size }) => `
  height: ${AVATAR_SIZES[size]}px;
  width: ${AVATAR_SIZES[size]}px;
`;
export default styled.div`
  ${getAvatarDimensions}
  display: inline-block;
  position: relative;
`;

// BORDER RADIUS
// If appearance = 'circle', border-radius = 100%
// If appearance = 'square', border-radius = image size / 10
const getBorderRadius = ({ size, appearance }) => {
  if (appearance === 'circle') {
    return '100%';
  }
  return `${Math.floor(AVATAR_SIZES[size] / 10)}px`;
};

// IMAGE WRAPPER
// translateZ used to invoke the GPU -- otherwise overflow is ignored when animating
export const ImageWrapper = styled.div`
  align-content: center;
  align-items: middle;
  background-color: ${({ isLoading }) => (isLoading ? akColorN40 : 'transparent')};
  border-radius: ${getBorderRadius};
  display: flex;
  height: 100%;
  overflow: hidden;
  transform: translateZ(0);
  width: 100%;
`;

// PRESENCE WRAPPER
const getPresenceLayout = ({ appearance, size }) => `
  bottom: ${appearance === 'square' ? -(PRESENCE_BORDER_WIDTH[size] * 2) : PRESENCE_OFFSET[size]}px;
  height: ${PRESENCE_SIZES[size]}px;
  right: ${appearance === 'square' ? -(PRESENCE_BORDER_WIDTH[size] * 2) : PRESENCE_OFFSET[size]}px;
  width: ${PRESENCE_SIZES[size]}px;
`;
export const PresenceWrapper = styled.div`
  ${getPresenceLayout}
  position: absolute;
`;
