import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.less';

/* eslint-disable react/prefer-stateless-function, react/no-multi-comp */
export default class Input extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disabled: false,
    required: false,
    type: 'text',
  }

  render() {
    return (
      <input
        className={styles.locals.input}
        disabled={this.props.disabled}
        type={this.props.type}
        required={this.props.required}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
