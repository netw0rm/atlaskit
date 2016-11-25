import React, { PureComponent, PropTypes } from 'react';
import styles from './styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class Input extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    required: false,
    type: 'text',
    value: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleChange = e => this.setState({ value: e.target.value })

  render() {
    return (<input
      className={styles.locals.input}
      disabled={this.props.disabled}
      type={this.props.type}
      required={this.props.required}
      name={this.props.name}
      placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={this.handleChange}
    />);
  }
}
