import React from 'react';
import { colors, themed } from '@atlaskit/theme';
import { getBorderRadius } from './utils';

// if image is loading, we hide the image so it doesn't obscure the gray loading
// block until the source image is loaded.
const getBackgroundColor = (
  { isLoading }:
  { isLoading: boolean }
) => (isLoading
  ? themed({ light: colors.N40, dark: colors.DN50 })
  : 'transparent'
);

// eslint-disable-next-line react/prop-types
export const Span = ({ children, ...otherProps }) => (
  <span
    style={{
      backgroundColor: getBackgroundColor(otherProps),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: getBorderRadius(otherProps),
      display: 'flex',
      flex: 1,
      height: '100%',
      width: '100%',
      ...otherProps.style,
    }}
  >
    {children}
  </span>
);

// eslint-disable-next-line react/prop-types
export const Svg = ({ children, ...otherProps }) => (
  <svg
    style={{
      backgroundColor: getBackgroundColor(otherProps),
      borderRadius: getBorderRadius(otherProps),
      height: '100%',
      width: '100%',
    }}
    {...otherProps}
  >
    {children}
  </svg>
);
