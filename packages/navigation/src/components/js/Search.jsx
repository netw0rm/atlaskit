import React, { PureComponent, PropTypes } from 'react';
import styles from '../less/Search.less';

export default class Search extends PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    clearIcon: PropTypes.node,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
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
        <div className={styles.searchBox}>
          <input
            autoFocus
            className={styles.input}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
          />
          <div className={styles.clearButtonOuter}>
            <button
              className={styles.clearButton}
              onClick={this.props.onSearchClear}
              onMouseDown={e => e.preventDefault()}
            >
              {this.props.clearIcon}
            </button>
          </div>
        </div>
        <div className={styles.results}>
          {children}
        </div>
      </div>
    );
  }
}
