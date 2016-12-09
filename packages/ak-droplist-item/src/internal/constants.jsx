export const supportsVoiceOver = /Mac OS X/.test(navigator.userAgent);

export const ariaRoles = {
  link: 'menuitem',
  checkbox: supportsVoiceOver ? 'checkbox' : 'menuitemcheckbox',
  radio: supportsVoiceOver ? 'radio' : 'menuitemradio',
};

export const baseTypes = {
  values: ['link', 'radio', 'checkbox'],
  default: 'link',
};
