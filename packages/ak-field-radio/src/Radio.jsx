import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import styles from 'style!./styles.less';

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable-next-line react/prefer-stateless-function */
export default class Radio extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    value: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    disabled: false,
    selected: false,
  }

  render() {
    return (
      <div className={styles.container}>
        <label>
          <span className={styles.inputWrapper}>
            <input
              className={styles.input}
              checked={this.props.selected}
              disabled={this.props.disabled}
              name={this.props.name}
              onChange={this.props.onChange}
              value={this.props.value}
              type="radio"
            />
            <span
              className={classnames(styles.radioIcon, {
                [styles.disabled]: this.props.disabled,
                [styles.selected]: this.props.selected,
              })}
            />
          </span>
          <span>
            {this.props.children}
          </span>
        </label>
      </div>
    );
  }
}
/* eslint-enable jsx-a11y/label-has-for */
