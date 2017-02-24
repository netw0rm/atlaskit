// @flow
type Physics = {|
  stiffness: number,
  damping: number,
  precision: number
|}

export const standard: Physics = {
  // stiffness: 500,
  stiffness: 50,
  damping: 50,
  precision: 0.5,
};

export const fast: Physics = {
  ...standard,
  stiffness: standard.stiffness * 2,
};
