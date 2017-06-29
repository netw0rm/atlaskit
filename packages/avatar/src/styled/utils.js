import { AVATAR_SIZES } from './constants';

type Sizes = $Keys<typeof AVATAR_SIZES>; // eslint-disable-line no-undef

export const getSize = ({ size }: { size: Sizes }) => AVATAR_SIZES[size]; // for testing
export const getAvatarDimensions = ({ size }) => `
  height: ${AVATAR_SIZES[size]}px;
  width: ${AVATAR_SIZES[size]}px;
`;
