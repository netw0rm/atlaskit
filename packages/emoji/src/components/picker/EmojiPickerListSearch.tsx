
import * as React from 'react';
import { PureComponent } from 'react';
import AkFieldBase from '@atlaskit/field-base';
import SearchIcon from '@atlaskit/icon/glyph/search';

import * as styles from './styles';
import { Styles, } from '../../types';

export interface Props {
  style?: Styles;
  query?: string;
  onChange: any;
}

export default class EmojiPickerListSearch extends PureComponent<Props, undefined> {

  static defaultProps = {
    style: {},
  };

  render() {
    const { style, onChange, query } = this.props;

    return (
      <div className={styles.pickerSearch} style={style}>
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
