// @flow
import type { SpringHelperConfig } from 'react-motion/lib/Types';

const base = {
  stiffness: 500,
  // stiffness: 50,
  damping: 50,
  precision: 0.5,
};

export const standard: SpringHelperConfig = {
  ...base,
};

export const fast: SpringHelperConfig = {
  ...base,
  stiffness: base.stiffness * 2,
};
