import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { enumeration } from 'ak-util-common';
import { skate, vdom } from 'skatejs';

/**
 * Enum for size attribute
 * @memberof Avatar
 * @readonly
 * @enum
 * @private
 */
const SIZE_ATTRIBUTE_ENUM = {
  /** @type {string} */
  attribute: 'size',
  /** @type {Array.string} */
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
  /** @type {string} */
  missingDefault: 'medium',
  /** @type {string} */
  invalidDefault: 'medium',
};

/**
 * Skate ak-avatar.
 * @constructs Avatar
 * @example <ak-avatar>This is an avatar</ak-avatar>
 */
const Avatar = skate('ak-avatar', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.img({
      alt: elem.alt,
      src: elem.src,
    });
  },
  properties: {
    /**
     * @memberof Avatar
     * @type {enum}
     * @instance
     * @example <ak-avatar size="small">This avatar is small.</ak-avatar>
     */
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @memberof Avatar
     * @type {string}
     * @instance
     * @example <ak-avatar src="/path/to/src">This avatar has a src.</ak-avatar>
     */
    src: {
      attribute: true,
    },
    /**
     * @memberof Avatar
     * @type {string}
     * @instance
     * @example <ak-avatar alt="Alt text">This avatar has alt text.</ak-avatar>
     */
    alt: {
      attribute: true,
    },
  },
});

export default Avatar;
