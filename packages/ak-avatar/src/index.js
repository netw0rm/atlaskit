import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { enumeration } from 'ak-common';
import { skate, vdom } from 'ak-base-component';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

export default skate('ak-avatar', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.img({
      alt: elem.alt,
      src: elem.src,
    });
  },
  properties: {
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    src: {
      attribute: true,
    },
    alt: {
      attribute: true,
    },
  },
});
