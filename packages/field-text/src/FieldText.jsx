import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Base, { Label } from '@atlaskit/field-base';

export default class FieldText extends PureComponent {
  static propTypes = {
    compact: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    isLabelHidden: PropTypes.bool,
    shouldFitContainer: PropTypes.bool,
    isHideMSClearButton: PropTypes.bool,
  }

  static defaultProps = {
    compact: false,
    disabled: false,
    required: false,
    type: 'text',
  }

  render() {
    const inputClass = this.props.isHideMSClearButton ? styles.inputHideMSClear : styles.input;

    return (
      <div>
        <Label
          label={this.props.label}
          htmlFor={this.props.id}
          isLabelHidden={this.props.isLabelHidden}
          isRequired={this.props.required}
        />
        <Base
          appearance={this.props.compact ? 'compact' : 'standard'}
          disabled={this.props.disabled}
          required={this.props.required}
          isFitContainerWidthEnabled={this.props.shouldFitContainer}
        >
          <input
            className={inputClass}
            type={this.props.type}
            disabled={this.props.disabled}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
            required={this.props.required}
            onChange={this.props.onChange}
            id={this.props.id}
          />
        </Base>
      </div>
    );
  }
}
