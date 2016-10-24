/** @jsx vdom */
/* The no-underscore-dangle line can be removed once we can use symbols for prop names */
/* eslint-disable no-underscore-dangle */
import classNames from 'classnames';
import { enumeration } from 'akutil-common';
import { vdom, define, prop, props, Component } from 'skatejs';
import { loading, error } from './internal/symbols';
import shadowStyles from './shadow.less';
import Presence from './Presence';
import Image from './Image';

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
    props(elem, {
      [loading]: false,
      [error]: false,
    });
  };
}

function imageErrorHandler(elem) {
  return () => {
    props(elem, {
      [error]: true,
      [loading]: false,
    });
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
  // Have to override the updated function to manually check the symbols until the bug is fixed in
  // skate https://github.com/skatejs/skatejs/issues/820
  updated(elem, prev) {
    let hasChanged = Component.updated(elem, prev);
    if (hasChanged) {
      return true;
    }

    const symbolsToCheck = [loading, error];
    const curState = props(elem);
    symbolsToCheck.forEach((symbol) => {
      if (curState[symbol] !== prev[symbol]) {
        hasChanged = true;
      }
    });

    return hasChanged;
  },
  render(elem) {
    const sizeClasses = classNames([
      shadowStyles.locals[elem.size],
      shadowStyles.locals.size,
    ]);
    const imgWrapperClasses = classNames({
      [shadowStyles.locals.loaded]: !elem[loading],
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
            <Image
              alt={elem.label}
              src={elem.src}
              className={shadowStyles.locals.img}
              onload={imageLoadedHandler(elem)}
              onerror={imageErrorHandler(elem)}
              error={elem[error]}
              loading={elem[loading]}
            />
          </div>
          <div className={slotWrapperClasses}>
            <slot className={shadowStyles.locals.defaultSlotElement}>
              <Presence presence={elem.presence} className={shadowStyles.locals.presence} />
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
        // otherwise no onLoad event will be fired from the img and therefore [loading] will never
        // be set back to false.
        if (data.newValue && data.oldValue !== data.newValue) {
          props(elem, { [loading]: true });
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

    [loading]: prop.boolean({
      initial: false,
    }),
    [error]: prop.boolean({
      initial: false,
    }),
  },
};

export default define('ak-avatar', definition);
