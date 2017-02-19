import React, { PureComponent, PropTypes } from 'react';
import { InputEditView as EditView, ReadView } from './styled';

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
     * @type {string}
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
  }

  static defaultProps = {
    style: {},
    isInitiallySelected: false,
  }

  componentDidMount() {
    this.selectInputIfNecessary();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isEditing) {
      this.selectInputIfNecessary();
    }
  }

  getInputProps = () => {
    const inputProps = {
      ...this.props,
      type: 'text',
    };
    delete inputProps.isEditing;
    delete inputProps.isInitiallySelected;
    return inputProps;
  }

  selectInputIfNecessary() {
    if (this.props.isEditing && this.props.isInitiallySelected) {
      this.inputRef.select();
    }
  }

  renderEditView() {
    return (
      <EditView
        {...this.getInputProps()}
        innerRef={(ref) => { this.inputRef = ref; }}
      />
    );
  }

  renderReadView() {
    return (
      <ReadView style={this.props.style}>
        {this.props.value}
      </ReadView>
    );
  }

  render() {
    return this.props.isEditing ? this.renderEditView() : this.renderReadView();
  }
}
