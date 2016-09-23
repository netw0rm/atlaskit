import 'style!./host.less';

import classNames from 'classnames';
import shadowStyles from './shadow.less';
import { enumeration } from 'akutil-common';
import { vdom, define, prop, props } from 'skatejs';

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

const loadingSymbol = Symbol();

function imageLoadedHandler(elem) {
  return () => {
    props(elem, { [loadingSymbol]: false });
  };
}

/**
 * @description Definition of the Avatar component.
 * @class Avatar
 * @example @html <ak-avatar src="my/avatar/src/doge.png"></ak-avatar>
 * @example @js import Avatar from 'ak-avatar';
 * const myAvatar = new Avatar();
 *
 */
const definition = {
  render(elem) {
    const presenceClasses = classNames([
      shadowStyles.locals.presence,
      shadowStyles.locals[elem.presence],
    ]);
    const sizeClasses = classNames([
      shadowStyles.locals[elem.size],
      shadowStyles.locals.size,
    ]);
    const imgWrapperClasses = classNames({
      [shadowStyles.locals.loaded]: !elem[loadingSymbol],
    }, shadowStyles.locals.imgWrapper);
    const slotWrapperClasses = classNames({
      // hide the slot if no presence and no slotted content to hide the border of the presence
      [shadowStyles.locals.hidden]: elem.presence === 'none' && !elem.children.length,
      [shadowStyles.locals.defaultSlotWrapper]: true,
    });
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={sizeClasses}>
          <div className={imgWrapperClasses} aria-label={elem.label}>
            {
              elem.src ? <img
                alt={elem.label}
                src={elem.src}
                className={shadowStyles.locals.img}
                onload={imageLoadedHandler(elem)}
              /> : ''
            }
          </div>
          <div className={slotWrapperClasses}>
            <slot className={shadowStyles.locals.defaultSlotElement}>
              <div class={presenceClasses}></div>
            </slot>
          </div>
        </div>
      </div>
    );
  },


  props: {
    /**
     * @description Defines the size of the avatar.
     * Allowed values: 'small', 'medium', 'large', 'xlarge'.
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
     * @description Indicates a user's online status by showing a small icon on the avatar itself.
     * Allowed values: 'online', 'offline', 'busy' or 'none'
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
      set(elem, data) {
        // Check that we are setting an actual value and that its's not the same value as before
        // otherwise no onLoad event will be fired from the img and therefore [loadingSymbol] will
        // never be set back to false.
        if (data.newValue && data.oldValue !== data.newValue) {
          props(elem, { [loadingSymbol]: true });
        }
      },
    }),

    /**
     * @description Defines the label for the Avatar used by screen readers as fallback content
     * if the image fails to load.
     * @memberof Avatar
     * @instance
     * @type {string}
     * @example @html <ak-avatar label="Avatar for Jon Snow" src="my/avatar/src.png"></ak-avatar>
     * @example @js avatar.label = 'Avatar for Jon Snow';
     */
    label: prop.string({
      attribute: true,
    }),

    [loadingSymbol]: prop.boolean({
      initial: false,
    }),
  },
};

export default define('ak-avatar', definition);
