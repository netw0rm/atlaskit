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
     * @description The content to display in the tag. Overrides text.
     */
    children: PropTypes.node,
    /**
     * @description (Optional) A target href for the tag text to link to.
     *              If this attribute is non-empty, the tag will contain a link to the given URL.
     *              The given URL reference will be used as-is and will open in the same window.
     *              This attribute implicitly controls {@link Tag#isLinked}.
     *
     * @memberof Tag
     * @instance
     * @type {string}
     * @example @js import Tag from 'ak-tag';
     * // Shows a tag with the text 'Cupcake'
     * // and a link to cupcakeipsum.com
     * ReactDOM.render(<Tag text="Cupcake" href="http://www.cupcakeipsum.com/"/>, container);
     */
    href: PropTypes.string,
    /**
     * @description This handler is called after a Tag has been removed
     *              (e.g. after the remove animation finishes).
     *              It is not cancelable.
     * @memberof Tag
     * @instance
     * @name onAfterRemoveAction
     * @type {function}
     * @example @js
     * ReactDOM.render(
     *   <Tag
     *     text="Cupcake"
     *     onAfterRemoveAction={(e) => { console.log('Tag removed!'); }}
     *   />,
     * container);
     */
    onAfterRemoveAction: PropTypes.func,
    /**
     * @description This handler is called before a Tag gets removed
     *              (e.g. before the remove animation starts).
     *              It is cancelable by returning boolean `false`.
     * @memberof Tag
     * @instance
     * @name onBeforeRemoveAction
     * @type {function}
     * @example @js
     * ReactDOM.render(
     *   <Tag
     *     text="Cupcake"
     *     onBeforeRemoveAction={(e) => false}
     *   />,
     * container);
     * // the Tag won't be removed \o/
     */
    onBeforeRemoveAction: PropTypes.func,
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
    text: PropTypes.string,
  }

  static defaultProps = {
    onAfterRemoveAction: () => {},
    onBeforeRemoveAction: () => true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
      isRemoved: false,
      markedForRemoval: false,
    };
  }

  handleRemoveAction = () => {
    if (this.props.onBeforeRemoveAction()) {
      this.setState({ isRemoving: true, isRemoved: false });
    }
  }

  handleHoverChange = (hoverState) => {
    this.setState({ markedForRemoval: hoverState });
  }

  handleRemovalCompletion = () => {
    this.setState({ isRemoving: false, isRemoved: true });
    this.props.onAfterRemoveAction(this.props.text);
  }

  render() {
    const newButton = this.props.removeButtonText ? (
      <Button
        onHoverChange={this.handleHoverChange}
        onRemoveAction={this.handleRemoveAction}
        removeText={this.props.removeButtonText}
      />
    ) : null;

    return (
      <Root>
        <AnimationWrapper
          isRemoved={this.state.isRemoved}
          isRemoving={this.state.isRemoving}
          onRemovalCompletion={this.handleRemovalCompletion}
        >
          <Chrome
            isLink={!!this.props.href}
            isRemovable={!!this.props.removeButtonText}
            markedForRemoval={this.state.markedForRemoval}
          >
            <Content href={this.props.href}>
              {this.props.children || this.props.text}
            </Content>
            {newButton}
          </Chrome>
        </AnimationWrapper>
      </Root>
    );
  }
}
