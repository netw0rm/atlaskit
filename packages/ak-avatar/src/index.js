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

/**
 * @description The definition for the Avatar component.
 * @class Avatar
 * @example <ak-avatar src="my/avatar/src/image.png"></ak-avatar>
 * @example import Avatar from 'ak-avatar';
 * const myAvatar = new Avatar();
 *
 */
const Avatar = {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.img({
      alt: elem.alt,
      src: elem.src || '',
    });
  },
  props: {
    /**
     * @description The size of the avatar. One of:
     * 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', or 'xxxlarge'.
     * @memberof Avatar
     * @instance
     * @default medium
     * @type {string}
     * @example <ak-avatar size="large"></ak-avatar>
     * @example avatar.size = 'large';
     */
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description The sauce.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example <ak-avatar src="my/avatar/src.png"></ak-avatar>
     * @example avatar.src = 'my/avatar/src.png';
     */
    src: {
      attribute: true,
    },
    /**
     * @description The alt text for the Avatar.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example <ak-avatar alt="Avatar image" src="my/avatar/src.png"></ak-avatar>
     * @example avatar.alt = 'Avatar image';
     */
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

export default () => define('ak-avatar', Avatar);

export { Avatar as definition };
