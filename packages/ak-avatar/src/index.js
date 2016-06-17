import styles from './index.less';

import { enumeration } from 'ak-common';
import { skate, vdom } from 'ak-base-component';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};
const AUI_AVATAR_DEFAULT_TYPE = 'user';

export default skate('ak-avatar', {
  render(elem) {
    vdom.style(styles.toString());
    vdom('ak-avatar-inner', () => {
      vdom.img({
        alt: elem.alt,
        src: elem.src,
      });
    });
  },
  properties: {
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    type: {
      attribute: true,
      default: AUI_AVATAR_DEFAULT_TYPE,
    },
    src: {
      attribute: true,
    },
    alt: {
      attribute: true,
    },
  },
});

