import { vdom, define, prop, props, emit } from 'skatejs';


// component parts
import Chrome from './Chrome';
import Label from './Label';
import Root from './Root';
import RemoveButton from './RemoveButton';
import AnimationWrapper from './AnimationWrapper';

import * as events from './internal/index.events';
import * as exceptions from './internal/index.exceptions';
const { NotRemovableError } = exceptions;
const { beforeRemove: beforeRemoveEvent, afterRemove: afterRemoveEvent } = events;
import { name } from '../package.json';
import logger from './internal/logger';

// TODO replace with es6 Symbols as soon as Skate supports it
const buttonHoverSymbol = '__removeButtonHover';
// TODO replace with es6 Symbols as soon as Skate supports it
const isRemovingSymbol = '__isRemoving';


/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tag
 * @fires Tag#beforeRemove
 * @fires Tag#afterRemove
 * @example @js import Tag from 'ak-tag';
 *
 * const tag = new Tag();
 * document.body.appendChild(tag);
 */
export default define(name, {
  render(elem) {
    if (!elem.text) {
      logger.warn('No text given, not rendering.');
      return null;
    }

    const isLinked = elem.isLinked();
    const isRemovable = elem.isRemovable();
    const isRemoving = elem[isRemovingSymbol];

    const Button = isRemovable ? RemoveButton : () => null;

    const emitRemoveEvent = () => {
      emit(elem, afterRemoveEvent, {
        bubbles: true,
        cancelable: false,
      });
    };

    return (
      <Root>
        <AnimationWrapper
          isRemoving={isRemoving}
          afterAnimation={emitRemoveEvent}
        >
          <Chrome
            isLinked={isLinked}
            isRemovable={isRemovable}
            markedForRemoval={elem[buttonHoverSymbol]}
          >
            <Label href={elem.href}>{elem.text}</Label>
            <Button
              onHoverStateChange={(isHovering) => props(elem, { [buttonHoverSymbol]: isHovering })}
              onActivation={() => elem.remove()}
              text={elem['remove-button-text']}
            />
          </Chrome>
        </AnimationWrapper>
      </Root>
    );
  },
  prototype: {
    /**
     * @description Getter to find out whether the tag is linked.
     *              This is implicitly controlled by the {@link Tag#href} attribute.
     *
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
     *              This is implicitly controlled by the {@link Tag#remove-button-text} attribute.
     *
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
     *              The removal can be prevented by preventing the {@link Tag#beforeRemove}
     *              event. The {@link Tag#afterRemove} event is fired upon completion.
     *              Please note that the tag is not actually removed from the DOM. It is up to the
     *              consumer to remove the DOM representation.
     *
     * @memberof Tag
     * @function
     * @instance
     * @emits Tag#beforeRemove
     * @emits Tag#afterRemove
     * @throws {NotRemovableError} throws an error if invoked on a tag that is not removable
     * @example @js tag.remove(); // triggers the tag removal
     * @example @js import Tag, { events, exceptions } from 'ak-tag';
     * const { beforeRemove, afterRemove } = events;
     * const { NotRemovableError } = exceptions;
     *
     * const tag = new Tag();
     * tag.addEventListener(beforeRemove, (e) => {
     *   console.log('Just about to start the remove animation');
     *   // e.preventDefault(); // this would stop the removal process
     * });
     * tag.addEventListener(afterRemove, () => {
     *   console.log('Remove animation finished');
     *   document.body.removeChild(tag); // actually remove the DOM representation
     * });
     *
     * document.body.appendChild(tag);
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
          logger.log(`Cancelled ${beforeRemoveEvent} event for tag "${this.text}"`);
        }
      }
    },
  },
  props: {
    /**
     * @description (Required) The tag text content.
     *              This is a required attribute.
     *              Omitting it will stop the tag from being rendered.
     *
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag text="Cupcake"></ak-tag>
     * @example @js const tag = new Tag();
     * tag.text = 'Cupcake';
     * // Shows a tag with the text 'Cupcake'
     */
    text: {
      attribute: true,
    },

    /**
     * @description (Optional) A target href for the tag text to link to.
     *              If this attribute is non-empty, the tag will contain a link to the given URL.
     *              The given URL reference will be used as-is and will open in the same window.
     *              This attribute implicitly controls {@link Tag#isLinked}.
     *
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @html <ak-tag text="Cupcake" href="http://www.cupcakeipsum.com/"></ak-tag>
     * @example @js const tag = new Tag();
     * tag.text = 'Cupcake';
     * tag.href = 'http://www.cupcakeipsum.com/';
     * // Shows a tag with the text 'Cupcake' and a link to cupcakeipsum.com
     */
    href: {
      attribute: true,
    },

    /**
     * @description (Optional) The text for the remove button.
     *              Implicitly defines that there will be a remove button.
     *              This attribute implicitly controls {@link Tag#isRemovable}.
     *
     * @memberof Tag
     * @instance
     * @name remove-button-text
     * @type {string}
     * @example @html <ak-tag text="Cupcake" remove-button-text="OMG, I am so full!"></ak-tag>
     * @example @js const tag = new Tag();
     * tag.text = 'Cupcake';
     * tag.removeButtonText = 'OMG, I am so full!';
     * // Shows a tag with the text 'Cupcake' and a remove button
     */
    'remove-button-text': {
      attribute: true,
      default: '',
    },

    [buttonHoverSymbol]: prop.boolean({
      initial: false,
    }),

    [isRemovingSymbol]: prop.boolean({
      initial: false,
    }),
  },
});

export { events, exceptions };
