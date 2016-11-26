import React, { PureComponent, PropTypes } from 'react';
import Root from './Root';
import AnimationWrapper from './AnimationWrapper';
import Chrome from './Chrome';
import Content from './Content';
import Button from './RemoveButton';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Tag
 * @fires Tag#onBeforeRemoveAction
 * @fires Tag#onAfterRemoveAction
 * @example @js import Tag from 'ak-tag';
 * // Tag with text
 * ReactDOM.render(<Tag text="Cupcake" />, container);
 * // Tag with link
 * ReactDOM.render(<Tag text="Atlassian" href="https://www.atlassian.com"/>, container);
 * // Tag with link that is removable
 * ReactDOM.render(<Tag text="Atlassian"
 *                      href="https://www.atlassian.com"
 *                      removeButtonText="Remove Me"/>, container);
 */
export default class Tag extends PureComponent {
  static propTypes = {
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
     * @example @js
     * ReactDOM.render(<Tag text="Cupcake" />, container);
     * // Shows a tag with the text 'Cupcake'
     */
    text: PropTypes.string.isRequired,
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
     * @example @js import Tag from 'ak-tag';
     * // Shows a tag with the text 'Cupcake'
     * // and a link to cupcakeipsum.com
     * ReactDOM.render(<Tag text="Cupcake" href="http://www.cupcakeipsum.com/"/>, container);
     */
    href: PropTypes.string,
    /**
     * @description (Optional) The text for the remove button tooltip.
     *              Implicitly defines that there will be a remove button.
     *              This attribute implicitly controls {@link Tag#isRemovable}.
     *
     * @memberof Tag
     * @instance
     * @name removeButtonText
     * @type {string}
     * @example @js import Tag from 'ak-tag';
     * ReactDOM.render(<Tag text='Cupcake' href='http://www.cupcakeipsum.com/' removeButtonText = 'OMG, I am so full!'/>, container);
     * Shows a tag with the text 'Cupcake' with the link and a remove button
     */
    removeButtonText: PropTypes.string,
    /**
     * This event gets emitted before a tag gets removed
     * (e.g. before the remove animation starts).
     * It is cancelable. If it gets cancelled, the removal is aborted.
     *
     * @event Tag#onBeforeRemoveAction
     * @example @html <ak-tag
     *   text="Cupcake"
     *   remove-button-text="No more"
     *   onBeforeRemove={(e) => console.log('Just about to start the remove animation')}
     * ></ak-tag>
     * @example @js import { events } from 'ak-tag';
     *
     * tag.addEventListener(events.onBeforeRemoveAction, (e) => {
     *   console.log('Just about to start the remove animation');
     *   // e.preventDefault(); // this would stop the removal process
     * });
     */
    onBeforeRemoveAction: PropTypes.func,
    /**
     * This event gets emitted after a tag has been removed
     * (e.g. after the remove animation finished).
     * It is not cancelable.
     *
     * @event Tag#onAfterRemoveAction
     * @example @html <ak-tag
     *   text="Cupcake"
     *   remove-button-text="No more"
     *   onAfterRemove={(e) => console.log('Finished the remove animation')}
     * ></ak-tag>
     * @example @js import { events } from 'ak-tag';
     *
     * tag.addEventListener(events.onAfterRemoveAction, () => {
     *   console.log('Finished the remove animation');
     *   document.body.removeChild(tag);
     * });
     */
    onAfterRemoveAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
      isRemoved: false,
      markedForRemoval: false,
    };
  }

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
  isLinked = () => !!this.props.href
  /**
   * @description Getter to find out whether the tag is removable.
   *              This is implicitly controlled by the {@link Tag#removeButtonText} attribute.
   *
   * @memberof Tag
   * @function
   * @instance
   * @return {boolean} Whether the tag is removable or not
   * @example @js tag.isRemovable(); // Returns true if the tag is removable.
   */
  isRemovable = () => !!this.props.removeButtonText
  /**
   * @description Allows to programmatically start the tag removal
   *              (same as if the user activated the remove button)
   *              The removal can be prevented by preventing the {@link Tag#onBeforeRemoveAction}
   *              event. The {@link Tag#onAfterRemoveAction} event is fired upon completion.
   *              Please note that the tag is not actually unmounted. It is up to the
   *              consumer to remove it
   *
   * @memberof Tag
   * @function
   * @instance
   * @callback Tag#onBeforeRemoveAction
   * @callback Tag#onAfterRemoveAction
   * @example @js import Tag from 'ak-tag';
   *
   * const tag = new Tag();
   * tag.text = 'Cupcake';
   * tag.removeButtonText = 'Too much food';
   *
   * const onBeforeRemoveAction =  (e) => {
   *   console.log('Just about to start the remove animation');
   *   // e.preventDefault(); // this would stop the removal process
   * }
   * const onAfterRemoveAction = () => {
   *   console.log('Remove animation finished');
   * }
   *
   * document.body.appendChild(tag);

   */
  remove = () => {
    this.handleRemoveAction();
  }

  handleRemoveAction = () => {
    if (this.props.onBeforeRemoveAction) {
      if (this.props.onBeforeRemoveAction()) {
        this.setState({ isRemoving: true, isRemoved: false });
      }
    } else {
      this.setState({ isRemoving: true, isRemoved: false });
    }
    if (this.props.onAfterRemoveAction) {
      this.props.onAfterRemoveAction();
    }
  }

  handleHoverChange = (hoverState) => {
    this.setState({ markedForRemoval: hoverState });
  }

  render() {
    const newButton = this.props.removeButtonText ? (<Button
      removeText={this.props.removeButtonText}
      onHoverChange={this.handleHoverChange}
      onRemoveAction={this.handleRemoveAction}
    />)
            : null;

    return (<Root>
      <AnimationWrapper
        isRemoving={this.state.isRemoving}
        isRemoved={this.state.isRemoved}
      >
        <Chrome
          isLink={!!this.props.href}
          markedForRemoval={this.state.markedForRemoval}
          isRemovable={!!this.props.removeButtonText}
        >
          <Content href={this.props.href}>
            {this.props.text}
          </Content>
          {newButton}
        </Chrome>
      </AnimationWrapper>
    </Root>);
  }
}
