import React, { PropTypes, PureComponent } from 'react';
import Base from 'ak-field-base';
import styles from 'style!./styles.less';
import Radio from './Radio';
import { itemsDefault, itemsPropType } from './internal/constants';

/* eslint-disable-next-line react/prefer-stateless-function */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    items: itemsPropType,
    label: PropTypes.node,
    onRadioChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    items: itemsDefault,
    required: false,
  }

  renderItems = () => (
    this.props.items.map((item, index) => (
      <Radio
        key={index}
        isDisabled={item.isDisabled}
        isSelected={item.isSelected}
        name={item.name}
        onChange={this.props.onRadioChange}
        value={item.value}
      >
        {item.label}
      </Radio>
    ))
  );

  render() {
    return (
      <Base
        appearance="none"
        disabled={this.props.disabled}
        label={this.props.label}
        required={this.props.required}
      >
        <div
          aria-label={this.props.label}
          className={styles.radioGroup}
          role="group"
        >
          {this.renderItems()}
        </div>
      </Base>
    );
  }
}
