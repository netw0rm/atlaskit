import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./styles.less';
import EditView from './Edit';
import ReadView from './Read';
import ReadOnlyView from './ReadOnly';

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
     * @description The value, element or component to be displayed in read mode.
     *
     * This node should display the value of the field when the user is not editing it.
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    readView: PropTypes.node.isRequired,
    /**
     * @description The element or component to be displayed in edit mode (optional).
     *
     * This node should allow the user to edit the value of the field.
     *
     * If this node is not supplied, the component will display in read-only mode.
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    editView: PropTypes.node,
    /**
     * @description Whether InlineEdit is on Edit mode or Read mode.
     *
     * @memberof InlineEdit
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Whether InlineEdit should display its label.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isLabelHidden: PropTypes.bool,
    /**
     * @description Allows disabling the default confirm-on-blur behaviour.
     *
     * By default, the 'onConfirm' callback will be called when focus moves
     * outside the inline edit component. This prop allows disabling this
     * behaviour. If this prop is set to 'true', 'onConfirm' will only be
     * called if the user explicitly clicks on the confirm button.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isConfirmOnBlurDisabled: PropTypes.bool,
    /**
     * @description Called when the user requests that edit mode be entered
     *
     * For example, will be called when the user clicks on the input.
     *
     * The parent component would typically set the InlineEdit's 'isEditing'
     * prop true in response to this.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onEditRequested: PropTypes.func.isRequired,
    /**
     * @description Called when the user confirms a new value
     *
     * The typical response would be to check if the editing value is valid,
     * and if so, save it and switch 'isEditing' to false.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onConfirm: PropTypes.func.isRequired,
    /**
     * @description Called when the user cancels an edit
     *
     * The typical response would be to discard the current editing value and switch
     * 'isEditing' to false.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onCancel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLabelHidden: false,
    isConfirmOnBlurDisabled: false,
  }

  renderReadView = () => (
    <ReadView
      label={this.props.label}
      isLabelHidden={this.props.isLabelHidden}
      onEditRequested={this.props.onEditRequested}
    >
      {this.props.readView}
    </ReadView>
  )

  renderEditView = () => (
    <EditView
      label={this.props.label}
      isLabelHidden={this.props.isLabelHidden}
      isConfirmOnBlurDisabled={this.props.isConfirmOnBlurDisabled}
      onConfirm={this.props.onConfirm}
      onCancel={this.props.onCancel}
      content={this.props.editView}
    />
  )

  renderEditableView = () => (
    this.props.isEditing ? this.renderEditView() : this.renderReadView()
  )

  renderReadOnlyView = () => (
    <ReadOnlyView
      label={this.props.label}
      isLabelHidden={this.props.isLabelHidden}
    >
      {this.props.readView}
    </ReadOnlyView>
  )

  render = () => (
    <div className={styles.root}>
      {this.props.editView ? this.renderEditableView() : this.renderReadOnlyView()}
    </div>
  )
}
