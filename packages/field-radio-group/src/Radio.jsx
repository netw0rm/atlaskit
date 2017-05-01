import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import styles from './styles.less';

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable-next-line react/prefer-stateless-function */
export default class Radio extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isRequired: PropTypes.bool,
    isSelected: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }

  render() {
    return (
      <div>
        <label>
          <span className={styles.inputWrapper}>
            <input
              className={styles.input}
              checked={this.props.isSelected}
              disabled={this.props.isDisabled}
              name={this.props.name}
              onChange={this.props.onChange}
              required={this.props.isRequired}
              value={this.props.value}
              type="radio"
            />
            <span
              className={classnames(styles.radioIcon, {
                [styles.disabled]: this.props.isDisabled,
                [styles.selected]: this.props.isSelected,
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
