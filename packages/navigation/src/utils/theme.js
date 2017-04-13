const getPrefixed = key => `__doNotUse@atlaskit/navigation:${key}`;

export const themeVariables = {
  isCompact: getPrefixed('isCompact'),
  appearance: getPrefixed('appearance'),
};

export const appearanceEnum = {
  settings: 'settings',
  container: 'container',
  global: 'global',
};
