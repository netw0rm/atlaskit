import { css } from 'styled-components';
import { akColorN200 } from '@atlaskit/util-shared-styles';

const placeholderStyles = css`
  color: ${akColorN200};
  font-size: 14px;
`;

/**
 * @todo Move this to util-shared-styles.
 */
const placeholderMixin = styles => (
  css`
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

export {
  placeholderStyles,
  placeholderMixin,
};
