import { akColorB100 } from '../index';

// focus ring
const createFocusRing = (color = akColorB100, width = '2px') => `
  &:focus {
    box-shadow: 0 0 0 ${width} ${color};
    outline: none;
  }
`;
const withFocusRing = `
  ${createFocusRing()}
`;
const withoutFocusRing = `
  box-shadow: none;
`;

// text
const truncate = width => `
  max-width: ${width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const placeholder = styles => (
  `
    &::-webkit-input-placeholder {
      ${styles}
    }
    &:-moz-placeholder {
      ${styles}
    }
    &::-moz-placeholder {
      ${styles}
    }
    &:-ms-input-placeholder {
      ${styles}
    }
  `
);

// prefer default export
export default {
  focusRing: {
    generate: createFocusRing,
    default: withFocusRing,
    none: withoutFocusRing,
  },
  text: {
    truncate,
  },
  placeholder,
};
