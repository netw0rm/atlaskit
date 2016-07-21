/** @jsx vdom */
import 'style!./host.less';

import classNames from 'classnames';
import shadowStyles from './shadow.less';
import { enumeration } from 'akutil-common';
import { vdom, define, prop } from 'skatejs';

const SIZE_ATTRIBUTE_ENUM = {
  attribute: 'size',
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  missingDefault: 'medium',
  invalidDefault: 'medium',
};

const PRESENCE_ATTRIBUTE_ENUM = {
  attribute: 'presence',
  values: ['none', 'online', 'away', 'busy', 'offline'], // not confirmed yet
  missingDefault: 'none',
  invalidDefault: 'none',
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
    const imgClasses = classNames(shadowStyles.locals.img);
    const presenceClasses = classNames([shadowStyles.locals.presence, shadowStyles.locals[elem.presence]]); // eslint-disable-line max-len
    const outerDivClass = classNames([shadowStyles.locals.outerDiv, shadowStyles.locals[elem.size]]); // eslint-disable-line max-len
    const imgStyle = {};

    if (elem.borderColor) {
      imgStyle.borderColor = elem.borderColor;
    }
    return (
      <div class={outerDivClass} aria-label={elem.description}>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.description} src={elem.src} class={imgClasses} style={imgStyle} />
        <div class={presenceClasses}></div>
      </div>
    );
  },

  props: {
    /**
     * @description The size of the avatar. One of:
     * 'xsmall', 'small', 'medium', 'large', 'xlarge'.
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

    /* eslint-disable max-len */
    /**
     * @description The description for the Avatar. Used by screen readers.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar description="Avatar for Jon Snow" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.alt = 'Avatar for Jon Snow';
     */
    /* eslint-enable max-len */
    description: prop.string({
      attribute: true,
    }),

    /**
     * @description The name of the person the avatar is for. Is used to create a default avatar if
     * no src is provided.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar user="Jon Snow" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.user = 'Jon Snow';
     */
    user: prop.string({
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
