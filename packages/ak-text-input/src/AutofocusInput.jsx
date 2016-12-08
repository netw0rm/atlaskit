import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./styles.less';

export default class extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    fontSize: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  componentDidMount = () =>
    this.textInput.focus()

  render = () => (
    <input
      className={classNames(styles.input, styles.font)}
      style={{ fontSize: this.props.fontSize }}
      type="text"
      value={this.props.value}
      onChange={this.props.onChange}
      ref={(textInput) => { this.textInput = textInput; }}
    />
  )
}
