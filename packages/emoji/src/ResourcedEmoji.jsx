import React, { PureComponent, PropTypes } from 'react';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import Emoji from './Emoji';

export default class ResourcedEmoji extends PureComponent {
  static propTypes = {
    shortcut: PropTypes.string.isRequired,
    emojiService: EmojiPropTypes.emojiService.isRequired,
  };

  render() {
    const { emojiService, shortcut } = this.props;
    const emoji = emojiService.findByShortcut(shortcut);
    if (emoji) {
      return (<Emoji {...emoji} />);
    }
    // FIXME get placeholder or blank image when no emoji found.
    return (<span>[Missing emoji]</span>);
  }
}
