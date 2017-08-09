import { injectGlobal, withTheme } from 'styled-components';

import reset from './reset';
import base from './base';
import tables from './tables';
import browserFixes from './browser-fixes';

const CSSReset = ({ theme }) => { // eslint-disable-next-line no-unused-expressions
  injectGlobal`
    ${reset}
    ${base({ theme })}
    ${tables({ theme })}
    ${browserFixes}
  `;

  return null;
};

export default withTheme(CSSReset);

export { default as Typography } from './typography';
