/** @jsx vdom */
/* The no-underscore-dangle line can be removed once we can use symbols for prop names */
/* eslint-disable no-underscore-dangle */
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


function imageLoadedHandler(elem) {
  return () => {
    props(elem, { __loading: false });
  };
}

/**
 * @description The definition for the Avatar component.
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
      [shadowStyles.locals.loaded]: !elem.__loading,
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
     * @description The size of the avatar.
     * Allowed values are: 'small', 'medium', 'large', 'xlarge'.
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
     * Allowed values are: 'online', 'offline', 'busy' or 'none'
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
        // otherwise no onLoad event will be fired from the img and therefore __loading will never
        // be set back to false.
        if (data.newValue && data.oldValue !== data.newValue) {
          props(elem, { __loading: true });
        }
      },
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

    // Private prop, will be replaced with a symbol soon, no jsdoc annotation as not public API
    __loading: prop.boolean({
      initial: false,
    }),
  },
};

export default define('ak-avatar', definition);
