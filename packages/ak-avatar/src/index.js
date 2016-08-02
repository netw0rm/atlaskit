/** @jsx vdom */
import 'style!./host.less';

import classNames from 'classnames';
import shadowStyles from './shadow.less';
import { enumeration } from 'akutil-common';
import { vdom, define, prop } from 'skatejs';

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
    const outerDivClasses = classNames([
      shadowStyles.locals.outerDiv,
      shadowStyles.locals[elem.size],
    ]);

    return (
      <div class={outerDivClasses} aria-label={elem.label}>
        <style>{shadowStyles.toString()}</style>
        <img alt={elem.label} src={elem.src} class={imgClasses} />
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
     * @description An indicator of a users online status.
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
  },
};

export default define('ak-avatar', definition);
