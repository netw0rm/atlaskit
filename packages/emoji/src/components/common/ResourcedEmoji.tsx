import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import { EmojiId } from '../../types';
import EmojiService from '../../api/EmojiService';
import { missingEmoji } from './styles';

export interface Props {
  id: EmojiId;
  emojiService: EmojiService;
}

export default class ResourcedEmoji extends PureComponent<Props, undefined> {
  render() {
    const { emojiService, id } = this.props;
    if (emojiService) {
      const emoji = emojiService.findById(id);
      if (emoji) {
        return (<Emoji emoji={emoji} />);
      }
    }

    return (<span className={missingEmoji} />);
  }
}
