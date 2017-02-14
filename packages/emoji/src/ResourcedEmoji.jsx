import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!./style.less';

import EmojiPropTypes from './internal/ak-emoji-prop-types';
import Emoji from './Emoji';

export default class ResourcedEmoji extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    emojiService: EmojiPropTypes.emojiService,
  };

  render() {
    const { emojiService, id } = this.props;
    if (emojiService) {
      const emoji = emojiService.findById(id);
      if (emoji) {
        return (<Emoji {...emoji} />);
      }
    }

    return (<span className={styles.missingEmoji} />);
  }
}
