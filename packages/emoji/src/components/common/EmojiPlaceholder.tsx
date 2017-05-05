import * as React from 'react';
import { PureComponent } from 'react';

import { placeholderEmoji } from './styles';

export interface PlaceholderProps {
  title: string;
}

export default class EmojiPlaceholder extends PureComponent<PlaceholderProps, undefined> {
  render() {
    return (
      <svg className={placeholderEmoji} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
        <circle cx="12" cy="12" r="11">
          <title>{`Unknown Emoji (${this.props.title})`}</title>
        </circle>
      </svg>
    );
  }
}
