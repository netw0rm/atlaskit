/** @jsx vdom */
import 'style!./host.less';

import classNames from 'classnames';
import shadowStyles from './shadow.less';
import { enumeration } from 'akutil-common';
import { vdom, define, prop } from 'skatejs';
import { getInitials, getColorForInitials } from './helpers.js';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['small', 'medium', 'large', 'xlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

const PRESENCE_ATTRIBUTE_ENUM = {
  attribute: 'presence',
  values: ['none', 'online', 'busy', 'offline'],
  missingDefault: 'none',
  invalidDefault: 'none',
};

/* When displaying the initials, we want to truncate it if the size is 'small' */
function displayInitials(initials, elem) {
  if (!initials) {
    return null;
  }
  if (elem.size === 'small') {
    return initials.substring(0, 1);
  }
  return initials;
}

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
    const imgClasses = classNames(shadowStyles.locals.img);
    const presenceClasses = classNames([
      shadowStyles.locals.presence,
      shadowStyles.locals[elem.presence],
    ]);
    const outerDivClass = classNames([
      shadowStyles.locals.outerDiv,
      shadowStyles.locals[elem.size],
    ]);
    const initials = getInitials(elem.fullName);
    const outerDivStyle = {
      backgroundColor: elem.src ? 'transparent' : getColorForInitials(initials),
    };
    const imgStyle = {};

    if (elem.borderColor) {
      imgStyle.borderColor = elem.borderColor;
    }
    return (
      <div class={outerDivClass} style={outerDivStyle} aria-label={elem.label}>
        <style>{shadowStyles.toString()}</style>
        {
          elem.src ? <img alt={elem.description} src={elem.src} class={imgClasses} style={imgStyle} /> : displayInitials(initials, elem) // eslint-disable-line max-len
        }
        <div class={presenceClasses}></div>
      </div>
    );
  },

  props: {
    /**
     * @description The size of the avatar. One of:
     * small', 'medium', 'large', 'xlarge'.
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
     * @description An indicator or a users online status.
     * Will show a small colored icon on the avatar itself.
     * 'online', 'offline', 'busy' or 'none'
     * @memberof Avatar
     * @instance
     * @default none
     * @type {string}
     * @example @html <ak-avatar presence="online"></ak-avatar>
     * @example @js avatar.presence = 'online';
     */
    presence: enumeration(PRESENCE_ATTRIBUTE_ENUM)({
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
    src: prop.string({
      attribute: true,
      // Add a default so that creating via `new AKAvatar()` doesnt try to load a url of `null`
      default: '',
    }),

    /**
     * @description The label for the Avatar. Used by screen readers and as fallback content should
     * the image fail to load.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar label="Avatar for Jon Snow" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.label = 'Avatar for Jon Snow';
     */
    label: prop.string({
      attribute: true,
    }),

    /**
     * @description The name of the person the avatar is for. Is used to create a default avatar if
     * no src is provided.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar full-name="Jon Snow" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.fullName = 'Jon Snow';
     */
    fullName: prop.string({
      attribute: true,
    }),

    /**
     * @description The border color for the Avatar.
     * @memberof Avatar
     * @instance
     * @type {string}
     */
    borderColor: prop.string({
      attribute: true,
    }),
  },
};

export default define('ak-avatar', definition);
