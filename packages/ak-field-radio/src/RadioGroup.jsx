import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./styles.less';
import Radio from './Radio';
import { itemsDefault, itemsPropType } from './internal/constants';

/* eslint-disable-next-line react/prefer-stateless-function */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    items: itemsPropType,
    label: PropTypes.string,
    onRadioChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: itemsDefault,
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
      <div
        aria-label={this.props.label}
        className={styles.radioGroup}
        role="group"
      >
        {this.props.label ? <div>{this.props.label}</div> : null}
        {this.renderItems()}
      </div>
    );
  }
}
