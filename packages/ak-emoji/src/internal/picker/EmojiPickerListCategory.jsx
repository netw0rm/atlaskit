import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!../../style.less';

export default class EmojiPickerListCategory extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  }

  render() {
    const { style, title } = this.props;

    return (
      <div
        className={styles.categoryTitle}
        style={style}
      >
        {title}
      </div>
    );
  }
}
