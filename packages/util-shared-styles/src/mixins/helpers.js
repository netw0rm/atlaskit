import { css } from 'styled-components';
import { akColorB100 } from '!less-vars-loader?camelCase&resolveVariables!../colors.less';

// focus ring
const createFocusRing = (color = akColorB100, width = '2px') => css`
  &:focus {
    box-shadow: 0 0 0 ${width} ${color};
    outline: none;
  }
`;
const withFocusRing = css`
  ${createFocusRing()}
`;
const withoutFocusRing = css`
  box-shadow: none;
`;

// text
const truncate = width => css`
  max-width: ${width};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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
};
