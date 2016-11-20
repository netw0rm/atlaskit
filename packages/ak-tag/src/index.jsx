import React, { Component } from 'react';

import Chrome from './Chrome';
import Label from './Label';
import Root from './Root';
import RemoveButton from './RemoveButton';
import AnimationWrapper from './AnimationWrapper';
import * as events from './internal/index.events';
import * as exceptions from './internal/index.exceptions';
import logger from './internal/logger';

const { NotRemovableError } = exceptions;
// TODO: Implement this the react way
//const { beforeRemove: beforeRemoveEvent, afterRemove: afterRemoveEvent } = events;
/* eslint-disable react/sort-comp */
// TODO: Remove this linting rule after first review feedback, easy to git diff without sorting
/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tag
 * @fires Tag#beforeRemove
 * @fires Tag#afterRemove
 * @example @html <ak-tag text="Cupcake" />
 * @example @js import Tag from 'ak-tag';
 *
 * const tag = new Tag();
 * tag.text = 'Cupcake';
 * document.body.appendChild(tag);
 */
export default class Tag extends Component {
  render() {
    if (!this.props.text) {
      logger.warn('No text given, not rendering.');
      return null;
    }

    const isLinked = this.isLinked();
    const isRemovable = this.isRemovable();
    this.buttonHover = false;
    let button = null;
    if (isRemovable) {
      button = (<RemoveButton
        onHoverStateChange={(isHovering) => { this.buttonHover = isHovering; }}
        onActivation={this.remove}
        text={this.props.removeButtonText}
      />);
    }

    this.afterAnimation = () => {
      this.setState({
        isRemoved: true,
        isRemoving: false,
      });

      /* TODO: emit event the react way
      emit(elem, afterRemoveEvent, {
        bubbles: true,
        cancelable: false,
        detail: {
          item: elem,
        },
      });
      */
    };

    return (
      <Root>
        <AnimationWrapper
          isRemoving={this.props.isRemoving}
          isRemoved={this.props.isRemoved}
          afterAnimation={this.afterAnimation}
        >
          <Chrome
            isLinked={isLinked}
            isRemovable={isRemovable}
            markedForRemoval={this.props.buttonHover}
          >
            <Label href={this.props.href}>{this.props.text}</Label>
            {button}
          </Chrome>
        </AnimationWrapper>
      </Root>
    );
  }
  constructor(props) {
    super(props);
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
    this.isLinked = () => !!this.props.href;
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
    this.isRemovable = () => !!this.props.removeButtonText;
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
     * @example @js import Tag, { events } from 'ak-tag';
     * const { beforeRemove, afterRemove } = events;
     *
     * const tag = new Tag();
     * tag.text = 'Cupcake';
     * tag.removeButtonText = 'Too much food';
     *
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
     * @example @js import Tag, { exceptions } from 'ak-tag';
     * const { NotRemovableError } = exceptions;
     *
     * const tag = new Tag();
     * tag.text = 'Cupcake';
     *
     * document.body.appendChild(tag);
     *
     * try {
     *   tag.remove();
     * } catch(e) {
     *   if (e instanceof NotRemovableError) {
     *     console.error('Could not remove tag');
     *   }
     * }
     */
    this.remove = () => {
      if (!this.isRemovable()) {
        throw new NotRemovableError('Tag is not removable');
      /* } else if (emit(this, beforeRemoveEvent, {
        detail: {
          item: this,
        },
      })) {
        props(this, {
          isRemoving: true,
        });*/
      } else {
        this.setState({
          isRemoving: true,
        });
        // logger.log(`Cancelled ${beforeRemoveEvent} event for tag "${this.text}"`);
      }
    };
  }
  static get propTypes() {
    return {
        /**
         * @description (Required) The tag text content.
         *              This is a required attribute.
         *              Omitting it will stop the tag from being rendered.
         *              The text passed will be sanitized, e.g. passed HTML will be represented
         *              as plain text.
         *
         * @memberof Tag
         * @instance
         * @type {string}
         * @example @html <ak-tag text="Cupcake"></ak-tag>
         * @example @js const tag = new Tag();
         * tag.text = 'Cupcake';
         * document.body.appendChild(tag); // Shows a tag with the text 'Cupcake'
         * @example @js const tag = new Tag();
         * tag.text = '<script>alert("no no");</script>';
         * document.body.appendChild(tag); // Shows a tag with the text
         *                                 // '<script>alert("no no");</script>'
         */
      text: React.PropTypes.string.isRequired,

        /**
         * @description (Optional) A target href for the tag text to link to.
         *              If this attribute is non-empty, the tag will contain link to the given URL.
         *              The given URL reference will be used as-is and will open in the same window
         *              This attribute implicitly controls {@link Tag#isLinked}.
         *
         * @memberof Tag
         * @instance
         * @type {string}
         * @example @html <ak-tag text="Cupcake" href="http://www.cupcakeipsum.com/"></ak-tag>
         * @example @js const tag = new Tag();
         * tag.text = 'Cupcake';
         * tag.href = 'http://www.cupcakeipsum.com/';
         * document.body.appendChild(tag); // Shows a tag with the text 'Cupcake'
         *                                 // and a link to cupcakeipsum.com
         */
      href: React.PropTypes.string,

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
         * document.body.appendChild(tag); // Shows a tag with the text 'Cupcake' & a remove button
         */
      removeButtonText: React.PropTypes.string,

      buttonHover: React.PropTypes.boolean,

      isRemoving: React.PropTypes.boolean,

      isRemoved: React.PropTypes.boolean,
    };
  }
}

export { events, exceptions };
