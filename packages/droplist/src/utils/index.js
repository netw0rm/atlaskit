import { colors } from '@atlaskit/theme';

export function getInputBackground({ isChecked, isDisabled, isHovered, isPressed }) {
  let background = colors.R500;

  if (isHovered) background = colors.R500;
  if (isPressed) background = colors.R500;
  if (isChecked) background = colors.R500;
  if (isDisabled) background = colors.R500;
  if (isChecked && isDisabled) background = colors.R500;

  return background;
}

export function getInputFill({ isChecked }) {
  return isChecked ? colors.R500 : 'transparent';
}
