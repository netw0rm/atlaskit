export const supportsVoiceOver = /Mac OS X/.test(navigator.userAgent);

export const ariaRoles = {
  menu: 'menuitem',
  checkbox: supportsVoiceOver ? 'checkbox' : 'menuitemcheckbox',
  radio: supportsVoiceOver ? 'radio' : 'menuitemradio',
};

export const baseTypes = {
  values: ['menu', 'radio', 'checkbox'],
  default: 'menu',
};
