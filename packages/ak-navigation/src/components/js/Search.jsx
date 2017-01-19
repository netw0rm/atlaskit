import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Search.less';

export default class Search extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Search',
  }

  render() {
    const {
      children,
      value,
      onChange,
      placeholder,
    } = this.props;
    return (
      <div className={styles.search}>
        <input
          autoFocus
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div className={styles.results}>
          {children}
        </div>
      </div>
    );
  }
}
