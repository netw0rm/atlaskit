import React, { PureComponent, PropTypes } from 'react';
import { style } from 'glamor';
import { akFontSizeDefault } from 'akutil-shared-styles';

const css = {
  common: style({
    color: 'inherit',
    fontSize: akFontSizeDefault,
  }),
  readView: style({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
  editView: style({
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
     * @description Whether the input text will initially be selected/highlighted
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
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate() {
    this.selectInputIfNecessary();
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
    };
    delete inputProps.style;
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView = () => (
    <input
      {...style(css.common, css.editView, this.props.style)}
      {...this.getInputProps()}
      ref={(ref) => { this.inputRef = ref; }}
    />
  )

  renderReadView = () => (
    <div {...style(css.common, css.readView, this.props.style)}>
      {this.props.value}
    </div>
  )

  render = () => (
    this.props.isEditing ? this.renderEditView() : this.renderReadView()
  )
}
