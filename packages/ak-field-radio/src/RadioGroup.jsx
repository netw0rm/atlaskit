import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./styles.less';
import Radio from './Radio';

/* eslint-disable-next-line react/prefer-stateless-function */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.node,
      name: PropTypes.string,
      value: PropTypes.string,
    })),
    label: PropTypes.node,
    value: PropTypes.string,
    onRadioChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    items: [],
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
      <div className={styles.radioGroup}>
        {this.props.label ? <div>{this.props.label}</div> : null}
        {this.renderItems()}
      </div>
    );
  }
}
