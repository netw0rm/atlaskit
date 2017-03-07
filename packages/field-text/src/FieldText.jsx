import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';
import Base, { Label } from '@atlaskit/field-base';

export default class FieldText extends PureComponent {
  static propTypes = {
    compact: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    isInvalid: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    isLabelHidden: PropTypes.bool,
    invalidMessage: PropTypes.node,
    shouldFitContainer: PropTypes.bool,
    autoFocus: PropTypes.bool,
  }

  static defaultProps = {
    compact: false,
    disabled: false,
    required: false,
    isInvalid: false,
    type: 'text',
  }

  render() {
    return (
      <div>
        <Label
          label={this.props.label}
          htmlFor={this.props.id}
          isLabelHidden={this.props.isLabelHidden}
          isRequired={this.props.required}
        />
        <Base
          isCompact={this.props.compact}
          isDisabled={this.props.disabled}
          isInvalid={this.props.isInvalid}
          isRequired={this.props.required}
          invalidMessage={this.props.invalidMessage}
          isFitContainerWidthEnabled={this.props.shouldFitContainer}
        >
          <input
            className={styles.input}
            type={this.props.type}
            disabled={this.props.disabled}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
            required={this.props.required}
            onChange={this.props.onChange}
            id={this.props.id}
            autoFocus={this.props.autoFocus}
          />
        </Base>
      </div>
    );
  }
}
