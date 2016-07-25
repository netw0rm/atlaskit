/** @jsx vdom */
import 'style!./host.less';

import classNames from 'classnames';
import shadowStyles from './shadow.less';

import { enumeration } from 'akutil-common';
import { vdom, define } from 'skatejs';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

/**
 * @description The definition for the Avatar component.
 * @class Avatar
 * @example @html <ak-avatar src="my/avatar/src/image.png"></ak-avatar>
 * @example @js import Avatar from 'ak-avatar';
 * const myAvatar = new Avatar();
 *
 */
const definition = {
  render(elem) {
    const classes = classNames([shadowStyles.locals.img, shadowStyles.locals[elem.size]]);
    const imgStyle = {};

    if (elem.borderColor) {
      imgStyle.borderColor = elem.borderColor;
    }
    return (
      <span>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.alt} src={elem.src} class={classes} style={imgStyle} />
      </span>
    );
  },
  props: {
    /**
     * @description The size of the avatar. One of:
     * 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', or 'xxxlarge'.
     * @memberof Avatar
     * @instance
     * @default medium
     * @type {string}
     * @example @html <ak-avatar size="large"></ak-avatar>
     * @example @js avatar.size = 'large';
     */
    size: enumeration(SIZE_ATTRIBUTE_ENUM)({
      attribute: true,
    }),
    /**
     * @description The source URL.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.src = 'my/avatar/src.png';
     */
    src: {
      attribute: true,
    },
    /**
     * @description The alt text for the Avatar.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar alt="Avatar image" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.alt = 'Avatar image';
     */
    alt: {
      attribute: true,
      default: '',
    },
    /**
     * @description The border color for the Avatar.
     * @memberof Avatar
     * @instance
     * @type {string}
     */
    borderColor: {
      attribute: true,
    },
  },
};

export default define('ak-avatar', definition);
