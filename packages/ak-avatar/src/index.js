import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { enumeration } from 'akutil-common';
import { define, vdom, state } from 'skatejs';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

const definition = {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.img({
      alt: elem.alt,
      src: elem.src || '',
    });
  },
  props: {
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
  ready(elem) {
    state(elem, {
      className: headStyles['ak-avatar'],
    });
  },
};


/* The constructor for our component */
export default () => define('ak-avatar', definition);

export { definition };
