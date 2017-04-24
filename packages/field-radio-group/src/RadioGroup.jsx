import React, { PropTypes, PureComponent } from 'react';
import Base from 'ak-field-base';
import styles from './styles.less';
import Radio from './Radio';
import { itemsDefault, itemsPropType } from './internal/constants';

/* eslint-disable-next-line react/prefer-stateless-function */
export default class FieldRadioGroup extends PureComponent {
  static propTypes = {
    isRequired: PropTypes.bool,
    items: itemsPropType,
    label: PropTypes.string,
    onRadioChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isRequired: false,
    items: itemsDefault,
    label: '',
  }

  renderItems = () => (
    this.props.items.map((item, index) => (
      <Radio
        key={index}
        isDisabled={item.isDisabled}
        isRequired={this.props.isRequired}
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
        isRequired={this.props.isRequired}
        label={this.props.label}
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
