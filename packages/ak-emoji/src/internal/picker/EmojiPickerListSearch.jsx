import React, { PureComponent, PropTypes } from 'react';
import AkFieldBase from 'ak-field-base';
import { SearchIcon } from 'ak-icon';

import styles from 'style!../../style.less';

export default class EmojiPickerListSearch extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  }

  render() {
    const { style, onChange, query } = this.props;

    return (
      <div className={styles.search} style={style}>
        <AkFieldBase
          appearance="compact"
          label="Search"
          isLabelHidden
          isFitContainerWidthEnabled
        >
          <span className={styles.searchIcon} >
            <SearchIcon label="Search" />
          </span>
          <input
            className={styles.input}
            type="text"
            disabled={false}
            name="search"
            placeholder="Search..."
            required={false}
            onChange={e => onChange(e)}
            value={query}
            ref={input => input && input.focus()}
          />
        </AkFieldBase>
      </div>
    );
  }
}
