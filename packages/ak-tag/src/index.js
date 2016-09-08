import { vdom, define, prop, props, emit } from 'skatejs';
import createError from 'create-error';

import Chrome from './chrome';
import Text from './text';
import Href from './href';
import Root from './root';
import createRemoveButton from './createRemoveButton';
import createAnimationWrapper from './createAnimationWrapper';
import * as events from './internal/events';
const { beforeRemove: beforeRemoveEvent } = events;
import { name } from '../package.json';
import logger from './internal/logger';

// TODO replace with es6 Symbols as soon as Skate supports it
const buttonHoverSymbol = '__removeButtonHover';
// TODO replace with es6 Symbols as soon as Skate supports it
const isRemovingSymbol = '__isRemoving';

const NotRemovableError = createError('NotRemovableError');

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tag
 * @fires Tag#beforeRemove
 * @fires Tag#afterRemove
 * @example @js import Tag from 'ak-tag';
 * const tag = new Tag();
 */
export default define(name, {
  render(elem) {
    if (!elem.text) {
      if (process.env.NODE_ENV === 'development') {
        logger.warn('No text given, not rendering.');
      }
      return null;
    }

    const isLinked = elem.isLinked();
    const isRemovable = elem.isRemovable();

    const RemoveButton = isRemovable ? createRemoveButton(elem, buttonHoverSymbol) : () => null;
    const Label = isLinked ? Href : Text;
    const AnimationWrapper = createAnimationWrapper(elem, isRemovingSymbol);

    return (
      <Root>
        <AnimationWrapper>
          <Chrome
            isLinked={isLinked}
            isRemovable={isRemovable}
            markedForRemoval={elem[buttonHoverSymbol]}
          >
            <Label href={elem.href}>{elem.text}</Label>
            <RemoveButton text={elem['remove-button-text']} />
          </Chrome>
        </AnimationWrapper>
      </Root>
    );
  },
  prototype: {
    /**
     * @description Getter to find out whether the tag is linked.
     * @memberof Tag
     * @function
     * @instance
     * @return {boolean} Whether the tag is linked or not
     * @example @js tag.isLinked(); // Returns true if the tag is linked.
     */
    isLinked() {
      return !!this.href;
    },
    /**
     * @description Getter to find out whether the tag is removable.
     * @memberof Tag
     * @function
     * @instance
     * @return {boolean} Whether the tag is removable or not
     * @example @js tag.isRemovable(); // Returns true if the tag is removable.
     */
    isRemovable() {
      return !!this['remove-button-text'];
    },
    /**
     * @description Allows to programmatically start the tag removal
     *              (same as if the user activated the remove button)
     *              The removal can be prevented by preventing the `beforeRemove`
     *              event. The `afterRemove` is fired upon completion.
     * @memberof Tag
     * @function
     * @instance
     * @return void
     * @throws {NotRemovableError} throws an error if invoked on a tag that is not removable
     * @example @js tag.remove(); // triggers the tag removal
     */
    remove() {
      if (!this.isRemovable()) {
        throw new NotRemovableError('Tag is not removable');
      } else {
        if (emit(this, beforeRemoveEvent)) {
          props(this, {
            [isRemovingSymbol]: true,
          });
        } else {
          if (process.env.NODE_ENV === 'development') {
            logger.log(`Cancelled ${beforeRemoveEvent} event for tag "${this.text}"`);
          }
        }
      }
    },
  },
  props: {
    /**
     * @description (Optional) A target href for the tag text to link to.
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag href="http://www.some.url"></ak-tag>
     * @example @js tag.href = 'http://www.some.url';
     */
    href: {
      attribute: true,
    },

    /**
     * @description (Optional) The text for the remove button.
     *              Implicitly defines that there will be a remove button
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag remove-button-text="Delete tag"></ak-tag>
     * @example @js tag.removeButtonText = 'Delete tag';
     */
    'remove-button-text': {
      attribute: true,
      default: '',
    },

    /**
     * @description The tag text.
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag text="todo"></ak-tag>
     * @example @js tag.text = 'todo';
     */
    text: {
      attribute: true,
    },

    [buttonHoverSymbol]: prop.boolean({
      initial: false,
    }),

    [isRemovingSymbol]: prop.boolean({
      initial: false,
    }),
  },
});

export { events, NotRemovableError };
