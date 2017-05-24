/*
==========================================
NOTE: Due to website displaying props and default props, ../index.jsx
has had the below themes inlined to prop definitions. If you change any values
here, ensure that they are also changed in the index file.
==========================================
*/

export const appearance = {
  values: [
    'primary',
    'default',
    'subtle',
    'link',
    'subtle-link',
  ],
  default: 'default',
};

export const type = {
  values: ['button', 'submit'],
  default: 'button',
};

export const spacing = {
  values: ['default', 'compact', 'none'],
  default: 'default',
};

export const theme = {
  values: ['default', 'dark'],
  default: 'default',
};
