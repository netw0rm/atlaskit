import * as React from 'react';
import { PureComponent } from 'react';

import { missingEmoji } from './styles';

export interface PlaceholderProps {
  title: string;
}

export default class EmojiPlaceholder extends PureComponent<PlaceholderProps, undefined> {
  render() {
    return (
      <svg className={missingEmoji} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
        <circle cx="16" cy="16" r="12">
          <title>{`Unknown Emoji (${this.props.title})`}</title>
        </circle>
      </svg>
    );
  }
}
