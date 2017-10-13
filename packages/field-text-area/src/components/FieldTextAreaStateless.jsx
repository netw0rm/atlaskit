import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Base, { Label } from '@atlaskit/field-base';
import TextArea from '../styled/TextArea';

export default class FieldText extends PureComponent {
  static propTypes = {
    /** Set whether the fields should expand to fill available horizontal space. */
    compact: PropTypes.bool,
    /** Sets the field as uneditable, with a changed hover state. */
    disabled: PropTypes.bool,
    /** If true, prevents the value of the input from being edited. */
    isReadOnly: PropTypes.bool,
    /** Add asterisk to label. Set required for form that the field is part of. */
    required: PropTypes.bool,
    /** Sets styling to indicate that the input is invalid. */
    isInvalid: PropTypes.bool,
    /** Label to be displayed above the input. */
    label: PropTypes.string,
    /** Name value to be passed to the html input. */
    name: PropTypes.string,
    /** Text to display in the input if the input is empty. */
    placeholder: PropTypes.string,
    /** The value of the input. */
    value: PropTypes.string,
    /** Handler to be called when the input changes. */
    onChange: PropTypes.func.isRequired,
    /** Id value to be passed to the html input. */
    id: PropTypes.string,
    /** Sets whether to show or hide the label. */
    isLabelHidden: PropTypes.bool,
    /** Provided component is rendered inside a modal dialogue when the field is
    selected. */
    invalidMessage: PropTypes.node,
    /** Ensure the input fits in to its containing element. If the field is still
    resizable, it will not be hotizontally resizable. */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether to apply spell checking to the content. */
    isSpellCheckEnabled: PropTypes.bool,
    /** Sets whether the component should be automatically focused on component
    render. */
    autoFocus: PropTypes.bool,
    /** Set the maximum length that the entered text can be. */
    maxLength: PropTypes.number,
    /** The minimum number of rows of text to display */
    minimumRows: PropTypes.number,
    /** Disables the resizing of the text area. */
    enableResize: PropTypes.bool,
  }

  static defaultProps = {
    compact: false,
    disabled: false,
    isReadOnly: false,
    required: false,
    isInvalid: false,
    type: 'text',
    isSpellCheckEnabled: true,
    minimumRows: 1,
  }

  focus() {
    this.input.focus();
  }

  render() {
    const {
      autoFocus,
      compact,
      disabled,
      id,
      invalidMessage,
      isInvalid,
      isLabelHidden,
      isReadOnly,
      isSpellCheckEnabled,
      label,
      maxLength,
      minimumRows,
      name,
      onChange,
      placeholder,
      enableResize,
      required,
      shouldFitContainer,
      value,
    } = this.props;

    return (
      <div>
        <Label
          htmlFor={id}
          isDisabled={disabled}
          isLabelHidden={isLabelHidden}
          isRequired={required}
          label={label}
        />
        <Base
          isCompact={compact}
          isDisabled={disabled}
          isInvalid={isInvalid}
          isReadOnly={isReadOnly}
          isRequired={required}
          invalidMessage={invalidMessage}
          isFitContainerWidthEnabled={shouldFitContainer}
        >
          <TextArea
            disabled={disabled}
            readOnly={isReadOnly}
            name={name}
            placeholder={placeholder}
            value={value}
            required={required}
            minimumRows={minimumRows}
            enableResize={enableResize || disabled}
            onChange={onChange}
            id={id}
            autoFocus={autoFocus}
            spellCheck={isSpellCheckEnabled}
            maxLength={maxLength}
            innerRef={(input) => { this.input = input; }}
          />
        </Base>
      </div>
    );
  }
}
