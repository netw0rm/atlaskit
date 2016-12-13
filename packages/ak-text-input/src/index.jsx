import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./styles.less';

export default class TextInput extends PureComponent {
  static propTypes = {
    /**
     * @description The value of the input field.
     * @memberof TextInput
     * @type {string}
     */
    value: PropTypes.string,
    /**
     * @description Custom styles that will be applied to the read and edit views
     *
     * Typical use would be to specify a custom font size.
     *
     * @memberof TextInput
     * @type {object}
     */
    style: PropTypes.shape({}),
    /**
     * @description Whether the component is in edit mode or read mode.
     * @memberof TextInput
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Callback to update input value.
     * @memberof TextInput
     * @instance
     * @type {Function}
     */
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: {},
    isEditing: false,
  }

  renderEditView = () => (
    <input
      className={classNames(styles.input, styles.font)}
      style={this.props.style}
      autoFocus
      type="text"
      value={this.props.value}
      onChange={this.props.onChange}
      ref={(textInput) => { this.textInput = textInput; }}
    />
  )

  renderReadView = () => (
    <span className={styles.font} style={this.props.style}>
      {this.props.value}
    </span>
  )

  render = () => (
    this.props.isEditing ? this.renderEditView() : this.renderReadView()
  )
}
