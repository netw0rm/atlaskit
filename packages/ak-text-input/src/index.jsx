import React, { PureComponent, PropTypes } from 'react';
import { style } from 'glamor';
import { akFontSizeDefault } from 'akutil-shared-styles';

const css = {
  font: style({
    color: 'inherit',
    fontSize: akFontSizeDefault,
  }),
  input: style({
    background: 'transparent',
    border: 0,
    padding: 0,
    boxSizing: 'border-box',
    cursor: 'inherit',
    outline: 'none',
    width: '100%',
    ':invalid': {
      boxShadow: 'none',
    },
  }),
};

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
    /**
     * @description Whether the component has autoFocus in edit mode.
     * @memberof TextInput
     * @type {boolean}
     */
    hasAutoFocus: PropTypes.bool,
  }

  static defaultProps = {
    style: {},
    isEditing: false,
    hasAutoFocus: false,
  }

  renderEditView = () => (
    <input
      {...style(css.input, css.font, this.props.style)}
      autoFocus={this.props.hasAutoFocus}
      type="text"
      value={this.props.value}
      onChange={this.props.onChange}
    />
  )

  renderReadView = () => (
    <span {...style(css.font, this.props.style)}>
      {this.props.value}
    </span>
  )

  render = () => (
    this.props.isEditing ? this.renderEditView() : this.renderReadView()
  )
}
