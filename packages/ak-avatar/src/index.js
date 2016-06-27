import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
/* We inport headStyles and pass it to the style-loader to put it in the head. We then reimport it
   so that we can get a copy of the local classNames it uses */
import hostStyles from './host.less';

import shadowStyles from './shadow.less';

import { enumeration } from 'akutil-common';
import { define, vdom } from 'skatejs';

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
    elem.className = hostStyles.locals['ak-avatar']; // eslint-disable-line no-param-reassign
  },
};


/* The constructor for our component */
export default () => define('ak-avatar', definition);

export { definition };
