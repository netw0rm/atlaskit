import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { Styles } from '../../types';

export interface Props {
  title: string;
  style?: Styles;
}

export default class EmojiPickerListCategory extends PureComponent<Props, undefined> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { style, title } = this.props;

    return (
      <div
        className={styles.emojiPickerCategoryTitle}
        style={style}
      >
        {title}
      </div>
    );
  }
}
