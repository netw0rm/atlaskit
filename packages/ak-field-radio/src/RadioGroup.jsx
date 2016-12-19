import React, { PropTypes, PureComponent } from 'react';
import FieldBase from 'ak-field-base';
import styles from 'style!./styles.less';
import Radio from './Radio';

/* eslint-disable-next-line react/prefer-stateless-function */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.node.isRequired,
      name: PropTypes.string,
      value: PropTypes.string,
    })),
    label: PropTypes.node,
    onRadioChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    items: [],
    required: false,
  }

  renderItems = () => (
    this.props.items.map((item, index) => (
      <Radio
        key={index}
        disabled={item.disabled}
        name={item.name}
        onChange={this.props.onRadioChange}
        selected={item.value === this.props.value}
        value={item.value}
      >
        {item.label}
      </Radio>
    ))
  );

  render() {
    return (
      <FieldBase
        appearance="none"
        disabled={this.props.disabled}
        label={this.props.label}
        required={this.props.required}
      >
        <div className={styles.radioGroup}>
          {this.renderItems()}
        </div>
      </FieldBase>
    );
  }
}
