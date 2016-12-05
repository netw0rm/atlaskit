import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import EditView from './Edit';
import ReadView from './Read';

export default class InlineEdit extends PureComponent {
  static propTypes = {
    /**
     * @description The label to be rendered above the inline edit.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     *
     * @memberof InlineEdit
     * @type {string}
     */
    label: PropTypes.string.isRequired,
    /**
     * @description The value/element/component to be displayed in Read mode.
     *
     * This value can be anything and should be customized to work well as FieldBase child
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    readView: PropTypes.node.isRequired,
    /**
     * @description The element/component responsable to edit what's displayed in Read mode.
     *
     * This value can be anything and should be customized to work well as FieldBase child
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    editView: PropTypes.node.isRequired,
    /**
     * @description Whether InlineEdit is on Edit mode or Read mode.
     *
     * @memberof InlineEdit
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Whether the field should show its focus ring.
     *
     * This would usually be set by the parent component when the edit view
     * receives/loses focus.
     *
     * @memberof InlineEdit
     * @type {boolean}
     */
    isFocused: PropTypes.bool.isRequired,
    /**
     * @description Weather InlineEdit should display its label.
     *
     * Defaults to false.
     *
     * @memberof InlineEdit
     * @type {string}
     */
    isLabelHidden: PropTypes.bool,
    /**
     * @description Called when the user requests that edit mode be entered
     *
     * For example, will be called when the user clicks on the input.
     *
     * The parent component would typically set the InlineEdit's isEditing
     * prop true in response to this.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onEditRequested: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isFocused: false,
    isLabelHidden: false,
  }

  renderReadView = () => (
    <ReadView
      label={this.props.label}
      isFocused={this.props.isFocused}
      isLabelHidden={this.props.isLabelHidden}
      onEditRequested={this.props.onEditRequested}
    >
      {this.props.readView}
    </ReadView>
  )

  renderEditView = () => (
    <EditView
      label={this.props.label}
      isFocused={this.props.isFocused}
      isLabelHidden={this.props.isLabelHidden}
    >
      {this.props.editView}
    </EditView>
  )

  render = () => (
    <div className={styles.root}>
      {this.props.isEditing ? this.renderEditView() : this.renderReadView()}
    </div>
  )
}
