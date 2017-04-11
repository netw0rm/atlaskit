import styled from 'styled-components';
import { akColorN40 } from '@atlaskit/util-shared-styles';
import { AVATAR_SIZES, PRESENCE_OFFSET, PRESENCE_SIZES } from './constants';

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

// IMAGE WRAPPER
// translateZ used to invoke the GPU -- otherwise overflow is ignored when animating
export const ImageWrapper = styled.div`
  align-content: center;
  align-items: middle;
  background-color: ${({ isLoading }) => (isLoading ? akColorN40 : 'transparent')};
  border-radius: 100%;
  display: flex;
  height: 100%;
  overflow: hidden;
  transform: translateZ(0);
  width: 100%;
`;

// PRESENCE WRAPPER
const getPresenceLayout = ({ size }) => `
  bottom: ${PRESENCE_OFFSET[size]}px;
  height: ${PRESENCE_SIZES[size]}px;
  right: ${PRESENCE_OFFSET[size]}px;
  width: ${PRESENCE_SIZES[size]}px;
`;
export const PresenceWrapper = styled.div`
  ${getPresenceLayout}
  position: absolute;
`;
