import { css } from 'styled-components';
import zIndexes from '!less-vars-loader?camelCase&resolveVariables!../z-indexes.less';

// Cards on a board
const e100 = css`
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
  z-index: ${zIndexes.akZIndexCard};
`;

// Inline dialogs
const e200 = css`
  box-shadow: 0 4px 8px -2px rgba(9, 30, 66, 0.28), 0 0 1px rgba(9, 30, 66, 0.3);
  z-index: ${zIndexes.akZIndexDialog};
`;

// Modals
const e500 = css`
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.28), 0 0 1px rgba(9, 30, 66, 0.3);
  z-index: ${zIndexes.akZIndexModal};
`;

// Flag messages (notifications)
const e600 = css`
  box-shadow: 0 20px 32px -8px rgba(9, 30, 66, 0.24), 0 0 1px rgba(9, 30, 66, 0.3);
  z-index: ${zIndexes.akZIndexFlag};
`;

export default {
  e100,
  e200,
  e500,
  e600,
};
