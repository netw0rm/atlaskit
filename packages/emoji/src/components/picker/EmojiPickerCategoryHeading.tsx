import * as React from 'react';
import { PureComponent } from 'react';
import * as classnames from 'classnames';
import { ThemeType } from '../../types';

import * as styles from './styles';

export interface Props {
  id?: string;
  title?: string;
  className?: string;
  theme?: ThemeType;
}

export default class EmojiPickerCategoryHeading extends PureComponent<Props, {}> {

  render() {
    const { id, title, className, theme } = this.props;
    const categoryTitleClassname = classnames({
      [styles.emojiCategoryTitle]: true,
      [styles.emojiCategoryTitleDark]: theme === 'dark',
    });
    return (
      <div
        id={id}
        data-category-id={title}
        className={classnames(className)}
      >
        <div className={categoryTitleClassname} >
          {title}
        </div>
      </div>
    );
  }

}
