import { AVATAR_RADIUS, AVATAR_SIZES, BORDER_WIDTH } from './constants';

type Sizes = $Keys<typeof AVATAR_SIZES>; // eslint-disable-line no-undef

// "square" avatars are explicit
export const getBorderRadius = ({ appearance, size }, config = { includeBorderWidth: false }) => (appearance === 'circle'
  ? '50%'
  : `${AVATAR_RADIUS[size] + (config.includeBorderWidth ? BORDER_WIDTH[size] : 0)}px`
);

export const getSize = ({ size }: { size: Sizes }) => AVATAR_SIZES[size]; // for testing
export const getAvatarDimensions = ({ size }, config = { includeBorderWidth: false }) => `
  height: ${AVATAR_SIZES[size] + (config.includeBorderWidth ? (BORDER_WIDTH[size] * 2) : 0)}px;
  width: ${AVATAR_SIZES[size] + (config.includeBorderWidth ? (BORDER_WIDTH[size] * 2) : 0)}px;
`;
