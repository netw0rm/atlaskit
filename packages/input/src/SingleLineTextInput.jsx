import React, { PureComponent, PropTypes } from 'react';
import keyCode from 'keycode';
import { style } from 'glamor';
import { akFontSizeDefault } from '@atlaskit/util-shared-styles';

const css = {
  common: style({
    color: 'inherit',
    fontSize: akFontSizeDefault,
    letterSpacing: 'normal',
    appearance: 'none',
  }),
  readView: style({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
  editView: style({
    lineHeight: 'inherit',
    background: 'transparent',
    border: 0,
    margin: 0,
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

/**
 * @description A text input component with extremely basic styling that supports read/edit modes.
 *
 * Designed for use within other components, e.g. for the read/edit views required by
 * ak-inline-edit, or within table cells.
 *
 * Note: In addition the props described below, all other props passed to this
 * component will be forwarded to the underlying HTML 'input'. This allows change
 * handlers, placeholders, etc, to be attached to it.
 */
export default class SingleLineTextInput extends PureComponent {
  static propTypes = {
    /**
     * @description The value of the input field.
     * @memberof SingleLineTextInput
     * @type {string}
     */
    value: PropTypes.string,
    /**
     * @description Custom styles that will be applied to the read and edit views.
     *
     * Typical use would be to specify a custom font size.
     *
     * @memberof SingleLineTextInput
     * @type {object}
     */
    style: PropTypes.shape({}),
    /**
     * @description Whether the input text will initially be selected/highlighted.
     * @memberof SingleLineTextInput
     * @type {boolean}
     * @default false
     */
    isInitiallySelected: PropTypes.bool,
    /**
     * @description Whether the component is in edit mode or read mode.
     * @memberof SingleLineTextInput
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Called when the user confirms input by pressing the enter key
     * @memberof SingleLineTextInput
     * @type {Function}
     */
    onConfirm: PropTypes.func,
    /**
     * @description Regular onKeyDown handler passed to the input
     * @memberof SingleLineTextInput
     * @type {Function}
     */
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
    onConfirm: () => {},
    onKeyDown: () => {},
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing) {
      this.selectInputIfNecessary();
    }
  }

  onKeyDown = (event) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    if (event.keyCode === keyCode('enter')) {
      this.props.onConfirm(event);
    }
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
      onKeyDown: this.onKeyDown,
    };
    delete inputProps.style;
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    delete inputProps.onConfirm;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView() {
    return (
      <input
        {...style(css.common, css.editView, this.props.style)}
        {...this.getInputProps()}
        ref={(ref) => { this.inputRef = ref; }}
      />
    );
  }

  renderReadView() {
    return (
      <div {...style(css.common, css.readView, this.props.style)}>
        {this.props.value}
      </div>
    );
  }

  render() {
    return this.props.isEditing ? this.renderEditView() : this.renderReadView();
  }
}
